import * as view from "./view.js";

window.addEventListener("load", main);

let TICK_RATE = 100;
let MAX_STACK_HEIGHT = 10;
let ARR_LENGTH = 30;
let gnomes;
let restart = false;

function main() {
  view.initEventListeners();
  init();
}

function init() {
  view.hideOverlay();
  restart = false;
  gnomes = makeGnomeArray(MAX_STACK_HEIGHT, ARR_LENGTH);
  view.displayGnomes(gnomes);
  gnomeSort(gnomes);
}

export function gnomeRestart() {
  restart = true;
  // wait one tick for the restart to break the loop
  setTimeout(init, TICK_RATE);
}

async function gnomeSort(arr) {
  let i = 0;
  while (i < arr.length) {
    view.displayGnomes(gnomes);
    view.highlightCurrentGnome(i);
    if (i === 0 || arr[i] >= arr[i - 1]) {
      i++;
    } else {
      swapGnomes(i, i - 1, arr);
      i--;
    }
    if (restart) break;
    await sleep(TICK_RATE);
  }
  view.youveBeenGnomed();
}

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

  TICK_RATE = tickRate > 0 ? tickRate : TICK_RATE;
  MAX_STACK_HEIGHT = maxHeight > 0 ? maxHeight : MAX_STACK_HEIGHT;
  ARR_LENGTH = arrLen > 0 ? arrLen : ARR_LENGTH;
  gnomeRestart();
}
