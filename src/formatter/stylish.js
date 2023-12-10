import _ from 'lodash';
import { KEY_TYPES } from '../constants.js';

const ADDED_SING = '+ ';
const REMOVED_SING = '- ';
const EMPTY = ' ';

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indents = EMPTY.repeat((depth + 1) * 4);
  const result = Object.keys(value)
    .map((key) => `${indents}${key}: ${stringify(value[key], depth + 1)}\n`)
    .join('');

  const bracketIndents = EMPTY.repeat(depth * 4);

  return `{\n${result}${bracketIndents}}`;
};

const getPrefix = (depth) => EMPTY.repeat(depth);

const iter = (tree, depth) =>
  tree.map((node) => {
    const { name, type, value, newValue, children } = node;
    const prefix = getPrefix(depth * 4 + 2);

    if (type === KEY_TYPES.added) {
      const addedValue = stringify(newValue, depth + 1);
      const addedResult = `${prefix}${ADDED_SING}${name}: ${addedValue}`;

      return addedResult;
    }

    if (type === KEY_TYPES.changed) {
      const oldValueString = `${prefix}${REMOVED_SING}${name}: ${stringify(
        value,
        depth + 1,
      )}`;
      const newValueString = `${prefix}${ADDED_SING}${name}: ${stringify(
        newValue,
        depth + 1,
      )}`;

      return `${oldValueString}\n${newValueString}`;
    }

    if (type === KEY_TYPES.removed) {
      const removedValue = stringify(value, depth + 1);
      return `${prefix}${REMOVED_SING}${name}: ${removedValue}`;
    }

    if (type === KEY_TYPES.unchanged) {
      const unchangedValue = stringify(value, depth + 1);
      return `${prefix}${EMPTY.repeat(2)}${name}: ${unchangedValue}`;
    }

    const nestedResult = `${prefix}${EMPTY.repeat(2)}${name}: {\n${iter(
      children,
      depth + 1,
    ).join('\n')}\n${prefix}${EMPTY.repeat(2)}}`;

    return nestedResult;
  });

export const stylish = (diff) => {
  const result = iter(diff, 0).join('\n');

  return `{\n${result}\n}`;
};
