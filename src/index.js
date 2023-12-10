import parser from './parser/parser.js';
import { compare } from './utils/compare.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);

  const result = compare(file1, file2);
  const formattedResult = formatter(result, formatName);

  return formattedResult;
};

export default genDiff;
