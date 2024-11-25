import * as controller from "../controller.js";

/**
 * Pancake sort implementation optimized for reducing unnecessary comparisons
 * when finding the maximum element in each iteration.
 *
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * Algorithm steps:
 *
 * 1. For each position from end to start:
 *
 *    1.1. Find maximum in unsorted portion:
 *      - Track current and previous maximum while searching
 *      - If we find a value === previous maximum, we break early
 *
 *    1.2. If maximum is not in correct position:
 *      - If maximum is not at front:
 *          - flip array from front to maximum
 *      - Flip array from front to correct position
 *
 *    1.3. Reduce unsorted portion size by 1
 *
 * 2. Return the sorted array
 *
 * @param {number[]} arr - Array to be sorted
 * @returns {Promise<number[]>} The sorted array
 */
export default async function pancakeSort(arr) {
  controller.highlightUnsortedRegion(arr.length);
  let prevMax = Math.INFINITY;
  for (let size = arr.length; size > 1; size--) {
    let maxIdx = 0;
    let maxValue = arr[0];

    // Find maximum with early termination
    for (let i = 0; i < size; i++) {
      if (i > 0) controller.incrementIterations();

      controller.updateGnomesViewInplace();
      controller.highlightUnsortedRegion(size);
      controller.highlightCurrentGnome(i);
      controller.highlightGnome(maxIdx);
      if (controller.didRestart()) return arr;
      await controller.sleep();

      if (arr[i] === prevMax) {
        maxIdx = i;
        maxValue = arr[i];
        break;
      }

      if (arr[i] > maxValue) {
        maxIdx = i;
        maxValue = arr[i];
      }
    }
    prevMax = maxValue;
    // Skip if maximum is already in position
    if (maxIdx === size - 1) {
      controller.clearCurrentHighlights();
      controller.highlightUnsortedRegion(size - 1);
      if (controller.didRestart()) return arr;
      await controller.sleep();
      continue;
    }

    // Perform flips
    if (maxIdx !== 0) {
      flipPancake(arr, 0, maxIdx);
      controller.updateGnomesViewInplace();
    }
    await controller.sleep();
    flipPancake(arr, 0, size - 1);
    controller.updateGnomesViewInplace();

    controller.clearCurrentHighlights();
    controller.highlightUnsortedRegion(size - 1);
    if (controller.didRestart()) return arr;
    await controller.sleep();
  }

  controller.clearAllHighlights();
  controller.sortingComplete();
  return arr;
}

function flipPancake(arr, start, end) {
  for (let left = start, right = end; left < right; left++, right--) {
    controller.incrementIterations();
    [arr[left], arr[right]] = [arr[right], arr[left]];
  }
}
