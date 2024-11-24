import * as controller from "../controller.js";
import * as helpers from "./helpers.js";

/**
 * Pancake sort implementation optimized for reducing unnecessary comparisons 
 * when finding the maximum element in each iteration.
 * 
 * Unlike the basic pancake sort that always searches the entire unsorted portion,
 * this implementation:
 * - Tracks the largest value seen in the unsorted portion to enable early termination
 * - Skips flip operations when elements are already in position
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Best performance when array contains distinct value clusters, as this 
 * maximizes opportunities for early termination during max-finding.
 * 
 * Algorithm steps:
 * 
 * 1. Initialize by finding the largest value in the entire array
 * 
 * 2. For each position from end to start:
 *    
 *    2.1. Find maximum in unsorted portion (optimized):
 *      - Track current maximum while searching
 *      - If we find value >= largestSeenUnsorted, we've found our definite maximum
 *      - Update largestSeenUnsorted for next iteration
 *    
 *    2.2. If maximum is not in correct position:
 *      - If maximum is not at front, flip array from front to maximum
 *      - Flip array from front to correct position
 *    
 *    2.3. Reduce unsorted portion size by 1
 * 
 * 3. Return the sorted array
 * 
 * @param {number[]} arr - Array to be sorted
 * @returns {Promise<number[]>} The sorted array
 */
export default async function pancakeSort(arr) {
    controller.highlightUnsortedRegion(arr.length);
    let largestSeenUnsorted = Math.max(...arr);
    
    for (let size = arr.length; size > 1; size--) {
        let maxIdx = 0;
        let maxValue = arr[0];
        let foundDefiniteMax = false;
        
        // Find maximum with early termination
        for (let i = 0; i < size && !foundDefiniteMax; i++) {
            if (i > 0) controller.incrementIterations();
            
            controller.updateGnomesViewInplace();
            controller.highlightUnsortedRegion(size);
            controller.highlightCurrentGnome(i);
            controller.highlightGnome(maxIdx);
            if (controller.didRestart()) return arr;
            await controller.sleep();
            
            if (arr[i] > maxValue) {
                maxIdx = i;
                maxValue = arr[i];
                foundDefiniteMax = maxValue >= largestSeenUnsorted;
            }
        }
        
        largestSeenUnsorted = Math.max(...arr.slice(0, size - 1));
        
        // Skip if maximum is already in position
        if (maxIdx === size - 1) {
            controller.clearCurrentHighlights();
            controller.highlightUnsortedRegion(size - 1);
            await controller.sleep();
            continue;
        }
        
        // Perform flips
        if (maxIdx !== 0) {
            await helpers.animateFlip(arr, 0, maxIdx);
            controller.updateGnomesViewInplace();
        }
        await helpers.animateFlip(arr, 0, size - 1);
        controller.updateGnomesViewInplace();
        
        controller.clearCurrentHighlights();
        controller.highlightUnsortedRegion(size - 1);
        await controller.sleep();
    }
    
    controller.clearAllHighlights();
    controller.sortingComplete();
    return arr;
}