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

export function initEventListeners() {
  const form = document.querySelector("form");
  const restartButtons = document.querySelectorAll(".restart-button");
  form.addEventListener("submit", controller.submitForm);
  restartButtons.forEach((button) =>
    button.addEventListener("click", controller.gnomeRestart)
  );
}

export function hideOverlay() {
  document.querySelector(".gnomed").style.display = "none";
}

export function weveBeenSorted() {
  document.querySelector(".gnomed").style.display = "flex";
}
