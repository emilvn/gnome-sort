import * as view from "./view.js";
import quickSort from "./algorithms/quicksort.js";
import gnomeSort from "./algorithms/gnomesort.js";
import {
  insertionSortShift,
  insertionSortSwap,
} from "./algorithms/insertionsort.js";
import selectionSort from "./algorithms/selectionsort.js";
import bubbleSort from "./algorithms/bubblesort.js";
import pancakeSort from "./algorithms/pancakesort.js";

window.addEventListener("load", main);
// make gnome array fit screen
window.addEventListener("resize", () => {
  MAX_STACK_HEIGHT = window.innerHeight / view.GNOME_HEIGHT - 3;
  ARR_LENGTH = window.innerWidth / view.GNOME_WIDTH - 2;
  gnomeRestart();
});

let TICK_RATE = 500;
let MAX_STACK_HEIGHT = Math.ceil(window.innerHeight / view.GNOME_HEIGHT - 3);
let ARR_LENGTH = Math.ceil(window.innerWidth / view.GNOME_WIDTH - 2);
let ALGORITHM = "pancake";
let gnomes;
let restart = false;
let iterations = 0;

const algorithmTextMap = {
  gnome: "Gnome Sort",
  "insertion-shift": "Insertion Sort (Shift)",
  "insertion-swap": "Insertion Sort (Swap)",
  bubble: "Bubble Sort",
  selection: "Selection Sort",
  quick: "Quick Sort",
  pancake: "Pancake Sort",
};

function main() {
  view.initEventListeners();
  init();
}

function init() {
  iterations = 0;
  view.hideOverlay();
  view.showAlgorithm(algorithmTextMap[ALGORITHM]);
  view.initInputValues(TICK_RATE, MAX_STACK_HEIGHT, ARR_LENGTH);
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
    case "pancake":
      return pancakeSort(arr);
    default:
      return pancakeSort(arr);
  }
}

export function gnomeRestart() {
  restart = true;
  // wait one tick for the restart to break the loop
  setTimeout(init, TICK_RATE);
}

export function sleep() {
  return new Promise((r) => setTimeout(r, TICK_RATE));
}

function makeGnomeArray(max_value, length) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr[i] = Math.ceil(Math.random() * max_value);
  }
  return arr;
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

export function updateGnomesViewInplace() {
  view.displayGnomes(gnomes);
  view.displayIterations(iterations);
}

export function updateGnomesView(arr) {
  gnomes = arr;
  view.displayGnomes(gnomes);
  view.displayIterations(iterations);
}

export function sortingComplete() {
  if (isSorted(gnomes)) {
    view.weveBeenSorted();
  }
}

export function highlightCurrentGnome(index) {
  view.highlightCurrentGnome(index);
}

export function highlightGnome(index) {
  view.highlightGnome(index);
}

export function highlightGnome1(index) {
  view.highlightGnome1(index);
}

export function highlightUnsortedRegion(size) {
  view.highlightUnsortedRegion(size);
}

export function clearCurrentHighlights() {
  view.clearCurrentHighlights();
}

export function clearAllHighlights() {
  view.clearAllHighlights();
}

export function didRestart() {
  return restart;
}

export function incrementIterations() {
  iterations++;
}

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}
