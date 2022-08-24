import { shuffle, isPermutation } from "./helpers.js";

export class Instance {
  public readonly size: number;
  public readonly prefsM: readonly number[][];
  public readonly prefsW: readonly number[][];

  public constructor(size: number, prefsM: readonly number[][], prefsW: readonly number[][]) {
    const errorMsg = 'Invalid instance';
  
    if (prefsM.length !== size || prefsW.length !== size) {
      throw new Error(errorMsg);
    }

    for(let i = 0; i < size; i++) {
      if (prefsM[i].length !== size || prefsW[i].length !== size) {
        throw new Error(errorMsg);
      }

      if (!isPermutation(prefsM[i]) || !isPermutation(prefsW[i])) {
        throw new Error(errorMsg);
      }
    }

    this.size = size;
    this.prefsM = prefsM;
    this.prefsW = prefsW;
  }

  public static random = (size: number): Instance => {
    const elements: number[] = new Array(size).fill(null).map((_, i) => i);
    const prefsM = elements.map(() => shuffle(elements));
    const prefsW = elements.map(() => shuffle(elements));
    return new Instance(size, prefsM, prefsW);
  }

  public toString() {
    let result = '';
    
    for(let i = 0; i < this.size; i++) {
      const prefsM = this.prefsM[i]
        .map((pref) => String(pref))
        .reverse()
        .join(' ');
      const prefsW = this.prefsW[i]
        .map((pref) => String(pref))
        .join(' ');
      
      result += `${prefsM} | ${i} - ${i} | ${prefsW}\n`;
    }
      
    return result;
  }
}
