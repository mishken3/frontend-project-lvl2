import * as fs from 'fs';
import { cwd } from 'process';

// all files JSON
const file1JSON = fs.readFileSync('__fixtures__/file1.json', 'utf-8');
const file2JSON = fs.readFileSync('__fixtures__/file2.json', 'utf-8');
console.log('file1JSON ->', file1JSON);

const convertJSON = (file) => JSON.parse(file);

const changeDetector = (first, second) => {
  const firstFile = convertJSON(first);
  const sescondFile = convertJSON(second);

  const entriesFirst = Object.entries(firstFile);
  const entriesSecond = Object.entries(sescondFile);
};

// INFO THINGS
// console.log(`Current directory: ${cwd()}`);
// console.log(`__dirname: ${__dirname}`);

// fs.readdir('./', function (_err, items) {
//   console.log('QWE ->', items);
// });

/*

import * as fs from 'fs';
import _ from 'lodash';

// all files JSON
const file1JSON = fs.readFileSync('file1.json', 'utf-8');
const file2JSON = fs.readFileSync('file2.json', 'utf-8');
console.log('file1JSON ->', file1JSON);

const convertJSON = (file) => JSON.parse(file);

const changeDetector = (first, second) => {
  const firstObject = convertJSON(first);
  const secondObject = convertJSON(second);

  const keys1 = Object.keys(firstObject);
  const keys2 = Object.keys(secondObject);
  console.log('keys1 ->', keys1);
  console.log('keys2 ->', keys2);

  const allKeys = [...keys1, ...keys2];
  const uniqSortedKeys = _.sortBy(_.uniq(allKeys));
  // console.log('uniqKeys ->', uniqSortedKeys);

  const result = uniqSortedKeys.map((child) => {
    
  })
};

const test = changeDetector(file1JSON, file2JSON);
console.log('test ->', test);

// hasOwnProperty

// const result = entriesFirst.map(([key1, value1]) => {
//   entriesSecond.map(([key2, value2]) => {
//     console.log('firstObject[key1] ->', firstObject[key1]);

//     if (key1 === key2) {
//       return value1 === value2 ? `${key1}: ${value1}` : `- ${key1}: ${value1}`;
//     } else {
//       return 'qwe';
//     }
//   });
// });




// `${key1}: ${value1~2}` -- ключ есть в обоих файлах, и его значения совпадают.

// `${key1}: ${value1~2}` -- ключ есть в обоих файлах, и его значения совпадают.

// `- ${key1~2}: ${value1-2}` -- значение по ключу либо отличается, либо ключ есть только в одном файле

*/
