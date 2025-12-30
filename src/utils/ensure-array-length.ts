export interface RepeatedItem<T> {
  data: T;
  repeats: number;
}

export function ensureArrayLength<T>(
  array: T[],
  targetLength: number
): RepeatedItem<T>[] {
  if (array.length === 0) {
    throw new Error("Array cannot be empty");
  }

  if (targetLength <= 0) {
    throw new Error("Target length must be greater than 0");
  }

  const result: RepeatedItem<T>[] = [];

  for (let i = 0; i < targetLength; i++) {
    const index = i % array.length;
    const repeatCycle = Math.floor(i / array.length);

    result.push({
      data: array[index],
      repeats: repeatCycle,
    });
  }

  return result;
}
