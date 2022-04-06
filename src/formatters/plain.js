import _ from 'lodash';

const stringify = (rawValue) => {
  if (_.isPlainObject(rawValue)) return '[complex value]';
  if (typeof rawValue === 'string') return `'${rawValue}'`;
  return rawValue;
};

const plain = (tree) => {
  const iter = (node, ancestry = '') => {
    const { key, type } = node;
    const newAncestry = ancestry === '' ? key : `${ancestry}.${key}`;

    switch (type) {
      case 'nested': {
        const { children } = node;
        return children.flatMap((child) => iter(child, newAncestry));
      }
      case 'deleted': {
        return `Property '${newAncestry}' was removed`;
      }
      case 'added': {
        const { value: addedValue } = node;
        return `Property '${newAncestry}' was added with value: ${stringify(
          addedValue,
        )}`;
      }
      case 'changed': {
        const { value1: firstObjValue, value2: secondObjValue } = node;
        return `Property '${newAncestry}' was updated. From ${stringify(
          firstObjValue,
        )} to ${stringify(secondObjValue)}`;
      }
      case 'unchanged': {
        return [];
      }
      default:
        throw new Error(`Wrong status income. ${type} came.`);
    }
  };
  const lines = tree.flatMap((child) => iter(child)).join('\n');

  return lines;
};

export default plain;
