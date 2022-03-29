import { extname } from 'path';
import * as fs from 'fs';
import parser from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import outputFormat from './formatters/index.js';

const getFileFormat = (filepath) => extname(filepath).toLocaleLowerCase().split('.')[1];

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const obj1 = parser(data1, getFileFormat(filepath1));
  const obj2 = parser(data2, getFileFormat(filepath2));

  const diffTree = buildDiffTree(obj1, obj2);

  const result = outputFormat(format, diffTree);

  return result;
};

export default genDiff;
