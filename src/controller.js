import * as view from "./view.js";

window.addEventListener("load", main);
let TICK_RATE = 100;
let MAX_STACK_HEIGHT = Math.ceil(window.innerHeight / view.GNOME_HEIGHT - 2);
let ARR_LENGTH = Math.ceil(window.innerWidth / view.GNOME_WIDTH - 1);
let ALGORITHM = "gnome";
window.addEventListener("resize", () => {
  MAX_STACK_HEIGHT = window.innerHeight / view.GNOME_HEIGHT - 2;
  ARR_LENGTH = window.innerWidth / view.GNOME_WIDTH - 1;
  gnomeRestart();
});
let gnomes;
let restart = false;
let iterations = 0;

function main() {
  view.initEventListeners();
  init();
}

function init() {
  iterations = 0;
  view.hideOverlay();
  restart = false;
  gnomes = makeGnomeArray(MAX_STACK_HEIGHT, ARR_LENGTH);
  view.displayGnomes(gnomes);
  sortingAlgorithm(gnomes);
}

function sortingAlgorithm(arr) {
  switch (ALGORITHM) {
    case "gnome":
      return gnomeSort(arr);
    case "insertion-shift":
      return insertionSortShift(arr);
    case "insertion-swap":
      return insertionSortSwap(arr);
    case "bubble":
      return bubbleSort(arr);
    case "selection":
      return selectionSort(arr);
    case "quick":
      return quickSort(arr);
    case "merge":
      return mergeSort(arr);
    default:
      return gnomeSort(arr);
  }
}

export function gnomeRestart() {
  restart = true;
  // wait one tick for the restart to break the loop
  setTimeout(init, TICK_RATE);
}

// Gnome sort

async function gnomeSort(arr) {
  iterations = 0;
  let i = 0;
  while (i < arr.length) {
    iterations++;
    view.displayGnomes(gnomes);
    view.displayIterations(iterations);
    view.highlightCurrentGnome(i);
    if (i === 0 || arr[i] >= arr[i - 1]) {
      i++;
    } else {
      swapGnomes(i, i - 1, arr);
      i--;
    }
    if (restart) return;
    await sleep(TICK_RATE);
  }
  view.weveBeenSorted();
}

// Insertion Sort

async function insertionSortShift(arr) {
  for (let i = 1; i < arr.length; i++) {
    iterations++;
    const cur = arr[i];
    if (arr[i] >= arr[i - 1]) {
      continue;
    }
    let j = i;
    while (arr[j - 1] > cur && j > 0) {
      arr[j] = arr[--j];
      view.displayGnomes(gnomes);
      view.displayIterations(iterations);
      view.highlightCurrentGnome(j);
      if (restart) return;
      await sleep(TICK_RATE);
    }
    arr[j] = cur;
  }
  view.weveBeenSorted();
}

async function insertionSortSwap(arr) {
  iterations = 0;
  for (let i = 1; i < arr.length; i++) {
    iterations++;
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      const tmp = arr[j];
      arr[j] = arr[--j];
      arr[j] = tmp;
      view.displayGnomes(gnomes);
      view.displayIterations(iterations);
      view.highlightCurrentGnome(j);
      if (restart) return;
      await sleep(TICK_RATE);
    }
  }
  view.weveBeenSorted();
}

// Quick Sort

/**
 * sorts an array in place using quicksort algorithm, and returns it
 * @param {any[]} arr array to sort
 * @returns {any[]} sorted array
 */
async function quickSort(arr) {
  await _quickSort(arr, 0, arr.length - 1);
  view.weveBeenSorted();
  return arr;
}

/**
 * Sorts a "partition of an array" in place, divides it into partitions, then sorts those recursively
 * @param {any[]} arr
 * @param {number} low
 * @param {number} high
 * @returns {Promise<void>}
 */
async function _quickSort(arr, low, high) {
  if (low >= 0 && high >= 0 && low < high) {
    const pivot = await partition(arr, low, high);
    await Promise.all([
      _quickSort(arr, low, pivot),
      _quickSort(arr, pivot + 1, high),
    ]);
    if (restart) return;
  }
}

/**
 * Divides an array into partitions and returns the pivot
 * @param {any[]} arr the array to partition
 * @param {number} low the lower bound of partition
 * @param {number} high the upper bound of partition
 * @returns {Promise<number>} The pivot
 */
async function partition(arr, low, high) {
  const pivot = arr[low];
  while (true) {
    iterations++;
    // while element to the left of pivot is less than pivot, move right
    while (arr[low] < pivot) low++;

    // while element to the right of pivot is greater than pivot, move left
    while (arr[high] > pivot) high--;

    // If the indices crossed, return
    if (low >= high) {
      return high;
    }
    // if we get here, arr[low] >= pivot and arr[high] <= pivot, so we swap them
    swapGnomes(low, high, arr);
    low++; // increment low after swap
    high--; // decrement high after swap
    view.displayGnomes(gnomes);
    view.displayIterations(iterations);
    view.highlightCurrentGnome(pivot);
    await sleep(TICK_RATE);
  }
}

// helpers

function swapGnomes(i, j, arr) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function makeGnomeArray(max_value, length) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr[i] = Math.ceil(Math.random() * max_value);
  }
  return arr;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export function submitForm(e) {
  e.preventDefault();

  const tickRate = !isNaN(Number(e.target.tick_rate.value))
    ? Number(e.target.tick_rate.value)
    : TICK_RATE;
  const maxHeight = !isNaN(Number(e.target.stack_height.value))
    ? Number(e.target.stack_height.value)
    : MAX_STACK_HEIGHT;
  const arrLen = !isNaN(Number(e.target.arr_length.value))
    ? Number(e.target.arr_length.value)
    : ARR_LENGTH;

  ALGORITHM = e.target.algorithm.value;
  TICK_RATE = tickRate > 0 ? tickRate : TICK_RATE;
  MAX_STACK_HEIGHT = maxHeight > 0 ? maxHeight : MAX_STACK_HEIGHT;
  ARR_LENGTH = arrLen > 0 ? arrLen : ARR_LENGTH;
  gnomeRestart();
}
