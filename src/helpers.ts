const { round: rnd, floor: flr } = Math;
export function toXYPoint(pt: Point, res: number): XYPoint {
  return { x: rnd(pt[0] * res), y: rnd(pt[1] * res) };
}
export function toPoint(xypt: XYPoint, res: number): Point {
  return [xypt.x / res, xypt.y / res];
}
export function toXYLoop(lp: Loop, res: number): XYLoop {
  return lp.map((pt) => toXYPoint(pt, res));
}
export function toLoop(xylp: XYLoop, res: number): Loop {
  return xylp.map((xypt) => toPoint(xypt, res));
}
export function toXYShape(sp: Shape, res: number): XYShape {
  return sp.map((lp) => toXYLoop(lp, res));
}
export function toShape(xysp: XYShape, res: number): Shape {
  return xysp.map((xylp) => toLoop(xylp, res));
}
