import { extname } from 'path';
import * as fs from 'fs';
import parser from './parsers.js';
import stylish from './stylish.js';
import buildDiffTree from './buildDiffTree.js';

const getFileFormat = (filepath) =>
  extname(filepath).toLocaleLowerCase().split('.')[1];

function genDiff(filepath1, filepath2, format = 'stylish') {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const obj1 = parser(data1, getFileFormat(filepath1));
  const obj2 = parser(data2, getFileFormat(filepath2));

  const diffTree = buildDiffTree(obj1, obj2);

  switch (format) {
    case 'stylish':
      return stylish(diffTree);
    default:
      throw new Error(`Wrong stylish format. Came: ${format}`);
  }
}

export default genDiff;
