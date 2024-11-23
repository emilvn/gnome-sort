import * as controller from "../controller.js";
import * as helpers from "./helpers.js";

/**
 * insertion sort
 * time complexity: O(n^2)
 * algorithm:
 * 1. go through the array
 * 2. for each element, compare it to the previous element
 * 3. if it is less than the previous, shift the previous right
 * 4. repeat until current element is greater than the previous element
 * @param {number[]} arr
 * @returns {number[]} sorted array
 */
export async function insertionSortShift(arr) {
  for (let i = 1; i < arr.length; i++) {
    const cur = arr[i];
    if (arr[i] >= arr[i - 1]) {
      continue;
    }
    let j = i;
    while (arr[j - 1] > cur && j > 0) {
      controller.incrementIterations();
      controller.updateGnomesViewInplace(arr);
      controller.highlightCurrentGnome(j);
      if (controller.didRestart()) return;
      await controller.sleep();
      arr[j] = arr[--j];
    }
    arr[j] = cur;
  }
  controller.sortingComplete();
}

/**
 * insertion sort
 * time complexity: O(n^2)
 * algorithm:
 * 1. go through the array
 * 2. for each element, compare it to the previous element
 * 3. if it is less than the previous, swap the two elements
 * 4. repeat until current element is greater than the previous element
 * @param {number[]} arr
 * @returns {number[]} sorted array
 */
export async function insertionSortSwap(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      controller.incrementIterations();
      controller.updateGnomesViewInplace(arr);
      controller.highlightCurrentGnome(j);
      if (controller.didRestart()) return;
      await controller.sleep();
      helpers.swapGnomes(j, j - 1, arr);
      j--;
    }
  }
  controller.sortingComplete();
}
