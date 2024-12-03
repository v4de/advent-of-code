import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const list1: number[] = [];
const list2: number[] = [];
let distance = 0;
let similarity = 0;

const rl = createInterface({
  input: createReadStream('./src/day1.txt','utf-8'),
  terminal: false,
});

const start = async () => {
  for await (const line of rl) {
    const numbers = line.split('   ');
    list1.push(Number(numbers[0]));
    list2.push(Number(numbers[1]));
  }

  return 'success';
}

start().then(message => { // part two
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  while (list1.length > 0) {
    const smallestList1 = list1.shift()
    const smallestList2 = list2.shift()

    if (smallestList1 && smallestList2) {
      distance += Math.abs(smallestList1 - smallestList2);
    }
    console.log(`smallestList1: ${smallestList1}`);
    console.log(`smallestList2: ${smallestList2}`);
    console.log(`distance: ${distance}\n`);
  }
}).then(message => { // part two

  const unique = list1.filter((v, i, self) => {
    return self.indexOf(v) === i;
  });

  unique.forEach(item1 => {
    let count = 0;
    let index = 0;
    while (index >= 0) {
      index = list2.indexOf(item1);
      if ( index < 0 ){
        console.log('No similar numbers found');
      } else {
        list2.splice(index, 1);
        count += 1
      }
    }
    if (count > 0) {
      similarity += (item1 * count)
    } else {
      console.log(`No numbers like ${item1} on the second list`);
    }
  });
});