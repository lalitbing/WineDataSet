function merge(arr1: Array<number>, arr2: Array<number>) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result[result.length] = arr1[i];
      i++;
    } else {
      result[result.length] = arr2[j];
      j++;
    }
  }

  while (i < arr1.length) {
    result[result.length] = arr1[i];
    i++;
  }

  while (j < arr2.length) {
    result[result.length] = arr2[j];
    j++;
  }

  return result;
}

export default function mergeSort(arr: Array<number>): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}
