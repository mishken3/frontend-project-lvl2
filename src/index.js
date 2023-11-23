import parse from './utils/parse.js';
import uniq from 'lodash/uniq.js';
import { compare } from './utils/compare.js';

const genDiff = (filepath1, filepath2, config = {}) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const keys = [...uniq([...Object.keys(file1), ...Object.keys(file2)])].sort();

  const result = compare(keys, file1, file2);

  return result;
};

export default genDiff;
