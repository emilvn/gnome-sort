import * as helpers from "./helpers.js";
import * as controller from "../controller.js";

/**
 * quicksort
 * time complexity: O(n log n)
 * algorithm:
 * 1. choose a pivot
 * 2. partition the array into two arrays
 *    so all elements less than pivot are on the left
 *    and all elements greater than pivot are on the right
 * 3. recursively sort the two arrays
 * 4. combine
 * @param {number[]} arr array to sort
 * @returns {number[]} sorted array
 */
export default async function quickSort(arr) {
  await _quickSort(arr, 0, arr.length - 1);
  controller.sortingComplete();
  return arr;
}

/**
 * Sorts a "partition of an array" in place, divides it into partitions, then sorts those recursively
 * @param {number[]} arr
 * @param {number} low
 * @param {number} high
 * @returns {Promise<void>}
 */
async function _quickSort(arr, low, high) {
  if (low >= 0 && high >= 0 && low < high) {
    const pivot = await partition(arr, low, high);
    controller.highlightCurrentGnome(pivot);
    await _quickSort(arr, low, pivot);
    await _quickSort(arr, pivot + 1, high);
    if (controller.didRestart()) return;
  }
}

/**
 * Divides an array into partitions and returns the pivot
 * @param {number[]} arr the array to partition
 * @param {number} low the lower bound of partition
 * @param {number} high the upper bound of partition
 * @returns {Promise<number | void>} The pivot
 */
async function partition(arr, low, high) {
  const pivot = arr[low];
  while (true) {
    controller.updateGnomesViewInplace();
    controller.highlightCurrentGnome(pivot);
    controller.highlightGnome(low);
    controller.highlightGnome(high);
    if (controller.didRestart()) return;
    await controller.sleep();

    // while element to the left of pivot is less than pivot, move right
    while (arr[low] < pivot) {
      controller.incrementIterations();
      low++;
      controller.highlightGnome(low);
      await controller.sleep();
    }

    // while element to the right of pivot is greater than pivot, move left
    while (arr[high] > pivot) {
      controller.incrementIterations();
      high--;
      controller.highlightGnome1(high);
      await controller.sleep();
    }

    // If the indices crossed, return
    if (low >= high) {
      return high;
    }
    // if we get here, arr[low] >= pivot and arr[high] <= pivot, so we swap them
    helpers.swapGnomes(low, high, arr);
    low++; // increment low after swap
    high--; // decrement high after swap
  }
}
