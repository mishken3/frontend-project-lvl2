import _ from 'lodash';

const tagSize = 4;
const indent = (depth, spacesCount = 2) => ' '.repeat(depth * tagSize - spacesCount);

const stringify = (value, depth) => {
  if (_.isPlainObject(value)) {
    const data = Object.entries(value).map(([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);
    return ['{', ...data, `${indent(depth, 0)}}`].join('\n');
  }
  return value;
};

const stylish = (tree) => {
  const iter = (currentValue, depth = 1) => {
    const buildDiffString = (node) => {
      const { key, type } = node;
      switch (type) {
        case 'nested': {
          const { children } = node;
          return `${indent(depth)}  ${key}: ${iter(children, depth + 1)}`;
        }
        case 'deleted': {
          return `${indent(depth)}- ${key}: ${stringify(node.value, depth)}`;
        }
        case 'added': {
          return `${indent(depth)}+ ${key}: ${stringify(node.value, depth)}`;
        }
        case 'changed': {
          return [
            `${indent(depth)}- ${key}: ${stringify(node.value1, depth)}`,
            `${indent(depth)}+ ${key}: ${stringify(node.value2, depth)}`,
          ].join('\n');
        }
        case 'unchanged': {
          return `${indent(depth)}  ${key}: ${stringify(node.value, depth)}`;
        }
        default:
          throw new Error(`Unknown node type -- ${type}`);
      }
    };
    const strings = currentValue.map(buildDiffString);
    return ['{', ...strings, `${indent(depth, tagSize)}}`].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;
