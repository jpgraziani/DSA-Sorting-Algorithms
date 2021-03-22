const LLClass = require('./LinkedList');
/* 1. Understanding merge sort
21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40
What is the resulting list that will be sorted after 3 recursive calls to mergesort?
1st   21, 1, 26, 45, 29, 28, 2, 9
2nd   21, 1, 26, 45      
3rd   21, 1 
4th   21
5th   1
6th   26, 45
7th   26
8th   45
9th   29, 28, 2, 9
10th  29, 28
11th  29
12th  28
13th  2, 9
14th  2
15th  9
1  [1 21]
2  [26 45]
3  [1 21 26 45]
4  [28 29]
5  [2 9]
6  [2 9 28 29]
7  [1 2 9 21 26 28 29 45]
What is the resulting list that will be sorted after 16 recursive calls to mergesort?
16th  16, 49, 39, 27, 43, 34, 46, 40
17th  16, 49, 39, 27
18th  16, 49
What are the first 2 lists to be merged?
[21], [1]
Which two lists would be merged on the 7th merge?
[1 2 9 21 26 28 29 45]
*/


/* 2. Understanding quicksort
3 9 1 14 17 24 22 20
1) Suppose you are debugging a quicksort implementation that is supposed to sort an array in ascending order. 
After the first partition step has been completed, the contents of the array is in the following order: 3 9 1 14 17 24 22 20. 
Which of the following statements is correct about the partition step? 
Explain your answer.
- The pivot could have been either 14 or 17, because it currently sorted all items: 
left = less than 14 and right = greater than 14. Also, it sorted all items for 17 as well.
left = less than 17 and right = greater than 17.
Same thing applies to 24 as above
2) Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
show the resulting list after the second partitioning according to the quicksort algorithm.
When using the last item on the list as a pivot (pivot = 12)
[10, 3, 9, 12, 14, 17, 13, 15, 19, 16]
[10, 3, 9] 12, [14, 17, 13, 15, 19, 16]
Answer: [[3] 9, [10]] 12, [[14, 13, 15] 16, [17, 19]]
When using the first item on the list as a pivot (pivot = 14)
[13, 10, 3, 9, 12, 14, 17, 15, 19, 16]
[13, 10, 3, 9, 12] 14, [17, 15, 19, 16]
Answer: [[10, 3, 9, 12] 13] 14, [[15, 16] 17, [19]]
*/

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
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


function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;

  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  return j;
};


// data
const data = [89, 30, 25, 32, 72, 70, 51, 42, 25,
  24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14,
  33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93,
  98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85,
  63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88,
  3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17,
  69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87,
  49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];



// 3. Implementing quicksort

function qSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }

  const middle = partition(array, start, end);
  array = qSort(array, start, middle);
  array = qSort(array, middle + 1, end);
  return array;
};

//console.log(qSort([...data]));



// 4. Implementing merge sort

function mSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mSort(left);
  right = mSort(right);
  return merge(left, right, array);
}

//console.log(mSort([...data]));



// 5. Sorting a linked list using merge sort


let LL = new LLClass.linkedList();

data.forEach(item => {
  LL.insertLast(item);
});

//console.log(LL);

function linkedMerger(left, right) {
  let currentLeft = left.head;
  let currentRight = right.head;
  let final = new LLClass.linkedList();

  while(currentLeft !== null && currentRight !== null) {

    if(currentLeft.value < currentRight.value) {
      final.insertLast(currentLeft.value);
      currentLeft = currentLeft.next;
    } else {
      final.insertLast(currentRight.value);
      currentRight = currentRight.next;
    }
  }

  while(currentLeft !== null) {
    final.insertLast(currentLeft.value);
    currentLeft = currentLeft.next;
  }

  while(currentRight !== null) {
    final.insertLast(currentRight.value);
    currentRight = currentRight.next;
  }

  return final;
}

function mergeLinked(ll) {
  let length = LLClass.size(ll);
  if(length === 1) {
    return ll;
  }

  let middle = LLClass.middle(ll);
  let leftLL = LLClass.copy(0, middle, ll);
  let rightLL = LLClass.copy(middle, length, ll);

  let left = mergeLinked(leftLL);
  let right = mergeLinked(rightLL);

  return linkedMerger(left, right);
}

let sorted = mergeLinked(LL);

let current = sorted.head;

while(current !== null) {
  //console.log(current.value);
  current = current.next;
}
// 6. Bucket sort

function bucketSort(arr, min, max) {
  let numOfArrays = max - min + 1;
  let listOfArrays = new Array(numOfArrays).fill('');

  for(let i = 0; i < arr.length; i++) {
    let currentValueArray = listOfArrays[arr[i]- min];
    if(!currentValueArray) {
      currentValueArray = [];
    }
    currentValueArray.push(arr[i]);
    listOfArrays[arr[i]-min] = currentValueArray;
  }

  let sortedArray = [];

  for(let i =0; i< listOfArrays.length; i++) {
    if(listOfArrays[i]) {
      listOfArrays[i].forEach(item => sortedArray.push(item));
    }
  }

  return sortedArray;
}


//console.log(bucketSort([1, 1, 1, 4, 2, 4, 3, 5], 1, 5));

// 7. Sort in place
function shuffle(arr) {
  for(let i=0; i<arr.length; i++) {
    let index = Math.floor(Math.random() * arr.length)
    
    let temp = arr[i];
    arr[i] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

let sortedTo = qSort([...data]);
//console.log(sortedTo);
//console.log(shuffle(sortedTo));


// 8. Sorting books
const library = ['A', 'BB', 'mom', 'D', 'Z', 'T', 'BAD', 'pop', 'P', 'Q', 'M', 'BA'];

function bookSorted(arr, start = 0, end = arr.length) {
  if(start >= end){
    return arr;
  }

  const middle = bookPartition(arr, start, end);
  arr = bookSorted(arr, start, middle);
  arr = bookSorted(arr, middle + 1, end);
  return arr;
}

function bookPartition(arr, start, end) {
  const pivot = arr[end -1];
  let j = start;

  for(let i=start; i<end -1; i++) {
    for(let k=0; k<arr[i].length; k++) {
      if(pivot[k]) {
        if(arr[i][k].toLowerCase() < pivot[k].toLowerCase()) {
          swap(arr, i, j);
          j++;
        }
      }
      
    }
    
  }

  swap(arr, end -1, j);
  return j;
}


console.log(bookSorted(library))
