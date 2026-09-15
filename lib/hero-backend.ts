import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

type XY = [number, number];
type Piece = { group: THREE.Group; home: THREE.Vector3; cells: [number,number,number][] };
type Palette = { cyan: string; blue: string; magenta: string; orange: string; yellow: string };
const CELL = 1.5;
export const BACKEND_FLOOR_COLOR = "#0c1424";
export const BACKEND_RELIEF_SCALE = 1.2;
export const BACKEND_RECESS_DEPTH = 0.28;
export const BACKEND_FLOOR_Z = -1.5+BACKEND_RECESS_DEPTH;
export const BACKEND_OPENING_INSET = 0.12;
const ARCHITECTURES: Record<string, string> = { web: "storage", foundation: "orchestration", dashboard: "workflow", tools: "infrastructure" };

// One inset contour for each physical piece, including the concave four-cell shape.
// Shared cell edges disappear completely; there are no tile frames in the backend.
export function backendContour(cells: [number,number,number][], inset = BACKEND_OPENING_INSET): XY[] {
  const occupied = new Set(cells.map(([x,y]) => [-x,y].join(",")));
  const edges = new Map<string, XY>();
  for (const [x,y] of cells) {
    const gx = -x;
    const corners: XY[] = [[2*gx-1,2*y-1],[2*gx+1,2*y-1],[2*gx+1,2*y+1],[2*gx-1,2*y+1]];
    const neighbors = [[gx,y-1],[gx+1,y],[gx,y+1],[gx-1,y]];
    for (let side = 0; side < 4; side++) if (!occupied.has(neighbors[side].join(","))) edges.set(corners[side].join(","), corners[(side+1)%4]);
  }
  const first = edges.keys().next().value!;
  let key = first;
  const contour: XY[] = [];
  do {
    contour.push(key.split(",").map(Number).map((value) => value*CELL/2) as XY);
    const next = edges.get(key);
    if (!next || contour.length > edges.size) throw new Error("Backend contour must be one closed piece");
    key = next.join(",");
  } while (key !== first);
  const corners = contour.filter((point,index) => {
    const prev = contour[(index+contour.length-1)%contour.length];
    const next = contour[(index+1)%contour.length];
    return (point[0]-prev[0])*(next[1]-point[1]) !== (point[1]-prev[1])*(next[0]-point[0]);
  });
  return corners.map((point,index) => {
    const prev = corners[(index+corners.length-1)%corners.length];
    const next = corners[(index+1)%corners.length];
    const a = new THREE.Vector2(point[0]-prev[0],point[1]-prev[1]).normalize();
    const b = new THREE.Vector2(next[0]-point[0],next[1]-point[1]).normalize();
    const amount = inset/(1+a.dot(b));
    return [point[0]-(a.y+b.y)*amount,point[1]+(a.x+b.x)*amount];
  });
}

/** Four different architectures, each drawn continuously across its entire piece. */
export function attachHeroBackend(pieces: Piece[], palette: Palette, geometries: Set<THREE.BufferGeometry>, materials: Set<THREE.Material>) {
  const { cyan, blue, magenta, orange, yellow } = palette;
  const muted = blue;
  const surfaceColors = new Set<string>();
  const cache = new Map<string, THREE.MeshStandardMaterial>();
  const material = (color: string) => {
    if (!cache.has(color)) {
      const surface = surfaceColors.has(color);
      const floor = color === BACKEND_FLOOR_COLOR;
      const value = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: floor ? 0.025 : surface ? 0.2 : 0.42, roughness: floor ? 0.85 : surface ? 0.58 : 0.4, metalness: 0, envMapIntensity: floor ? 0.01 : 0.025 });
      cache.set(color,value);
      materials.add(value);
    }
    return cache.get(color)!;
  };

  for (const piece of pieces) {
    const cells = piece.cells.filter((cell) => cell[2] === 0);
    if (!cells.length) continue;
    const pigments: Record<string,string> = { web:blue, foundation:cyan, dashboard:magenta, tools:orange };
    const pigment=new THREE.Color(pigments[piece.group.name]);
    const floorColor=BACKEND_FLOOR_COLOR;
    const componentColor=`#${pigment.clone().multiplyScalar(0.75).getHexString()}`;
    surfaceColors.add(floorColor);
    surfaceColors.add(componentColor);
    const back = new THREE.Group();
    back.name = "backend";
    back.userData.architecture = ARCHITECTURES[piece.group.name];
    back.position.set(0,0,BACKEND_FLOOR_Z-0.025).sub(piece.home);
    back.rotation.y = Math.PI;
    piece.group.add(back);
    const drawingCenter = cells.reduce((sum,[x,y]) => sum.add(new THREE.Vector2(-x*CELL,y*CELL)), new THREE.Vector2()).divideScalar(cells.length);
    const batches = new Map<string, THREE.BufferGeometry[]>();
    const add = (geometry: THREE.BufferGeometry, color: string, insetDrawing = true) => {
      if (insetDrawing) {
        // Lift the existing components by 20% from the circuit-board surface.
        // The colored body walls and the recessed floor keep their existing geometry.
        geometry.translate(0,0,-0.045);
        geometry.scale(1,1,BACKEND_RELIEF_SCALE);
        geometry.translate(0,0,0.045);
        geometry.scale(0.88,0.88,1);
        geometry.translate(drawingCenter.x*0.12,drawingCenter.y*0.12,0);
      }
      let flat = geometry;
      if (geometry.index) { flat = geometry.toNonIndexed(); geometry.dispose(); }
      if (!batches.has(color)) batches.set(color,[]);
      batches.get(color)!.push(flat);
    };
    const rect = (x:number,y:number,w:number,h:number,color:string,z=0.062,d=0.014) => {
      const geometry = new THREE.BoxGeometry(w,h,d);
      geometry.translate(x,y,z);
      add(geometry,color);
    };
    const line = (a:XY,b:XY,color=muted,width=0.012,z=0.053) => {
      const dx=b[0]-a[0], dy=b[1]-a[1];
      if (Math.hypot(dx,dy)<0.0001) return;
      const geometry=new THREE.BoxGeometry(Math.hypot(dx,dy),width,0.008);
      geometry.rotateZ(Math.atan2(dy,dx));
      geometry.translate((a[0]+b[0])/2,(a[1]+b[1])/2,z);
      add(geometry,color);
    };
    const route = (points:XY[],color=muted,width=0.012,z=0.053) => {
      for(let i=1;i<points.length;i++) line(points[i-1],points[i],color,width,z);
    };
    const ellipse = (x:number,y:number,rx:number,ry:number,color:string,z=0.085) => {
      const geometry = new THREE.TorusGeometry(1,0.037,4,40);
      geometry.scale(rx,ry,0.16);
      geometry.translate(x,y,z);
      add(geometry,color);
    };
    const dot = (x:number,y:number,r:number,color:string) => {
      const geometry = new THREE.CylinderGeometry(r,r,0.045,16);
      geometry.rotateX(Math.PI/2);
      geometry.translate(x,y,0.09);
      add(geometry,color);
    };
    const node = (x:number,y:number,w:number,h:number,color=blue) => {
      rect(x,y,w,h,componentColor,0.09,0.09);
      route([[x-w/2,y-h/2],[x+w/2,y-h/2],[x+w/2,y+h/2],[x-w/2,y+h/2],[x-w/2,y-h/2]],color,0.015,0.14);
      rect(x-w*0.23,y,w*0.14,h*0.2,color,0.147);
      rect(x+w*0.1,y,w*0.27,0.014,muted,0.147);
    };
    const drum = (x:number,y:number,radius:number,height:number,color:string) => {
      const z=0.1;
      const body=new THREE.CylinderGeometry(radius,radius,height,32);
      body.scale(1,1,0.25);
      body.translate(x,y,z);
      add(body,componentColor);
      for(let layer=0;layer<4;layer++) {
        const band=new THREE.TorusGeometry(radius+0.004,0.008,6,40);
        band.rotateX(Math.PI/2);
        band.scale(1,1,0.25);
        band.translate(x,y+height/2-layer*height/3,z);
        add(band,layer===0?color:blue);
      }
    };

    const contour = backendContour(cells,0.255);
    back.userData.contour = contour;
    const shape = new THREE.Shape(contour.map(([x,y])=>new THREE.Vector2(x,y)));
    const plate = new THREE.ExtrudeGeometry(shape,{depth:0.025,bevelEnabled:false,steps:1});
    plate.translate(0,0,0.012);
    add(plate,floorColor,false);

    if(piece.group.name === "foundation") {
      // A single S-shaped neural/orchestration architecture spanning all four cells.
      route([[.75,1.5],[1.1,1.5],[1.1,.38],[0,.38],[0,0],[-.75,0]],blue,.022);
      route([[1.95,1.55],[1.95,-.38],[.36,-.38],[.36,-1.5],[.75,-1.5]],cyan,.016);
      route([[0,-.2],[0,-1.5],[-.75,-1.5]],magenta,.019);
      node(0,0,.55,.45,magenta);
      for(let pin=0;pin<8;pin++) {
        rect(-.22+pin*.063,.27,.014,.07,cyan,.1,.035);
        rect(-.22+pin*.063,-.27,.014,.07,blue,.1,.035);
      }
      const columns = [[1.08,[-.29,.02,.32]],[1.46,[-.43,-.12,.2,.48]],[1.83,[-.23,.09,.4]]] as const;
      for(let c=0;c<columns.length-1;c++) for(const ay of columns[c][1]) for(const by of columns[c+1][1]) {
        line([columns[c][0],ay],[columns[c+1][0],by],muted,.009);
      }
      columns.forEach(([x,ys],index)=>ys.forEach((y,i)=>dot(x,y,.048,(i+index)%3===0?magenta:cyan)));
      route([[.28,0],[.7,0],[.7,.02],[1.08,.02]],magenta,.016);
      // The upper arm is an orchestration cluster; the bottom arm is a queue bus.
      ellipse(1.52,1.46,.25,.25,magenta);
      dot(1.52,1.46,.065,yellow);
      for(let i=0;i<6;i++) {
        const angle=i*Math.PI/3;
        const x=1.52+Math.cos(angle)*.45,y=1.46+Math.sin(angle)*.45;
        line([1.52,1.46],[x,y],muted);
        node(x,y,.16,.11,i%2?blue:cyan);
      }
      for(let row=0;row<5;row++) {
        const y=-1.13-row*.16;
        route([[-.5,y],[.52,y]],muted);
        for(let col=0;col<3+(row%2);col++) rect(-.39+col*.19,y,.12,.065,col===row%3?magenta:blue,.09,.09);
      }
      for(let i=0;i<4;i++) route([[.1+i*.07,.55],[.1+i*.07,.64],[1.28+i*.07,.64],[1.28+i*.07,1.02]],i===1?cyan:muted,.009);
    } else if(piece.group.name === "web") {
      // One database silhouette, its replica volumes and indexing branches.
      const x=1.38,y=-1.42;
      drum(x,y,.26,.53,cyan);
      route([[.75,-1.5],[.98,-1.5],[.98,-1.12],[x,-1.12]],cyan,.02);
      route([[1.66,-1.42],[1.83,-1.42],[1.83,-1.92],[1.23,-1.92]],magenta);
      for(let i=0;i<3;i++) {
        const by=-1.06-i*.36;
        drum(1.96,by-.045,.095,.12,magenta);
        route([[1.83,-1.42],[1.83,by],[1.84,by]],muted);
        dot(2.12,by,.018,yellow);
      }
      for(let i=0;i<5;i++) rect(1.1+i*.15,-2.02,.075,.035,i===2?cyan:muted);
      node(1.36,-.96,.36,.13,blue);
    } else if(piece.group.name === "dashboard") {
      // A wide workflow: a gateway, a branching decision and parallel processing lanes.
      route([[-1.5,.75],[-1.5,1.12],[-1.97,1.12],[-1.97,1.5],[-1.5,1.5]],cyan,.017);
      node(-1.97,1.5,.28,.34,cyan);
      const diamond:XY[]=[[-1.47,1.5],[-1.23,1.74],[-.99,1.5],[-1.23,1.26],[-1.47,1.5]];
      route(diamond,orange,.021);
      route([[-1.23,1.74],[-1.23,1.96],[-.28,1.96],[-.28,1.75]],magenta,.016);
      route([[-1.23,1.26],[-1.23,1.05],[-.28,1.05],[-.28,1.25]],blue,.016);
      node(-.53,1.85,.39,.22,magenta);
      node(-.53,1.15,.39,.22,blue);
      route([[-.28,1.85],[.14,1.85],[.14,1.5],[.75,1.5]],yellow,.017);
      route([[-.28,1.15],[.14,1.15],[.14,1.5]],cyan,.016);
      node(.38,1.5,.31,.32,yellow);
      for(let i=0;i<4;i++) {
        rect(-1.97,1.82+i*.055,.12-i*.018,.014,blue);
        node(-.92+i*.23,1.51,.12,.095,i%2?blue:muted);
      }
      for(let i=0;i<3;i++) route([[-.94,2.08-i*.035],[-.16,2.08-i*.035],[-.16,1.85]],muted,.008);
    } else if(piece.group.name === "tools") {
      // A tall infrastructure module: server shelves and an activity monitor on one bus.
      route([[-1.5,.75],[-1.5,.5],[-2.03,.5],[-2.03,-1.97],[-1.48,-1.97]],blue,.021);
      route([[-.75,0],[-1.03,0],[-1.03,-1.5],[-.75,-1.5]],orange,.02);
      for(let rack=0;rack<5;rack++) {
        const y=.33-rack*.205;
        node(-1.53,y,.82,.14,rack===2?orange:blue);
        for(let led=0;led<3;led++) dot(-1.8+led*.065,y,.014,led===rack%3?yellow:cyan);
        route([[-1.12,y],[-1.03,y]],muted);
      }
      route([[-1.97,-.88],[-1.97,-1.82],[-1.14,-1.82]],cyan,.012);
      for(let i=0;i<4;i++) line([-1.94,-1.01-i*.21],[-1.17,-1.01-i*.21],muted,.008);
      route([[-1.93,-1.56],[-1.82,-1.5],[-1.7,-1.6],[-1.58,-1.04],[-1.46,-1.48],[-1.32,-1.3],[-1.17,-1.37]],orange,.018);
      for(let i=0;i<3;i++) {
        const y=-1.15-i*.21;
        dot(-.97,y,.033,i===1?yellow:cyan);
        rect(-1.06,y,.035,.009,muted);
      }
      for(let i=0;i<5;i++) rect(-1.91+i*.16,-2.07,.075,.04,i%2?blue:orange);
    }

    for(const [color,parts] of batches) {
      const geometry=mergeGeometries(parts)!;
      parts.forEach((part)=>part.dispose());
      geometries.add(geometry);
      const mesh=new THREE.Mesh(geometry,material(color));
      mesh.castShadow=false;
      mesh.receiveShadow=true;
      back.add(mesh);
    }
  }
}
