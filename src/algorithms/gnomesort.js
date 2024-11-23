import * as helpers from "./helpers.js";
import * as controller from "../controller.js";

/**
 * gnome sort (stupid sort) a variation of insertion sort
 * time complexity: O(n^2)
 * algorithm:
 * 1. go through the array
 * 2. if the current element is >= the previous, move right
 * 3. if the current element is less than the previous, swap them and move left
 * 4. repeat until the end is reached
 * @param {number[]} arr
 * @returns {number[]} sorted array
 */
export default async function gnomeSort(arr) {
  let i = 0;
  while (i < arr.length) {
    controller.incrementIterations();
    controller.updateGnomesViewInplace();
    controller.highlightCurrentGnome(i);
    if (controller.didRestart()) return;
    await controller.sleep();
    if (i === 0 || arr[i] >= arr[i - 1]) {
      i++;
    } else {
      helpers.swapGnomes(i, i - 1, arr);
      i--;
    }
  }
  controller.sortingComplete();
}
