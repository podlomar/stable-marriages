import * as codec from "./codec.js";
import type { Instance } from "../instance.js";

export const decodeInstance = (code: string): Instance => {
  const [size, ...data] = codec.decode(code);
  const prefsM: number[][] = new Array(size);
  const prefsW: number[][] = new Array(size);

  for (let i = 0; i < size; i += 1) {
    const mOffset = i * size;
    const wOffset = size * size + i * size;
    prefsM[i] = data.slice(mOffset, mOffset + size);
    prefsW[i] = data.slice(wOffset, wOffset + size);
  }

  return { size, prefsM, prefsW };
}

export const encodeInstance = (instance: Instance): string => {
  return codec.encode([
    instance.size,
    ...instance.prefsM.flat(),
    ...instance.prefsW.flat(),
  ]);
};
