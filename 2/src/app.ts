import { createReadStream } from 'fs';
import { createInterface } from 'readline';

let totalSafe: number = 0;

const readLines = createInterface({
  input: createReadStream('./src/day2.txt','utf-8'),
  terminal: false,
});

const check = (numbers:number[]) => {
  // setup flags
  let ascending: boolean | undefined = undefined;
  let descending: boolean | undefined = undefined;
  let problemDampener: boolean | undefined = undefined;
  let safe: boolean = true;

  // loop through reports
  for (const [k, v] of numbers.entries()) {

    // do nothing if next number is undefined
    if(k + 1 < numbers.length) {

      // check if difference is less than 4 and more than 0
      const difference = Math.abs(Number(v) - Number(numbers[k + 1]));
      if (difference < 4 && difference > 0) {

        // is it descending?
        if (v > numbers[k + 1] && ascending === undefined && descending === undefined) {
          descending = true;
        }

        // is it ascending?
        if (v < numbers[k + 1] && ascending === undefined && descending === undefined) {
          ascending = true;
        }

        // no longer descending
        if (v < numbers[k + 1] && descending) {
          console.log(`not descending`);
          if (checkRemove(k, (k + 1), numbers) && problemDampener === undefined) {
            problemDampener = true;
          } else {
            safe = false;
            break;
          }
        }

        // no longer ascending
        if (v > numbers[k + 1] && ascending) {
          console.log(`not ascending`);
          if (checkRemove(k, (k + 1), numbers) && problemDampener === undefined) {
            problemDampener = true;
          } else {
            safe = false;
            break;
          }
        }
      } else {
        console.log(`difference larger than 3: ${difference}`);
        if (checkRemove(k, (k + 1), numbers) && problemDampener === undefined) {
          problemDampener = true;
        } else {
          safe = false;
          break;
        }
      }
    }
  }
  // async must return a value
  return safe;
}

// checkRemove(k,k+1,numbers)
const checkRemove = (curr:number, next:number, report:number[]) => {
  if (check(report.splice(curr,1))) {
    return 1;
  } else if (check(report.splice(next,1))) {
    return 1;
  } else {
    return 0;
  }
}

// parse lines of stream asynchronously
const start = async () => {
  for await (const line of readLines) {

    // separate each number in a report and cast to Number
    const numbers = line.split(' ').map(number => Number(number));

    if (check(numbers)) {
      totalSafe += 1;
    }
  }

  // async must return a value
  return totalSafe;
}

start()
  .then((totalSafe) => {
    console.log(`Safe reports: ${totalSafe}`);
  })