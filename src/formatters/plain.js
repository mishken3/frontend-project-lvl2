import _ from 'lodash';

const getValue = (val) => {
  if (_.isPlainObject(val)) return '[complex value]';
  if (typeof val === 'string') return `'${val}'`;
  return val;
};

const plain = (tree) => {
  const iter = (property, ancestry = '') => {
    const { key, type } = property;

    const newAncestry = ancestry === '' ? key : `${ancestry}.${key}`;

    switch (type) {
      case 'nested': {
        const { children } = property;
        const result = children.map((child) => iter(child, newAncestry));
        return result;
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
