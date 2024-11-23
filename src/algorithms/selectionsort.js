import * as helpers from "./helpers.js";
import * as controller from "../controller.js";

/**
 * selection sort
 * time complexity: O(n^2)
 * algorithm:
 * 1. find lowest value element in the array
 * 2. swap it with first element of array
 * 3. repeat for the rest
 * @param {number[]} arr
 * @returns {number[]} sorted array
 */
export default async function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
      controller.incrementIterations();
      controller.updateGnomesViewInplace();
      controller.highlightCurrentGnome(min);
      controller.highlightGnome(j);
      if (controller.didRestart()) return;
      await controller.sleep();
    }
    if (min !== i) {
      helpers.swapGnomes(i, min, arr);
    }
  }
  return arr;
}
