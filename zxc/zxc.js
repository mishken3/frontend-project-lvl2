import * as fs from 'fs';
import genDiff from '../src/genDiff.js';

const readFile = (file) => fs.readFileSync(file, 'utf-8');
/*

const filepath1 = '../__fixtures__/file1.json';
const filepath2 = '../__fixtures__/file2.json';

*/
// const expectedResultPath = '__fixtures__/expected_result.txt';
// const expectedResult = readFile(expectedResultPath);
// console.log(expectedResult);

const testObj = {
  a: 'bb',
  c: {
    d: 'e',
    arr: [11, 22],
  },
};

const eslintJSONPath = './eslintJSON.json';
console.log(JSON.parse(readFile(eslintJSONPath)));
