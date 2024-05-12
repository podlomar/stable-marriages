export type Matrix = readonly number[][];

const isPermutation = (inputArray: readonly number[]): boolean => {
  const test = new Array(inputArray.length).fill(false);
  for (let i = 0; i < inputArray.length; i++) {
    const num = inputArray[i];
    if (Number.isInteger(num) && num >= 0 && num < test.length) {
      test[num] = true;
    } else {
      return false;
    }
  }

  return test.every((t) => t);
}

export const isPreferencesMatrix = (matrix: Matrix, size: number): boolean => {
  if (matrix.length !== size) {
    return false;
  }

  for(let i = 0; i < size; i++) {
    if (matrix[i].length !== size) {
      return false;
    }

    if (!isPermutation(matrix[i])) {
      return false;
    }
  }

  return true;
}

const shuffle = <T>(values: T[]): T[] => {
  const result = [...values];

  for (let i = 0; i < result.length; i++) {
    const index = i + Math.floor(Math.random() * (result.length - i));
    const temp = result[i];
    result[i] = result[index];
    result[index] = temp;
  }

  return result;
};

export class Instance {
  public readonly size: number;
  public readonly prefsM: Matrix;
  public readonly prefsW: Matrix;

  private constructor(size: number, prefsM: Matrix, prefsW: Matrix) {
    this.size = size;
    this.prefsM = prefsM;
    this.prefsW = prefsW;
  }

  /**
   * Create an instance of the marriages problem - men and women being matched together
   * bases on thier preferences.
   * 
   * @param {number} size - The number of men (or women) in the instance
   * @param {Matrix} prefsM - The matrix of men's preferences. An array on index `i` represents the preference list
   * of man `i`.
   * @param {Matrix} prefsW - The matrix of women's preferences. An array on index `i` represents the preference list
   * of woman `i`.
   */
  public static create = (size: number, prefsM: Matrix, prefsW: Matrix): Instance => {
    if (size < 1) {
      throw new Error('Invalid marriages instance');
    }
    
    if (!isPreferencesMatrix(prefsM, size) || !isPreferencesMatrix(prefsW, size)) {
      throw new Error('Invalid marriages instance');
    }

    return new Instance(size, prefsM, prefsW);
  }

  /**
   * Create a completely random instance of size `size`.
   * 
   * @param {number} size - The number of men (or women) in the instance
   */
  public static random = (size: number): Instance => {
    const elements: number[] = new Array(size).fill(null).map((_, i) => i);
    const prefsM = elements.map(() => shuffle(elements));
    const prefsW = elements.map(() => shuffle(elements));
    return new Instance(size, prefsM, prefsW);
  }

  /**
   * Nicely print the arrangment of this instance
   */
  public toString() {
    const indices = new Array(this.size).fill(0).map((_, i) => i);
    let result = `${[...indices].reverse().join(' ')}           ${indices.join(' ')}\n`;

    for(let i = 0; i < this.size; i++) {
      const prefsM = this.prefsM[i]
        .map((pref) => String(pref))
        .reverse()
        .join(' ');
      const prefsW = this.prefsW[i]
        .map((pref) => String(pref))
        .join(' ');
      
      result += `\n${prefsM} | ${i} - ${i} | ${prefsW}`;
    }
      
    return result;
  }
}
