import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { ASSEMBLY_END, createHeroModules } from "./hero-modules";

export type AssemblyFrame = { reduced: boolean };
export type AssemblyController = {
  pause: (value: boolean) => void;
  replay: () => void;
  dispose: () => void;
};

/** A brief glimpse of the recessed back while the pieces are coming together. */
export function assemblyPeek(seconds: number) {
  const time = Math.min(seconds,ASSEMBLY_END);
  // A single passing turn, with no hold on the rear face.
  return 1.55 * (THREE.MathUtils.smootherstep(time,3.6,5.25) - THREE.MathUtils.smootherstep(time,5.25,6.9));
}

/** A real lit 3D assembly. All pieces dock in one coordinate system, with physical depth. */
export function mountAssembly(host: HTMLElement, onFrame: (frame: AssemblyFrame) => void): AssemblyController {
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

  let stopped = false;
  let disposed = false;
  let contextLost = false;
  let visible = true;
  let elapsed = 0;
  let previous = 0;
  let frame = 0;
  let reportedReduced: boolean | undefined;
  let mobile = false;
  let drag = false;
  let pointerX = 0;
  let userRotation = 0;
  let smoothRotation = 0;
  let previewOffset = 0;
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
    if (!stopped && visible && !document.hidden && !reduced.matches) elapsed = Math.min(ASSEMBLY_END,elapsed+delta);
    const seconds = reduced.matches ? ASSEMBLY_END : elapsed;
    assembly.update(seconds);
    smoothRotation = THREE.MathUtils.damp(smoothRotation, userRotation, 6, delta || 1 / 60);
    // Face the copy on the left, or tilt upward toward it in the stacked layout.
    const sway = Math.sin(seconds/32*Math.PI*2)*(1-THREE.MathUtils.smootherstep(seconds,11.5,ASSEMBLY_END));
    previewOffset = inspected ? 0 : -assemblyPeek(seconds);
    rig.rotation.set((stacked.matches ? -1 : 1) * (0.27 + sway * 0.065),
      -0.5 - sway * 0.14 + smoothRotation + previewOffset, 0.04);
    world.position.set(0,sway*0.07,0);
    frameAssembly(delta);
    renderer.render(scene, camera);
    if (reportedReduced !== reduced.matches) {
      reportedReduced = reduced.matches;
      onFrame({ reduced: reduced.matches });
    }
    if (visible && !document.hidden && ((!stopped && !reduced.matches && elapsed<ASSEMBLY_END) || Math.abs(smoothRotation - userRotation) > 0.001 || !framingSettled)) frame = requestAnimationFrame(render);
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
    // Transfer the current preview angle to the user's rotation without a jump.
    userRotation += previewOffset;
    smoothRotation += previewOffset;
    previewOffset = 0;
    inspected = true;
  }
  function pointerDown(event: PointerEvent) {
    takeControl();
    drag = true;
    pointerX = event.clientX;
    host.setPointerCapture(event.pointerId);
    host.dataset.dragging = "true";
  }
  function pointerMove(event: PointerEvent) {
    if (!drag) return;
    userRotation += (event.clientX - pointerX) * 0.007;
    pointerX = event.clientX;
    if (!frame) schedule();
  }
  function pointerUp() { drag = false; host.dataset.dragging = "false"; }
  function keyboard(event: KeyboardEvent) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home") return;
    event.preventDefault();
    takeControl();
    userRotation = event.key === "Home" ? 0 : userRotation + (event.key === "ArrowLeft" ? -0.25 : 0.25);
    schedule();
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
  host.addEventListener("keydown", keyboard);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  renderer.domElement.addEventListener("webglcontextrestored", restored);
  resize();

  return {
    pause(value) { stopped = value; schedule(); },
    replay() { elapsed = 0; previous = 0; reportedReduced = undefined; userRotation = 0; previewOffset = 0; inspected = false; stopped = false; schedule(); },
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
