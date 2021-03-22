//============================================================
// BUBBLE SORT
//============================================================

function bubbleSort(arr) {
  // implement bubblesort
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < (arr.length - i - 1); j++) {
      if (arr[j] > arr[j + 1]) {
        const lesser = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = lesser;
      }
    }
  }

  // return sorted arra
  return arr;
}

const nums = [1, 24, 99, 78, 83, 0, 65, 23, 72]

// console.log(bubbleSort(nums))

// function reverseBubble(arr) {
//   for (i = 0; i < arr.length; i++) {
//     for (let j = 0; j < (arr.length - i - 1); j++) {
//       if ()
//     }
//   }
// }
/*
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function bubbleSortTwo(array) {
  let swap = 0;

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1);
      swaps++
    }
  }

  if (swaps > 0) {
    return bubbleSortTwo(array);
  }
  return array;
}

console(bubbleSortTwo(nums));
*/


//============================================================
// MERGE SORT
//============================================================

function mergeSort(array) {
  if (array.length <= 1) {
      return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);
  console.log(left, right)
  return merge(left, right, array);
 
};

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
          array[outputIndex++] = left[leftIndex++];
      }
      else {
          array[outputIndex++] = right[rightIndex++];
      }
  }

  for (let i = leftIndex; i < left.length; i++) {
      array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
      array[outputIndex++] = right[i];
  }
  return array;
};

console.log(mergeSort([9,7,2,1,4]))


//============================================================
// QUICK SORT
//============================================================

function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
      return array;
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
};

function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
      if (array[i] <= pivot) {
          swap(array, i, j);
          j++;
      }
  }
  swap(array, end-1, j);
  return j;
};