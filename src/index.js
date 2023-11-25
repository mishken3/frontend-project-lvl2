import parser from './parser/parser.js';
import { compare } from './utils/compare.js';

// eslint-disable-next-line no-unused-vars
const genDiff = (filepath1, filepath2, config = {}) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);

  const result = compare(file1, file2);

  return result;
};

export default genDiff;
