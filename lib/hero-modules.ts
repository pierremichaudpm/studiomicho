import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { MarchingCubes } from "three/addons/objects/MarchingCubes.js";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { attachHeroBackend, backendContour, BACKEND_RECESS_DEPTH } from "./hero-backend";

type Point = [number, number, number];
export const ASSEMBLY_END = 14;
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
  // UI hints belong to the large pieces themselves; the object never becomes a page.
  // Dark inks are shades of the same pigments; all bright accents use the site tokens.
  const { cyan, magenta, yellow, orange } = LED_PALETTE;
  const shade = (color: string, amount: number) => `#${new THREE.Color(color).multiplyScalar(amount).getHexString()}`;
  const web = face("web", [-0.75, -1.5, 1.5]);
  box(web, 2.47, 1.03, 0.045, 0, 0, 0.025, shade(cyan, 0.07), 0.09);
  box(web, 2.27, 0.14, 0.045, 0, 0.36, 0.063, shade(cyan, 0.3), 0.028);
  [orange, yellow, magenta].forEach((color, index) => disc(web, 0.032, -0.98 + index * 0.12, 0.36, 0.105, color, 0.045));
  box(web, 0.89, 0.11, 0.07, -0.54, 0.07, 0.0825, cyan, 0.02);
  box(web, 0.67, 0.055, 0.055, -0.65, -0.1, 0.075, shade(cyan, 0.4), 0.016);
  box(web, 0.45, 0.055, 0.055, -0.76, -0.23, 0.075, shade(cyan, 0.4), 0.016);
  box(web, 0.38, 0.115, 0.07, -0.8, -0.37, 0.0825, yellow, 0.025);
  box(web, 0.72, 0.58, 0.105, 0.64, -0.12, 0.1, shade(cyan, 0.19), 0.07);
  disc(web, 0.2, 0.64, -0.1, 0.188, cyan, 0.08);

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
  const key = face("key", [0.75, 0, 1.5]);
  for (let row = 0; row < 2; row++) {
    box(key, 2.25, 0.29, 0.05, 0, 0.22 - row * 0.46, 0.025, shade(yellow, 0.32), 0.045);
    box(key, 0.87, 0.065, 0.05, -0.28, 0.22 - row * 0.46, 0.075, yellow, 0.018);
    disc(key, 0.073, 0.8, 0.22 - row * 0.46, 0.085, cyan, 0.075);
  }
  const tools = face("tools", [1.5, -1.5, 1.5]);
  for (let index = 0; index < 4; index++) box(tools, 0.28, 0.28, 0.11, -0.22 + index % 2 * 0.44, index < 2 ? 0.22 : -0.22, 0.04, shade(orange, 0.2), 0.055);
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
      const deployed = smooth(9.1 + index * 0.12, 11.2 + index * 0.12, time);
      bar.scale.y = 0.2 + deployed * 0.8;
    });
  }
  return {
    rig, pieces, update,
    dispose() { geometries.forEach((value) => value.dispose()); materials.forEach((value) => value.dispose()); },
  };
}
