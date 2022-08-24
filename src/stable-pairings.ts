import type { Instance } from "./instance.js";
import { Pairing } from "./pairing.js";

export class StablePairings {
  private readonly instance: Instance;

  public constructor(instance: Instance) {
    this.instance = instance;
  }

  public computeStablePairings(): Pairing[] {
    const pairing = this.findNextStablePairing(Pairing.empty(this.instance)) as Pairing;
    const results = this.findAllSolutions(pairing);

    return [pairing, ...results];
  }

  private findNextStablePairing(pairing: Pairing): Pairing | null {
    while (pairing.nextFreeM !== null) {
      const freeM = pairing.nextFreeM;
      const prefW = this.instance.prefsM[freeM][pairing.scoresM[freeM]];
      const mRank = this.instance.prefsW[prefW].findIndex((pref) => pref === freeM);
      const prevMRank = pairing.scoresW[prefW];
      if (mRank < prevMRank) {
        if (prevMRank < this.instance.size) {
          const m = this.instance.prefsW[prefW][prevMRank];
          if (!pairing.reject(m, prefW)) {
            return null;
          }
        }
         
        pairing.marry(freeM, prefW, mRank);
      }
      else {
        if (pairing.scoresM[freeM] < this.instance.size - 1) {
          pairing.scoresM[freeM]++;
        } else {
          return null;
        }
      }

      pairing.moveToNextFreeM();
    }
  
    return pairing;
  }

  private findAllSolutions(initPairing: Pairing, depth: number = 0): Pairing[] {
    const result: Pairing[] = [];
    const breakStart = initPairing.breaked === -1 ? 0 : initPairing.breaked;

    for(let m = breakStart; m < initPairing.pairs.length; m++) {
      const breaked = initPairing.break(m);
      if (breaked === null) {
        continue;
      }
      
      const pairing = this.findNextStablePairing(breaked);
      if (pairing === null) {
        continue;
      }
    
      result.push(pairing);
      result.push(...this.findAllSolutions(pairing, depth + 1));
    }
    
    return result;
  }
}
