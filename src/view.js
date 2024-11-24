import * as controller from "./controller.js";

export const GNOME_HEIGHT = getComputedStyle(
  document.documentElement
).getPropertyValue("--gnome-height");
export const GNOME_WIDTH = getComputedStyle(
  document.documentElement
).getPropertyValue("--gnome-width");

export function displayGnomes(gnomes) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  gnomes.forEach((gnome) => {
    const div = document.createElement("div");
    div.classList.add("gnome");
    div.style.height = `${gnome * GNOME_HEIGHT}px`;
    container.appendChild(div);
  });
}

export function displayIterations(iterations) {
  document
    .querySelectorAll(".iterations")
    .forEach((i) => (i.innerText = iterations));
}

export function highlightUnsortedRegion(index) {
  const gnomes = document.querySelectorAll(".gnome");
  gnomes.forEach((gnome, i) => {
    if (i < index) {
      gnome.classList.add("unsorted");
    } else {
      gnome.classList.remove("unsorted");
    }
  });
}

export function highlightCurrentGnome(index) {
  const gnomes = document.querySelectorAll(".gnome");
  gnomes.forEach((gnome, i) => {
    if (i === index) {
      gnome.classList.add("current");
    } else {
      gnome.classList.remove("current");
    }
  });
}

let previous;
export function highlightGnome(index) {
  const gnomes = document.querySelectorAll(".gnome");
  if (previous) {
    gnomes[previous].classList.remove("highlight");
  }
  gnomes[index].classList.add("highlight");
  previous = index;
}

let previous1;
export function highlightGnome1(index) {
  const gnomes = document.querySelectorAll(".gnome");
  if (previous1) {
    gnomes[previous1].classList.remove("highlight1");
  }
  gnomes[index].classList.add("highlight1");
  previous1 = index;
}

export function clearCurrentHighlights() {
  const gnomes = document.querySelectorAll(".gnome");
  gnomes.forEach((gnome) => {
      gnome.classList.remove("current", "highlight", "highlight1");
  });
}

export function clearAllHighlights() {
  const gnomes = document.querySelectorAll(".gnome");
  gnomes.forEach((gnome) => {
    gnome.classList.remove("current", "highlight", "highlight1", "unsorted");
  });
}

export function initEventListeners() {
  const form = document.querySelector("form");
  const restartButtons = document.querySelectorAll(".restart-button");
  form.addEventListener("submit", controller.submitForm);
  restartButtons.forEach((button) =>
    button.addEventListener("click", controller.gnomeRestart)
  );
}

export function initInputValues(tickrate, stackHeight, arrLength) {
  const from = document.querySelector("form");
  from.tick_rate.value = tickrate;
  from.stack_height.value = stackHeight;
  from.arr_length.value = arrLength;
}

export function hideOverlay() {
  document.querySelector(".gnomed").style.display = "none";
}

export function weveBeenSorted() {
  document.querySelector(".gnomed").style.display = "flex";
}

export function showAlgorithm(algorithm) {
  document
    .querySelectorAll(".algorithm")
    .forEach((d) => (d.innerText = algorithm));
}
