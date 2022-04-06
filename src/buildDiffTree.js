import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  const checkDiff = (key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        type: 'nested',
        key,
        children: buildDiffTree(obj1[key], obj2[key]),
      };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        type: 'deleted',
        key,
        value: obj1[key],
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        type: 'added',
        key,
        value: obj2[key],
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        type: 'changed',
        key,
        value1: obj1[key],
        value2: obj2[key],
      };
    }
    if (obj1[key] === obj2[key]) {
      return {
        type: 'unchanged',
        key,
        value: obj1[key],
      };
    }

    return null;
  };

  return sortedKeys.map(checkDiff);
};

export default buildDiffTree;
