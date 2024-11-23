import * as controller from "../controller.js";
import * as helpers from "./helpers.js";

/**
 * bubble sort
 * time complexity: O(n^2)
 * algorithm:
 * 1. go through the array
 * 2. for each element, compare it to the next element
 * 3. if it is greater than the next element, swap them
 * 4. repeat until no swaps are made
 * @param {number[]} arr
 * @returns {number[]} sorted array
 */
export default async function bubbleSort(arr) {
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      controller.incrementIterations();
      controller.updateGnomesViewInplace();
      controller.highlightCurrentGnome(i);
      if (controller.didRestart()) return;
      await controller.sleep();

      if (arr[i] > arr[i + 1]) {
        helpers.swapGnomes(i, i + 1, arr);
        swapped = true;
      }
    }
  }
  controller.sortingComplete();
}
