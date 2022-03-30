import _ from 'lodash';

const getValue = (rawValue) => {
  if (_.isPlainObject(rawValue)) return '[complex value]';
  if (typeof rawValue === 'string') return `'${rawValue}'`;
  return rawValue;
};

const plain = (tree) => {
  const iter = (property, ancestry = '') => {
    const { key, type } = property;
    const newAncestry = ancestry === '' ? key : `${ancestry}.${key}`;

    switch (type) {
      case 'nested': {
        const { children } = property;
        return children.map((child) => iter(child, newAncestry));
      }
      case 'deleted': {
        return `Property '${newAncestry}' was removed`;
      }
      case 'added': {
        const { value: addedValue } = property;
        return `Property '${newAncestry}' was added with value: ${getValue(
          addedValue,
        )}`;
      }
      case 'changed': {
        const { value1: firstObjValue, value2: secondObjValue } = property;
        return `Property '${newAncestry}' was updated. From ${getValue(
          firstObjValue,
        )} to ${getValue(secondObjValue)}`;
      }
      case 'unchanged': {
        return [];
        // unchanged value doesnt use
      }
      default:
        throw new Error('Wrong status income');
    }
  };

  // refact at the end
  const lines = tree
    .flatMap((child) => {
      const result = iter(child);
      if (Array.isArray(result)) return result.flat(Infinity);
      return result;
    })
    .join('\n');

  return lines;
};

export default plain;
