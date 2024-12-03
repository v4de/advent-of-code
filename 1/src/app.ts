import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const list1: number[] = [];
const list2: number[] = [];
let distance = 0;
let similarity = 0;

// create stream to read bytes line by line
const rl = createInterface({
  input: createReadStream('./src/day1.txt','utf-8'),
  terminal: false,
});

// parse lines of stream asynchronously
const start = async () => {
  for await (const line of rl) {
    const numbers = line.split('   ');
    list1.push(Number(numbers[0]));
    list2.push(Number(numbers[1]));
  }

  // sort number lists ascending
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  return 'success'; // promise must return something
}

start() // part one
  .then(message => {

    // # of elements are identical, loop through one array and find difference of the same index
    for (let index = 0; index < list1.length; index++) {
      const smallestList1 = list1[index];
      const smallestList2 = list2[index];
      distance += Math.abs(smallestList1 - smallestList2);
      // console.log(`Debug: Distance: ${distance}`)
    }
    console.log(`Distance: ${distance}\n`);
    return message; // promise must return something
}) // part two
  .then(message => {

    // filter out duplicate elements in first list
  const unique = list1.filter((v, i, self) => {
    return self.indexOf(v) === i;
  });

  // for each unique, remove similar items and count, then multiply and add
  unique.forEach(item1 => {
    let count = 0;
    let index = 0;
    while (index >= 0) {
      index = list2.indexOf(item1);
      if ( index < 0 ){
        // console.log('Debug: No similar numbers found');
      } else {
        list2.splice(index, 1);
        count += 1;
      }
    }
    if (count > 0) {
      similarity += (item1 * count);
      // console.log(`Debug: Similarity: ${similarity}`);
    } else {
      // console.log(`Debug: No numbers like ${item1} on the second list`);
    }
  });
  console.log(`Similarity: ${similarity}\n`);
  return message; // promise must return something
})
  .catch((error) => {
    console.error("Error: ", error);
  });