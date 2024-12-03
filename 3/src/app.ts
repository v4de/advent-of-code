import { createReadStream } from 'fs';
import { validateHeaderName } from 'http';
import { createInterface } from 'readline';

const readLines = createInterface({
  input: createReadStream('./src/day3.txt','utf-8'),
  terminal: false,
});
// Part Two:
// TODO: Match only between anchors: Do() = START Don't() = END
const instructionRe = new RegExp('mul\\([\\d]?[\\d]?[\\d]?,[\\d]?[\\d]?[\\d]?\\)','gm');
const mulRe = new RegExp('\\d+,\\d+');
let sum: number = 0;

// parse lines of stream asynchronously
const start = async () => {
  for await (const line of readLines) {

    // match mul(ddd,ddd)
    const matches = line.match(instructionRe);

    // try multiplying
    const products = matches?.map((instruction:string) => {

      // match ddd,ddd
      const csv = instruction.match(mulRe);

      // split, map, reduce, multiply
      let multiply: number = 0;
      if (csv){
        multiply = csv[0].split(',')
                          .map(Number)
                          .reduce((acc:number, v:number) => acc * v);
      };
      return multiply;
    });

    // add all multiplied products
    if (products) {
      sum += products?.reduce((acc:number, v:number) => acc + v);
    }
  }

  // async must return a value
  return sum;
}

start()
  .then((sum) => {
    console.log(`Sum: ${sum}`);
  })