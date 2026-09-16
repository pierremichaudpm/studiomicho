import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { MarchingCubes } from "three/addons/objects/MarchingCubes.js";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { attachHeroBackend, backendContour, BACKEND_RECESS_DEPTH } from "./hero-backend";

type Point = [number, number, number];
export const ASSEMBLY_END = 9;
export const CELL_SIZE = 1.5;
// Exact site colors: app/globals.css tokens, plus the original hero prompt blue.
export const HERO_PALETTE = {
  cyan: "#00d4e0",
  magenta: "#e600e6",
  yellow: "#ffd700",
  orange: "#ff8c52",
  blue: "#4A90E2",
} as const;
function gradientSwatch(from: string, to: string, amount: number) {
  const channels = [1,3,5].map((offset) => {
    const a = parseInt(from.slice(offset,offset+2),16);
    const b = parseInt(to.slice(offset,offset+2),16);
    return Math.round(a+(b-a)*amount).toString(16).padStart(2,"0");
  });
  return `#${channels.join("")}`;
}

// Intermediate swatches use the same three stops as the original typewriter.
// Depth comes from the material, rather than substituting unrelated neon colors.
export const LED_PALETTE = {
  ...HERO_PALETTE,
  blue: gradientSwatch(HERO_PALETTE.cyan,HERO_PALETTE.magenta,0.28),
  magenta: gradientSwatch(HERO_PALETTE.magenta,HERO_PALETTE.yellow,0.3),
  orange: gradientSwatch(HERO_PALETTE.magenta,HERO_PALETTE.yellow,0.65),
} as const;
export const PUZZLE_PARTS: { name: string; color: string; cells: Point[]; offset: Point; spin: Point }[] = [
  { name: "web", color: LED_PALETTE.blue, cells: [[-1,-1,1],[-1,0,1],[0,-1,1],[-1,-1,0]], offset: [-1.4,-0.5,1.4], spin: [-0.24,-0.45,-0.15] },
  { name: "foundation", color: LED_PALETTE.cyan, cells: [[-1,0,0],[-1,1,0],[0,0,0],[0,-1,0]], offset: [0,0,-1.9], spin: [0.28,-0.45,0.2] },
  { name: "dashboard", color: LED_PALETTE.magenta, cells: [[-1,1,1],[0,1,1],[0,1,0],[1,1,0]], offset: [0,1.7,0], spin: [0.34,0.35,-0.17] },
  { name: "tools", color: LED_PALETTE.orange, cells: [[1,-1,0],[1,-1,1],[1,0,0]], offset: [1.5,-0.35,-0.8], spin: [-0.2,0.4,0.2] },
  { name: "key", color: LED_PALETTE.yellow, cells: [[0,0,1],[1,0,1],[1,1,1]], offset: [1.3,0,2.2], spin: [-0.3,0.45,0.18] },
];

function smooth(start: number, end: number, time: number) {
  const x = THREE.MathUtils.clamp((time - start) / (end - start), 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/** Create one continuous notched solid for each piece, with no seams between its cells. */
function puzzleGeometry(cells: Point[], center: THREE.Vector3, material: THREE.Material) {
  const resolution = 80;
  const extent = 3;
  const step = extent * 2 / resolution;
  const triangleBudget = 32000;
  const surface = new MarchingCubes(resolution, material, false, false, triangleBudget);
  surface.isolation = 0;
  const centers = cells.map(([x,y,z]) => [x * CELL_SIZE, y * CELL_SIZE, (z - 0.5) * CELL_SIZE]);
  const rearCells = cells.filter((cell) => cell[2] === 0);
  const contour = rearCells.length ? backendContour(rearCells) : [];
  for (let z = 0; z < resolution; z++) for (let y = 0; y < resolution; y++) for (let x = 0; x < resolution; x++) {
    const px = -extent + (x + 0.5) * step;
    const py = -extent + (y + 0.5) * step;
    const pz = -extent + (z + 0.5) * step;
    const inBody = centers.some(([cx,cy,cz]) => Math.abs(px-cx) < CELL_SIZE/2 && Math.abs(py-cy) < CELL_SIZE/2 && Math.abs(pz-cz) < CELL_SIZE/2);
    surface.field[x + resolution * (y + resolution * z)] = inBody ? 1 : -1;
  }
  // One mild blur rounds only the edges of the continuous solid. Faces and notches
  // remain planar; the 0.075-unit sampling is much finer than the original soft blocks.
  let source: Float32Array = surface.field;
  let scratch: Float32Array = new Float32Array(source.length);
  for (const stride of [1, resolution, resolution * resolution]) {
    scratch.set(source);
    for (let z = 1; z < resolution - 1; z++) for (let y = 1; y < resolution - 1; y++) for (let x = 1; x < resolution - 1; x++) {
      const i = x + resolution * (y + resolution * z);
      scratch[i] = (source[i-stride] + source[i]*2 + source[i+stride]) / 4;
    }
    [source, scratch] = [scratch, source];
  }
  surface.field.set(source);
  surface.update();
  const count = surface.geometry.drawRange.count;
  if (count >= triangleBudget * 3) throw new Error("Puzzle mesh exceeded its geometry budget");
  const geometry = new THREE.BufferGeometry();
  for (const name of ["position", "normal"]) {
    const attribute = surface.geometry.getAttribute(name);
    geometry.setAttribute(name, new THREE.Float32BufferAttribute(attribute.array.slice(0, count * 3), 3));
  }
  geometry.scale(extent, extent, extent);
  geometry.translate(step/2,step/2,step/2);
  // Sculpt the existing rear surface into a shallow recess. The mesh stays closed:
  // no thin cut-out walls, exposed voids or torn corners around the opening.
  const positions=geometry.getAttribute("position");
  for(let index=0;index<positions.count && contour.length;index++) {
    if(Math.abs(positions.getZ(index)+1.5)>.001) continue;
    const px=-positions.getX(index),py=positions.getY(index);
    let inside=false;
    let distance=Infinity;
    for(let i=0,j=contour.length-1;i<contour.length;j=i++) {
      const [ax,ay]=contour[i],[bx,by]=contour[j];
      if((ay>py)!==(by>py) && px<(bx-ax)*(py-ay)/(by-ay)+ax) inside=!inside;
      const dx=bx-ax,dy=by-ay;
      const t=THREE.MathUtils.clamp(((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy),0,1);
      distance=Math.min(distance,Math.hypot(px-ax-dx*t,py-ay-dy*t));
    }
    if(inside) positions.setZ(index,positions.getZ(index)+BACKEND_RECESS_DEPTH*smooth(0,.12,distance));
  }
  geometry.translate(-center.x,-center.y,-center.z);
  geometry.scale(0.985, 0.985, 0.985);
  geometry.deleteAttribute("normal");
  const rounded=mergeVertices(geometry,0.00001);
  rounded.computeVertexNormals();
  rounded.computeBoundingBox();
  rounded.computeBoundingSphere();
  geometry.dispose();
  surface.geometry.dispose();
  return rounded;
}

/** Five large interlocking solids. Their assembly has no dependency on the text. */
export function createHeroModules() {
  const rig = new THREE.Group();
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const materialCache = new Map<string, THREE.MeshPhysicalMaterial>();
  const material = (color: string, body = false) => {
    const key = `${body ? "body" : "detail"}:${color}`;
    if (!materialCache.has(key)) {
      const pigment = new THREE.Color(color);
      const value = new THREE.MeshPhysicalMaterial({
        color: pigment.clone().multiplyScalar(body ? 0.58 : 1),
        emissive: pigment,
        emissiveIntensity: body ? 0.16 : 0.24,
        metalness: 0.04,
        roughness: body ? 0.36 : 0.4,
        clearcoat: 0.05,
        clearcoatRoughness: 0.35,
        specularIntensity: 0.16,
        envMapIntensity: 0.04,
      });
      materialCache.set(key, value);
      materials.add(value);
    }
    return materialCache.get(key)!;
  };
  const box = (parent: THREE.Object3D, w: number, h: number, d: number, x: number, y: number, z: number, color: string, radius = 0.035) => {
    const geo = new RoundedBoxGeometry(w, h, d, 2, Math.min(radius * 0.45, w / 2, h / 2, d / 2));
    geometries.add(geo);
    const mesh = new THREE.Mesh(geo, material(color));
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const disc = (parent: THREE.Object3D, radius: number, x: number, y: number, z: number, color: string, depth = 0.04) => {
    const geo = new THREE.CylinderGeometry(radius, radius, depth, 28);
    geo.rotateX(Math.PI / 2);
    geometries.add(geo);
    const mesh = new THREE.Mesh(geo, material(color));
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const pieces = PUZZLE_PARTS.map((definition, index) => {
    const home = new THREE.Vector3();
    definition.cells.forEach(([x,y,z]) => home.add(new THREE.Vector3(x * CELL_SIZE, y * CELL_SIZE, (z - 0.5) * CELL_SIZE)));
    home.divideScalar(definition.cells.length);
    const group = new THREE.Group();
    group.name = definition.name;
    const pigment = material(definition.color,true);
    const geo = puzzleGeometry(definition.cells, home, pigment);
    geometries.add(geo);
    const body = new THREE.Mesh(geo, pigment);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    rig.add(group);
    const away = home.clone().add(new THREE.Vector3(...definition.offset));
    const distant = home.clone().addScaledVector(new THREE.Vector3(...definition.offset), 2.1);
    distant.z -= 9;
    return { group, home, body, cells: definition.cells, away, distant, spin: new THREE.Quaternion().setFromEuler(new THREE.Euler(...definition.spin)), delay: index * 0.45 };
  });

  function face(name: string, center: Point, rotation: Point = [0,0,0]) {
    const piece = pieces.find((piece) => piece.group.name === name)!;
    const group = new THREE.Group();
    group.position.set(...center).sub(piece.home);
    group.rotation.set(...rotation);
    piece.group.add(group);
    return group;
  }
  // Miniature product interfaces are embossed directly onto the colored pieces.
  // Dark inks are shades of the same pigments; all bright accents use the site tokens.
  const { cyan, magenta, yellow, orange } = LED_PALETTE;
  const shade = (color: string, amount: number) => `#${new THREE.Color(color).multiplyScalar(amount).getHexString()}`;
  const web = face("web", [-0.75, -1.5, 1.5]);
  // Desktop website: browser chrome, navigation, a split hero, CTA and project cards.
  box(web, 2.49, 1.13, 0.055, 0, 0, 0.03, shade(cyan, 0.055), 0.09);
  box(web, 2.33, 0.13, 0.035, 0, 0.44, 0.077, shade(cyan, 0.24), 0.025);
  [orange, yellow, magenta].forEach((color, index) => disc(web, 0.026, -1.06 + index * 0.095, 0.44, 0.11, color, 0.025));
  box(web, 0.88, 0.047, 0.025, 0.1, 0.44, 0.11, shade(cyan, 0.1), 0.018);
  box(web, 0.29, 0.065, 0.045, -0.93, 0.28, 0.09, cyan, 0.02);
  for (let index = 0; index < 3; index++) box(web, 0.19, 0.035, 0.035, 0.43 + index * 0.25, 0.28, 0.085, shade(cyan, 0.65), 0.012);
  box(web, 0.95, 0.085, 0.06, -0.6, 0.095, 0.11, cyan, 0.02);
  box(web, 0.71, 0.085, 0.06, -0.72, -0.035, 0.11, cyan, 0.02);
  box(web, 0.75, 0.033, 0.035, -0.7, -0.15, 0.09, shade(cyan, 0.5), 0.012);
  box(web, 0.34, 0.1, 0.055, -0.9, -0.275, 0.11, yellow, 0.025);
  box(web, 0.86, 0.5, 0.065, 0.65, -0.045, 0.105, shade(cyan, 0.22), 0.055);
  // A simple editorial image, deliberately graphic rather than photographic.
  disc(web, 0.15, 0.8, 0.015, 0.158, orange, 0.035);
  const imageCard = box(web, 0.35, 0.29, 0.04, 0.5, -0.08, 0.185, cyan, 0.035);
  imageCard.rotation.z = -0.16;
  box(web, 0.2, 0.035, 0.025, 0.5, -0.075, 0.218, shade(cyan, 0.25), 0.012);
  for (let index = 0; index < 3; index++) {
    const x = -0.76 + index * 0.76;
    box(web, 0.65, 0.13, 0.04, x, -0.43, 0.085, shade(cyan, 0.19), 0.025);
    box(web, 0.07, 0.07, 0.035, x - 0.23, -0.43, 0.12, index === 1 ? yellow : cyan, 0.015);
    box(web, 0.28, 0.035, 0.025, x + 0.035, -0.43, 0.12, shade(cyan, 0.6), 0.012);
  }

  const dashboard = face("dashboard", [-0.75, 1.5, 1.5]);
  box(dashboard, 2.43, 1.02, 0.045, 0, 0, 0.025, shade(magenta, 0.12), 0.08);
  box(dashboard, 0.75, 0.07, 0.035, -0.64, 0.33, 0.065, magenta, 0.015);
  const bars = [0.26, 0.39, 0.32, 0.52, 0.43, 0.67].map((height, index) => {
    const pivot = new THREE.Group();
    pivot.position.set(-0.92 + index * 0.37, -0.36, 0.1);
    dashboard.add(pivot);
    box(pivot, 0.21, height, 0.105, 0, height / 2, 0, index > 3 ? yellow : magenta, 0.03);
    return pivot;
  });
  // Mobile website follows the tall arm of the yellow piece.
  const phone = face("key", [1.5, 0.75, 1.5]);
  box(phone, 1.01, 2.46, 0.09, 0, 0, 0.05, shade(yellow, 0.055), 0.14);
  box(phone, 0.85, 2.15, 0.035, 0, -0.025, 0.112, shade(yellow, 0.14), 0.07);
  box(phone, 0.27, 0.045, 0.025, 0, 1.12, 0.112, shade(yellow, 0.4), 0.025);
  box(phone, 0.23, 0.065, 0.035, -0.21, 0.92, 0.15, yellow, 0.018);
  for (let row = 0; row < 2; row++) box(phone, 0.12, 0.022, 0.025, 0.27, 0.95 - row * 0.055, 0.15, yellow, 0.01);
  box(phone, 0.68, 0.48, 0.055, 0, 0.55, 0.157, shade(cyan, 0.4), 0.045);
  disc(phone, 0.14, 0.12, 0.59, 0.207, yellow, 0.035);
  const mobileImage = box(phone, 0.27, 0.25, 0.04, -0.12, 0.49, 0.225, cyan, 0.035);
  mobileImage.rotation.z = 0.14;
  box(phone, 0.62, 0.09, 0.045, -0.025, 0.16, 0.158, yellow, 0.02);
  box(phone, 0.45, 0.09, 0.045, -0.11, 0.015, 0.158, yellow, 0.02);
  for (let row = 0; row < 2; row++) box(phone, 0.61 - row * 0.12, 0.035, 0.025, -0.025 - row * 0.06, -0.145 - row * 0.08, 0.145, shade(yellow, 0.58), 0.012);
  box(phone, 0.59, 0.155, 0.05, -0.035, -0.405, 0.16, yellow, 0.04);
  box(phone, 0.27, 0.035, 0.02, -0.035, -0.405, 0.195, shade(yellow, 0.12), 0.012);
  for (let index = 0; index < 2; index++) {
    const x = -0.18 + index * 0.36;
    box(phone, 0.3, 0.29, 0.035, x, -0.78, 0.146, shade(yellow, 0.26), 0.03);
    box(phone, 0.19, 0.035, 0.025, x, -0.85, 0.18, yellow, 0.012);
  }
  box(phone, 0.26, 0.035, 0.025, 0, -1.15, 0.112, shade(yellow, 0.6), 0.02);
  const key = face("key", [0, 0, 1.5]);
  box(key, 0.92, 0.93, 0.045, 0, 0, 0.03, shade(yellow, 0.1), 0.06);
  box(key, 0.6, 0.08, 0.045, -0.03, 0.26, 0.085, yellow, 0.02);
  box(key, 0.44, 0.055, 0.035, -0.11, 0.105, 0.08, shade(yellow, 0.65), 0.015);
  box(key, 0.56, 0.035, 0.03, -0.05, -0.04, 0.075, shade(yellow, 0.45), 0.012);
  box(key, 0.4, 0.12, 0.05, -0.13, -0.25, 0.085, yellow, 0.025);

  // A small analytics tool: three raised pie segments with a compact legend.
  const tools = face("tools", [1.5, -1.5, 1.5]);
  box(tools, 1.13, 1.1, 0.045, 0, 0, 0.03, shade(orange, 0.09), 0.075);
  box(tools, 0.54, 0.065, 0.035, -0.16, 0.39, 0.077, orange, 0.018);
  let start = Math.PI / 2;
  const segments = [{ fraction: 0.55, color: orange }, { fraction: 0.28, color: yellow }, { fraction: 0.17, color: cyan }];
  segments.forEach(({ fraction, color }, index) => {
    const sweep = fraction * Math.PI * 2;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.absarc(0, 0, 0.34, start + 0.035, start + sweep - 0.035, false);
    shape.lineTo(0, 0);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.065, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.008, bevelThickness: 0.008, curveSegments: 24 });
    geometries.add(geometry);
    const segment = new THREE.Mesh(geometry, material(color));
    const offset = index === 1 ? 0.035 : 0;
    segment.position.set(-0.12 + Math.cos(start + sweep / 2) * offset, -0.055 + Math.sin(start + sweep / 2) * offset, 0.085);
    segment.castShadow = true;
    segment.receiveShadow = true;
    tools.add(segment);
    const y = 0.13 - index * 0.19;
    disc(tools, 0.031, 0.33, y, 0.09, color, 0.03);
    box(tools, 0.105, 0.032, 0.025, 0.45, y, 0.085, shade(orange, 0.65), 0.01);
    start += sweep;
  });
  const foundation = face("foundation", [-2.25, 0.75, -0.75], [0, -Math.PI / 2, 0]);
  for (let index = 0; index < 3; index++) box(foundation, 0.83, 0.11, 0.04, 0, 0.3 - index * 0.3, 0.025, shade(cyan, 0.75), 0.025);

  attachHeroBackend(pieces, LED_PALETTE, geometries, materials);

  const identity = new THREE.Quaternion();
  function update(seconds: number) {
    const time = Math.min(seconds,ASSEMBLY_END);
    pieces.forEach((piece) => {
      const progress = smooth(0.7 + piece.delay, 7 + piece.delay, time);
      const approach = smooth(0, 0.64, progress);
      const insertion = smooth(0.54, 1, progress);
      piece.group.position.lerpVectors(piece.distant, piece.away, approach).lerp(piece.home, insertion);
      // Grow during the flight from the background, then dock at full size.
      piece.group.scale.setScalar(0.32 + 0.68 * smooth(0, 0.72, progress));
      piece.group.quaternion.slerpQuaternions(piece.spin, identity, smooth(0.15, 0.54, progress));
    });
    bars.forEach((bar, index) => {
      const deployed = smooth(6.6 + index * 0.12, 8.1 + index * 0.12, time);
      bar.scale.y = 0.2 + deployed * 0.8;
    });
  }
  return {
    rig, pieces, update,
    dispose() { geometries.forEach((value) => value.dispose()); materials.forEach((value) => value.dispose()); },
  };
}
