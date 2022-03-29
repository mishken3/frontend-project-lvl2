import { extname } from 'path';
import * as fs from 'fs';
import parser from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import outputFormat from './formatters/index.js';

const getFileFormat = (filepath) => extname(filepath).toLocaleLowerCase().split('.')[1];

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const rawData1 = fs.readFileSync(filepath1, 'utf-8');
  const rawData2 = fs.readFileSync(filepath2, 'utf-8');
  const object1 = parser(rawData1, getFileFormat(filepath1));
  const object2 = parser(rawData2, getFileFormat(filepath2));

  const diffTree = buildDiffTree(object1, object2);
  const result = outputFormat(diffTree, format);

  return result;
};

export default genDiff;
