import { createReadStream } from 'fs';
import { validateHeaderName } from 'http';
import { createInterface } from 'readline';

const readLines = createInterface({
  input: createReadStream('./src/day3.txt','utf-8'),
  terminal: false,
});

const instructionRe = new RegExp('mul\\([\\d]?[\\d]?[\\d]?,[\\d]?[\\d]?[\\d]?\\)','gm');
const mulRe = new RegExp('\\d+,\\d+');
let sum: number | undefined = 0;

// parse lines of stream asynchronously
const start = async () => {
  for await (const line of readLines) {
    const matches = line.match(instructionRe);
    const products = matches?.map(instruction => {
      const csv = instruction.match(mulRe);
      let multiply: number = 0;
      if (csv){
        multiply = csv[0].split(',')
                          .map(Number)
                          .reduce((acc:number, v:number) => acc * v);
      };
      return multiply;
    });
    sum = products?.reduce((sum, current) => sum + current);
  }

  // async must return a value
  return sum;
}

start()
  .then((sum) => {
    console.log(`Sum: ${sum}`);
  })