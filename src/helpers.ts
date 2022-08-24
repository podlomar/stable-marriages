export const shuffle = <T>(values: T[]): T[] => {
  const result = [...values];

  for (let i = 0; i < result.length; i++) {
    const index = i + Math.floor(Math.random() * (result.length - i));
    const temp = result[i];
    result[i] = result[index];
    result[index] = temp;
  }

  return result;
};

export const isPermutation = (array: number[]) => {
  const test = new Array(array.length).fill(false);
  array.forEach((i) => {
    if (i < test.length) {
      test[i] = true;
    }
  });
  return test.every((t) => t);
}
