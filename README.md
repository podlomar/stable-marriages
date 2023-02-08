# stable-marriages

Implementation of the [extended Gale-Shapley algorithm](https://en.wikipedia.org/wiki/Gale%E2%80%93Shapley_algorithm) for recursively finding all solutions to [The stable marriage problem](https://dl.acm.org/doi/abs/10.1145/362619.362631)

## Installation

```
npm install stable-marriages
```

## Usage

First, import the `Instance` and `StablePairings` classes.

```
import { Instance, StablePairings } from "stable-marriages";
```

An instance of size (for example) 8 has 8 man on one side and 8 women on the other side. Men and women have numbers from 0 to 7. For an instance of size 8 you need to provide two 8x8 matrices with all the preference lists, one matrix for men, one matrix for women. In each matrix an array on index `i` represents the preference list of man/woman with number `i`.

```
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
```

Getting all stable pairings:

```
const stablePairings = new StablePairings(instance);
const pairings = stablePairings.compute();
```

For this particulast instance you should get 23 pairings. Each pairing is represented by the `Pairing` class. You can get the paired men and women from, say, the first pairing by looking at the array `pairings[0].pairs`.

```
console.log(pairings[0].pairs)
// [2, 0, 6, 4, 3, 5, 7, 1]
```

This says that man `0` is paired with women `2`, man `1` with women `0` etc.
