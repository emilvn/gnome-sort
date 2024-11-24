/**
 * Swaps the elements at the specified indices in the given array.
 *
 * @param {number} i - The index of the first element to swap.
 * @param {number} j - The index of the second element to swap.
 * @param {Array} arr - The array in which the elements will be swapped.
 */
export function swapGnomes(i, j, arr) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
