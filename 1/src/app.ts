import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const rl = createInterface({
  input: createReadStream('./src/day1.txt','utf-8'),
  terminal: false,
});

const list1: number[] = [];
const list2: number[] = [];
let distance = 0;

const start = async () => {
  for await (const line of rl) {
    const numbers = line.split('   ');
    list1.push(Number(numbers[0]));
    list2.push(Number(numbers[1]));
  }

  return 'success';
}

start().then(message => {
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  while (list1.length > 0) {
    const smallestList1 = list1.shift()
    const smallestList2 = list2.shift()

    if (smallestList1 && smallestList2) {
      distance += Math.abs(smallestList1 - smallestList2);
    }
    console.log(`distance: ${distance}`);
    console.log(`smallestList1: ${smallestList1}`);
    console.log(`smallestList2: ${smallestList2}`);
  }
});