import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { ASSEMBLY_END, createHeroModules } from "./hero-modules";

const RESTING_POSE = { tilt: 0.16, turn: -0.32, roll: 0.01 };

export type RotationDirection = "left" | "right" | "up" | "down";
export type AssemblyController = {
  rotate: (direction: RotationDirection) => void;
  dispose: () => void;
};

/** A brief glimpse of the recessed back while the pieces are coming together. */
export function assemblyPeek(seconds: number) {
  const time = Math.min(seconds,ASSEMBLY_END);
  // A single passing turn, with no hold on the rear face.
  return 1.55 * (THREE.MathUtils.smootherstep(time,3.6,5.25) - THREE.MathUtils.smootherstep(time,5.25,6.9));
}

/** A real lit 3D assembly. All pieces dock in one coordinate system, with physical depth. */
export function mountAssembly(host: HTMLElement): AssemblyController {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 20);
  const world = new THREE.Group();
  scene.add(world);
  const assembly = createHeroModules();
  const rig = assembly.rig;
  world.add(rig);
  // Include the embossed interface details when reserving room for each moving piece.
  const framing = assembly.pieces.map(({ group }) => {
    const bounds = new THREE.Box3().setFromObject(group);
    const corners = Array.from({ length: 8 }, (_, index) => new THREE.Vector3(
      index & 1 ? bounds.max.x : bounds.min.x,
      index & 2 ? bounds.max.y : bounds.min.y,
      index & 4 ? bounds.max.z : bounds.min.z,
    ));
    return { group, corners };
  });
  const framingPoint = new THREE.Vector3();
  let minimumDistance = 20;
  let resetFraming = true;
  let framingSettled = false;

  function frameAssembly(delta: number) {
    const vertical = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const horizontal = vertical * camera.aspect;
    let target = minimumDistance;
    let safe = minimumDistance;
    rig.updateWorldMatrix(true, true);
    for (const { group, corners } of framing) for (const corner of corners) {
      framingPoint.copy(corner).applyMatrix4(group.matrixWorld);
      const extent = Math.max(Math.abs(framingPoint.x) / horizontal, Math.abs(framingPoint.y) / vertical);
      target = Math.max(target, framingPoint.z + extent / 0.85);
      safe = Math.max(safe, framingPoint.z + extent / 0.96);
    }
    // A gentle dolly keeps the large pieces in frame as they open and close.
    // The safety margin also covers a quick rotation with the pointer.
    camera.position.z = resetFraming ? target : Math.max(safe, THREE.MathUtils.damp(camera.position.z, target, 5, delta || 1 / 60));
    framingSettled = Math.abs(camera.position.z-target)<0.001;
    resetFraming = false;
  }

  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(environment, 0.05);
  scene.environment = envTarget.texture;
  environment.dispose();
  pmrem.dispose();
  // Neutral studio lighting preserves the site pigments; restrained highlights keep their saturation.
  scene.add(new THREE.HemisphereLight(0xffffff, 0x292929, 0.28));
  const key = new THREE.DirectionalLight(0xffffff, 0.95);
  key.position.set(-4, 9, 12);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -12;
  key.shadow.camera.right = 12;
  key.shadow.camera.top = 10;
  key.shadow.camera.bottom = -10;
  key.shadow.normalBias = 0.025;
  key.shadow.bias = -0.00015;
  key.shadow.radius = 3;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 0.4);
  rim.position.set(7, 2, -4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 0.15);
  fill.position.set(-7, -3, 4);
  scene.add(fill);

  // A soft ground shadow anchors the whole object without using a flat illustrated shadow.
  const groundGeometry = new THREE.PlaneGeometry(80, 80);
  const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.12 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -3.6;
  ground.receiveShadow = true;
  scene.add(ground);

  let disposed = false;
  let contextLost = false;
  let visible = true;
  let elapsed = 0;
  let previous = 0;
  let frame = 0;
  let mobile = false;
  let activePointer: number | null = null;
  let pointerX = 0;
  let pointerY = 0;
  const userRotation = new THREE.Quaternion();
  const smoothRotation = new THREE.Quaternion();
  const rotationStep = new THREE.Quaternion();
  const rotationAxis = new THREE.Vector3();
  let inspected = false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const stacked = window.matchMedia("(max-width: 700px)");

  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    mobile = width < 650;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    // Preserve the size of the assembled object across portrait and landscape canvases.
    const requiredHeight = Math.max(6.8, (mobile ? 7.8 : 7.6) / camera.aspect);
    minimumDistance = requiredHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    resetFraming = true;
    camera.updateProjectionMatrix();
    schedule();
  }

  function render(now: number) {
    frame = 0;
    if (disposed || contextLost) return;
    const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    if (visible && !document.hidden && !reduced.matches) elapsed = Math.min(ASSEMBLY_END,elapsed+delta);
    const seconds = reduced.matches ? ASSEMBLY_END : elapsed;
    assembly.update(seconds);
    // Face the copy on the left, or tilt upward toward it in the stacked layout.
    // Ease into the resting pose as the last pieces dock, without a separate hold.
    const settled = THREE.MathUtils.smootherstep(seconds, 6.3, ASSEMBLY_END);
    const sway = Math.sin(seconds/32*Math.PI*2)*(1-settled);
    if (inspected) {
      smoothRotation.slerp(userRotation, reduced.matches ? 1 : 1 - Math.exp(-6 * (delta || 1 / 60)));
      rig.quaternion.copy(smoothRotation);
    } else {
      rig.rotation.set((stacked.matches ? -1 : 1) * (THREE.MathUtils.lerp(0.27, RESTING_POSE.tilt, settled) + sway * 0.065),
        THREE.MathUtils.lerp(-0.5, RESTING_POSE.turn, settled) - sway * 0.14 - assemblyPeek(seconds),
        THREE.MathUtils.lerp(0.04, RESTING_POSE.roll, settled));
    }
    world.position.set(0,sway*0.07,0);
    frameAssembly(delta);
    renderer.render(scene, camera);
    if (visible && !document.hidden && ((!reduced.matches && elapsed<ASSEMBLY_END) || (inspected && smoothRotation.angleTo(userRotation) > 0.001) || !framingSettled)) frame = requestAnimationFrame(render);
  }

  function schedule() {
    if (disposed || contextLost) return;
    cancelAnimationFrame(frame);
    previous = 0;
    frame = requestAnimationFrame(render);
  }
  function visibilityChange() {
    cancelAnimationFrame(frame);
    previous = 0;
    if (!document.hidden && visible) schedule();
  }
  function takeControl() {
    if (inspected) return;
    // Keep the current pose when taking over, including during the opening turn.
    userRotation.copy(rig.quaternion);
    smoothRotation.copy(rig.quaternion);
    inspected = true;
  }
  function turn(horizontal: number, vertical: number) {
    const angle = Math.hypot(horizontal, vertical);
    if (!angle) return;
    takeControl();
    // Rotate around screen axes, even when the object is upside down or sideways.
    rotationAxis.set(vertical, horizontal, 0).normalize();
    rotationStep.setFromAxisAngle(rotationAxis, angle);
    userRotation.premultiply(rotationStep).normalize();
    if (!frame) schedule();
  }
  function rotate(direction: RotationDirection) {
    const step = 0.35;
    turn(direction === "left" ? -step : direction === "right" ? step : 0,
      direction === "up" ? -step : direction === "down" ? step : 0);
  }
  function pointerDown(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0 || activePointer !== null) return;
    takeControl();
    activePointer = event.pointerId;
    pointerX = event.clientX;
    pointerY = event.clientY;
    host.setPointerCapture(event.pointerId);
    host.focus({ preventScroll: true });
    host.dataset.dragging = "true";
  }
  function pointerMove(event: PointerEvent) {
    if (event.pointerId !== activePointer) return;
    turn((event.clientX - pointerX) * 0.007, (event.clientY - pointerY) * 0.007);
    pointerX = event.clientX;
    pointerY = event.clientY;
  }
  function pointerUp(event: PointerEvent) {
    if (event.pointerId !== activePointer) return;
    activePointer = null;
    if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
    host.dataset.dragging = "false";
  }
  function keyboard(event: KeyboardEvent) {
    const directions: Record<string, RotationDirection> = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" };
    if (!directions[event.key] && event.key !== "Home") return;
    event.preventDefault();
    if (event.key === "Home") {
      takeControl();
      userRotation.setFromEuler(new THREE.Euler((stacked.matches ? -1 : 1) * RESTING_POSE.tilt, RESTING_POSE.turn, RESTING_POSE.roll));
      schedule();
    } else rotate(directions[event.key]);
  }
  function lost(event: Event) {
    event.preventDefault();
    contextLost = true;
    cancelAnimationFrame(frame);
    host.dataset.contextLost = "true";
  }
  function restored() { contextLost = false; delete host.dataset.contextLost; schedule(); }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
    else { cancelAnimationFrame(frame); previous = 0; }
  });
  intersection.observe(host);
  document.addEventListener("visibilitychange", visibilityChange);
  reduced.addEventListener("change", schedule);
  host.addEventListener("pointerdown", pointerDown);
  host.addEventListener("pointermove", pointerMove);
  host.addEventListener("pointerup", pointerUp);
  host.addEventListener("pointercancel", pointerUp);
  host.addEventListener("lostpointercapture", pointerUp);
  host.addEventListener("keydown", keyboard);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  renderer.domElement.addEventListener("webglcontextrestored", restored);
  resize();

  return {
    rotate,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", visibilityChange);
      reduced.removeEventListener("change", schedule);
      host.removeEventListener("pointerdown", pointerDown);
      host.removeEventListener("pointermove", pointerMove);
      host.removeEventListener("pointerup", pointerUp);
      host.removeEventListener("pointercancel", pointerUp);
      host.removeEventListener("lostpointercapture", pointerUp);
      host.removeEventListener("keydown", keyboard);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      assembly.dispose();
      groundGeometry.dispose();
      groundMaterial.dispose();
      envTarget.dispose();
      key.shadow.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
