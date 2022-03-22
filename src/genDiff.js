import _ from 'lodash';
import path from 'path';
import * as fs from 'fs';
import parser from './parsers.js';

const getFileFormat = (filepath) => path.extname(filepath).toLocaleLowerCase().split('.')[1];

const genDiff = (filepath1, filepath2) => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');

  const obj1 = parser(data1, getFileFormat(filepath1));
  const obj2 = parser(data2, getFileFormat(filepath2));

  const uniqSortedKeys = _.sortBy(
    _.union(Object.keys(obj1), Object.keys(obj2)),
  );

  const checkDiff = (key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (obj1[key] !== obj2[key]) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    if (obj1[key] === obj2[key]) {
      return `    ${key}: ${obj1[key]}`;
    }

    return 'Alternative return for eslint';
  };

  const result = uniqSortedKeys.map(checkDiff).join('\n');
  return `{\n${result}\n}`;
};

export default genDiff;
