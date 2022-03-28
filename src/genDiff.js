import _ from 'lodash';
import { extname } from 'path';
import * as fs from 'fs';
import parser from './parsers.js';
import stylish from './stylish.js';

const getFileFormat = (filepath) => extname(filepath).toLocaleLowerCase().split('.')[1];

const isObject = (val) => val instanceof Object && !Array.isArray(val) && val !== null;

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  const checkDiff = (key) => {
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return {
        type: 'nested',
        key,
        children: buildDiffTree(obj1[key], obj2[key]),
      };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      // deleted
      return {
        type: 'deleted',
        key,
        value: obj1[key],
        // `  - ${key}: ${obj1[key]}`;
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      // added
      return {
        type: 'added',
        key,
        value: obj2[key],
        // `  + ${key}: ${obj2[key]}`;
      };
    }
    if (obj1[key] !== obj2[key]) {
      // changed
      return {
        type: 'changed',
        key,
        value1: obj1[key],
        value2: obj2[key],
        // `  - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}`;
      };
    }
    if (obj1[key] === obj2[key]) {
      // unchanged
      return {
        type: 'unchanged',
        key,
        value: obj1[key],
        // `    ${key}: ${obj1[key]}`;
      };
    }

    return null;
  };

  return sortedKeys.map(checkDiff);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const obj1 = parser(data1, getFileFormat(filepath1));
  const obj2 = parser(data2, getFileFormat(filepath2));

  const diffTree = buildDiffTree(obj1, obj2);
  const result = stylish(diffTree);

  return result;
};

export default genDiff;
