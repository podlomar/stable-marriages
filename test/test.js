import { Instance, StablePairings } from "../dist/index.js";

const instance = Instance.create(8, [
  [2, 0, 4, 6, 3, 1, 7, 5],
  [5, 0, 2, 3, 7, 6, 4, 1],
  [6, 3, 2, 5, 4, 0, 1, 7],
  [4, 2, 7, 1, 5, 0, 3, 6],
  [3, 0, 1, 7, 6, 2, 5, 4],
  [5, 1, 4, 6, 7, 3, 2, 0],
  [6, 7, 0, 5, 1, 2, 3, 4],
  [1, 5, 6, 0, 7, 2, 3, 4],
], [
  [3, 2, 7, 0, 1, 4, 6, 5],
  [2, 6, 4, 7, 5, 3, 0, 1],
  [6, 4, 7, 2, 5, 1, 0, 3],
  [5, 3, 1, 6, 2, 0, 4, 7],
  [7, 6, 0, 4, 5, 3, 2, 1],
  [4, 3, 6, 5, 1, 7, 2, 0],
  [0, 3, 4, 5, 1, 7, 2, 6],
  [1, 4, 3, 2, 6, 7, 0, 5],
]);

const stablePairings = new StablePairings(instance);
const pairings = stablePairings.compute();

console.log('Total pairings: ', pairings.length);

pairings.forEach((pairing) => console.log(pairing.toString()));
