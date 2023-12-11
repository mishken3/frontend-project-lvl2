import _ from 'lodash';
import KEY_TYPES from '../constants.js';

const isComplexValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const getPlainDiffString = (node, anchor) => {
  const {
    name, type, value, newValue, children,
  } = node;
  const startingString = `Property '${[...anchor, name].join('.')}' was`;

  switch (type) {
    case KEY_TYPES.nested: {
      return children
        .flatMap((child) => getPlainDiffString(child, [...anchor, name]))
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

export default (diffAst) => {
  const plainDiffStrings = diffAst.flatMap((node) => getPlainDiffString(node, []));

  return plainDiffStrings.join('\n');
};
