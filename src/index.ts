import {
  ClipperLibWrapper,
  EndType,
  JoinType,
  loadNativeClipperLibInstanceAsync,
  NativeClipperLibRequestedFormat,
} from '../node_modules/js-angusj-clipper/universal/index';
import { toLoop, toXYLoop, toXYShape, toShape } from './helpers';
import './types';
export * from './helpers';
class clipperHelper {
  clipperInstance?: ClipperLibWrapper;
  res: number;
  constructor(res = 1000) {
    this.res = 1000;
  }
  async setup() {
    let lib = await loadNativeClipperLibInstanceAsync(
      NativeClipperLibRequestedFormat.WasmWithAsmJsFallback
    );
    this.clipperInstance = lib;
  }
  offsetShape(sp: Shape, dist: number) {
    const ci = this.clipperInstance!;
    let xySp = toXYShape(sp, this.res);
    const output = ci.offsetToPaths({
      delta: dist * this.res,
      cleanDistance: 0,
      miterLimit: 4,
      offsetInputs: xySp.map((sp) => ({
        data: sp,
        endType: EndType.ClosedPolygon,
        joinType: JoinType.Square,
      })),
    });
    return toShape(output, this.res);
  }
  offsetLoop(lp: Loop, dist: number) {
    const ci = this.clipperInstance!;
    let xyLp = toXYLoop(lp, this.res);
    const output = ci.offsetToPaths({
      delta: dist * this.res,
      cleanDistance: 0,
      miterLimit: 4,
      offsetInputs: [
        {
          data: xyLp,
          endType: EndType.ClosedPolygon,
          joinType: JoinType.Square,
        },
      ],
    });
    return toLoop(output[0], this.res);
  }
}
export type ClipperHelper = clipperHelper;
export async function newClipperHelper(res = 1000) {
  let cl = new clipperHelper(res);
  await cl.setup();
  return cl;
}
export default newClipperHelper;
