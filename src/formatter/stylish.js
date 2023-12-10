import { KEY_TYPES } from '../constants.js';
import { stringify } from '../utils/stringify.js';

const ADDED_SING = '+ ';
const REMOVED_SING = '- ';
const EMPTY = '    ';

// WIP

const getPrefix = (depth) => EMPTY.repeat(depth);

const iter = (tree, depth) =>
  tree.map((node) => {
    const { name, type, value, newValue, children } = node;
    const prefix = getPrefix(depth);

    if (type === KEY_TYPES.added) {
      const addedValue = stringify(newValue, prefix, depth);
      const addedResult = `${prefix}${ADDED_SING}${name}: ${addedValue}`;

      return addedResult;
    }

    if (type === KEY_TYPES.changed) {
      const oldValueString = `${prefix}${REMOVED_SING}${name}: ${stringify(
        value,
        prefix,
        depth,
      )}`;
      const newValueString = `${prefix}${ADDED_SING}${name}: ${stringify(
        newValue,
        prefix,
        depth,
      )}`;

      return `${oldValueString}\n${newValueString}`;
    }

    if (type === KEY_TYPES.removed) {
      const removedValue = stringify(value, prefix, depth);
      return `${prefix}${REMOVED_SING}${name}: ${removedValue}`;
    }

    if (type === KEY_TYPES.unchanged) {
      const unchangedValue = stringify(value, prefix, depth);
      return `${prefix}${EMPTY}${name}: ${unchangedValue}`;
    }

    const nestedResult = `${prefix}${EMPTY}${name}: {\n${iter(
      children,
      depth + 1,
    ).join('\n')}\n${prefix}}`;

    return nestedResult;
  });

export const stylish = (diff) => {
  const result = iter(diff, 1).join('\n');

  return `{\n${result}\n}`;
};
