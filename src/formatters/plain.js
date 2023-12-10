import _ from 'lodash';
import { KEY_TYPES } from '../constants.js';
/*
Если новое значение свойства является составным, то пишется [complex value]
Если свойство вложенное, то отображается весь путь до корня, а не только с учетом родителя, например выше это: common.setting6.ops.
*/

// acc = array? ['common', 'follow'].join('.');
// acc = string? iter(node, (`${acc}.${node.name}`));

const isComplexValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const getResultString = (node, anchor) => {
  const { name, type, value, newValue, children } = node;
  const startingString = `Property '${[...anchor, name].join('.')}' was`;

  switch (type) {
    case KEY_TYPES.nested: {
      return children
        .flatMap((child) => getResultString(child, [...anchor, name]))
        .join('\n');
    }

    case KEY_TYPES.added: {
      return `${startingString} added with value: ${isComplexValue(newValue)}`;
    }

    case KEY_TYPES.removed: {
      return `${startingString} removed`;
    }

    case KEY_TYPES.changed: {
      return `${startingString} updated. From ${isComplexValue(
        value,
      )} to ${isComplexValue(newValue)}`;
    }

    case KEY_TYPES.unchanged: {
      return [];
    }

    default:
      throw new Error(`No such node type: ${type}`);
  }
};

export const plain = (diffAst) =>
  diffAst.flatMap((node) => getResultString(node, [])).join('\n');
