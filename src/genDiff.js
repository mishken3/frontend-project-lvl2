import _ from 'lodash';
import { parser } from './parsers.js';

const genDiff = (unParsedobj1, unParsedobj2) => {
  const obj1 = parser(unParsedobj1);
  const obj2 = parser(unParsedobj2);

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
