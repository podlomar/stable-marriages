import * as codec from "./codec.js";
import type { Instance } from "../instance.js";
import { Pairing } from "../pairing.js";

export const decodePairing = (instance: Instance, code: string): Pairing => {
  const data = codec.decode(code);
  const size = data.length / 3;

  const pairs = data.slice(0, size);
  const scoresM = data.slice(size, 2 * size);
  const scoresW = data.slice(2*size);
  
  return new Pairing(instance, pairs, scoresM, scoresW);
}

export const encodePairing = (pairing: Pairing): string => {
  return codec.encode([...pairing.pairs, ...pairing.scoresM, ...pairing.scoresW]);
}
