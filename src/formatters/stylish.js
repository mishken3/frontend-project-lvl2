import _ from 'lodash';
import { KEY_TYPES } from '../constants.js';

const ADD_SING = '+';
const REMOVE_SING = '-';
const EMPTY_SPACE = ' ';

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const indents = EMPTY_SPACE.repeat((depth + 1) * 4);
  const stringifiedDataStrings = Object.entries(data)
    .map(([key, value]) => `${indents}${key}: ${stringify(value, depth + 1)}\n`)
    .join('');

  const bracketIndents = EMPTY_SPACE.repeat(depth * 4);

  return `{\n${stringifiedDataStrings}${bracketIndents}}`;
};

const getIndent = (depth) => EMPTY_SPACE.repeat(depth);

const iter = (tree, depth) =>
  tree.map((node) => {
    const { name, type, value, newValue, children } = node;
    const INDENT = getIndent(depth * 4 + 2);

    switch (type) {
      case KEY_TYPES.nested: {
        const nestedResult = `${INDENT}${EMPTY_SPACE.repeat(
          2,
        )}${name}: {\n${iter(children, depth + 1).join(
          '\n',
        )}\n${INDENT}${EMPTY_SPACE.repeat(2)}}`;

        return nestedResult;
      }
      case KEY_TYPES.added: {
        const addedValue = stringify(newValue, depth + 1);
        const addedResult = `${INDENT}${ADD_SING} ${name}: ${addedValue}`;

        return addedResult;
      }
      case KEY_TYPES.changed: {
        const oldValueString = `${INDENT}${REMOVE_SING} ${name}: ${stringify(
          value,
          depth + 1,
        )}`;
        const newValueString = `${INDENT}${ADD_SING} ${name}: ${stringify(
          newValue,
          depth + 1,
        )}`;

        return `${oldValueString}\n${newValueString}`;
      }
      case KEY_TYPES.removed: {
        const removedValue = stringify(value, depth + 1);
        return `${INDENT}${REMOVE_SING} ${name}: ${removedValue}`;
      }
      case KEY_TYPES.unchanged: {
        const unchangedValue = stringify(value, depth + 1);
        return `${INDENT}${EMPTY_SPACE.repeat(2)}${name}: ${unchangedValue}`;
      }

      default:
        throw new Error(`No such node type: ${type}`);
    }
  });

export const stylish = (diff) => {
  const resultStrings = iter(diff, 0).join('\n');

  return `{\n${resultStrings}\n}`;
};
