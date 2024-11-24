/**
 * Swaps the elements at the specified indices in the given array.
 *
 * @param {number} i - The index of the first element to swap.
 * @param {number} j - The index of the second element to swap.
 * @param {Array} arr - The array in which the elements will be swapped.
 */
export function swapGnomes(i, j, arr) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

/**
 * Animates the flipping of a section of an array of elements within a container.
 * 
 * @param {Array} arr - The array of elements to be flipped.
 * @param {number} start - The starting index of the section to be flipped.
 * @param {number} end - The ending index of the section to be flipped.
 * @returns {Promise<void>} A promise that resolves when the animation is complete.
 */
export async function animateFlip(arr, start, end) {
  const container = document.querySelector('.container');
  const elements = Array.from(container.children).slice(start, end + 1);
  const startX = elements[0].offsetLeft;
  const width = (end - start + 1) * 48;
  const maxHeight = Math.max(...elements.map(el => el.offsetHeight));
  
  const flipSection = document.createElement('div');
  flipSection.className = 'flip-section';
  flipSection.style.position = 'absolute';
  flipSection.style.left = `${startX}px`;
  flipSection.style.width = `${width}px`;
  flipSection.style.height = `${maxHeight}px`;
  
  const frontSide = document.createElement('div');
  const backSide = document.createElement('div');
  elements.forEach(element => {
    const clone = element.cloneNode(true);
    frontSide.appendChild(clone);
    backSide.insertBefore(clone.cloneNode(true), backSide.firstChild);
  });
  
  flipSection.appendChild(frontSide);
  flipSection.appendChild(backSide);
  elements.forEach(el => el.style.visibility = 'hidden');
  
  const flipWrapper = document.createElement('div');
  flipWrapper.className = 'flip-wrapper';
  flipWrapper.appendChild(flipSection);
  container.appendChild(flipWrapper);
  
  void flipSection.offsetHeight;
  
  // Perform the flip by swapping the elements in the array from the start to the end
  for (let left = start, right = end; left < right; left++, right--) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
  }
  
  flipSection.classList.add('flipping');
  await new Promise(resolve => setTimeout(resolve, 500));
  
  elements.forEach(el => el.style.visibility = 'visible');
  flipWrapper.remove();
}
