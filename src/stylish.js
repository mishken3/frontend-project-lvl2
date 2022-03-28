import { isObject } from './genDiff.js';

const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth = 1) => {
    const indentSize = spacesCount * depth;
    const currentIndent = replacer.repeat(indentSize);
    const indentForSing = replacer.repeat(indentSize - 2);
    const bracketsIndent = replacer.repeat(indentSize - spacesCount);

    const genString = (indent, key, value, sign = '  ') => {
      if (isObject(value)) {
        const deepIndent = indent + '    ';
        const nestedObj = Object.entries(value)
          .map(([k, v]) => genString(`${deepIndent}`, k, v))
          .join('\n');
        return `${indent}${sign}${key}: {\n${nestedObj}\n${`${indent}  `}}`;
      }
      return `${indent}${sign}${key}: ${value}`;
    };

    const buildDiffString = (incomeObject) => {
      const { key, type } = incomeObject;
      switch (type) {
        case 'nested': {
          const { children } = incomeObject;
          return genString(currentIndent, key, iter(children, depth + 1), '');
        }
        case 'deleted': {
          const { value: deletedValue } = incomeObject;
          return genString(indentForSing, key, deletedValue, '- ');
        }
        case 'added': {
          const { value: addedValue } = incomeObject;
          return genString(indentForSing, key, addedValue, '+ ');
        }
        case 'changed': {
          const { value1: firstObjValue, value2: secondObjValue } =
            incomeObject;
          return [
            `${genString(indentForSing, key, firstObjValue, '- ')}`,
            `${genString(indentForSing, key, secondObjValue, '+ ')}`,
          ].join('\n');
        }
        case 'unchanged': {
          const { value: unchangedValue } = incomeObject;
          return genString(currentIndent, key, unchangedValue, '');
        }
        default:
          throw new Error('Wrong status income');
      }
    };
    const strings = currentValue.map(buildDiffString);

    return ['{', ...strings, `${bracketsIndent}}`].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;
