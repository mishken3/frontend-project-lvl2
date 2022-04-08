/* TODO
Нужно создать доп функцию считающую пробелы. Функция будет принимать глубину, и возвращать пробелы

genString - будет принимать глубину и значение

в switch case получится что ты используешь:
функция считающая пробелы + знак(или пробелы просто) + ключ + genString\

cosnt resultString =
  `${countSpaces(depth)}${sign}${key}: ${genString(value)}`
*/

/* UNUSED SPACES CONST
  const replacer = ' ';
  const spacesCount = 4;
    const indentSize = countSpaces(depth);
    const currentIndent = replacer.repeat(indentSize);
    const indentForSing = replacer.repeat(indentSize - 2);
    const bracketsIndent = replacer.repeat(indentSize - spacesCount);
*/

/*
QUESTIONS:
1. genString должен возвращать примитив?
  Или если мы идём глубже в value, то готовый полный вывод по каждому вложенному объекту?
*/
import _ from 'lodash';

const spaceCount = (depth) => {
  const spacesCount = 4;
  const replacer = ' ';

  return replacer.repeat(spacesCount * depth);
};

const genString = (value, depth) => {
  const spaces = spaceCount(depth);
  if (_.isPlainObject(value)) {
    const nestedObject = Object.entries(value);
    console.log('nestedObject ->', nestedObject);
  }
  return value;
};

const stylish = (tree) => {
  const iter = (currentValue, depth) => {
    const buildDiffString = (incomeObject) => {
      // indents
      const indentForSing = spaceCount(depth);

      const { key, type } = incomeObject;

      switch (type) {
        case 'nested': {
          const { children } = incomeObject;
          const resultString = `${spaceCount(depth)}${key}: ${iter(
            children,
            depth + 1
          )}`;

          return resultString;
        }

        case 'deleted': {
          const { value: deletedValue } = incomeObject;
          const resultString = `${indentForSing}- ${key}: ${genString(
            deletedValue,
            depth
          )}`;

          return resultString;
        }
        case 'added': {
          const { value: addedValue } = incomeObject;

          const resultString = `${indentForSing}+ ${key}: ${genString(
            addedValue,
            depth
          )}`;

          return resultString;
        }
        case 'changed': {
          const { value1: firstObjValue, value2: secondObjValue } =
            incomeObject;

          return [
            `${indentForSing}- ${key}: ${genString(firstObjValue, depth)}`,
            `${indentForSing}+ ${key}: ${genString(secondObjValue, depth)}`,
          ].join('\n');
        }
        case 'unchanged': {
          const { value: unchangedValue } = incomeObject;

          const resultString = `${spaceCount(depth)}${key}: ${genString(
            unchangedValue,
            depth
          )}`;

          return resultString;
        }
        default:
          throw new Error(`Status ${type} income.`);
      }
    };
    const strings = currentValue.map(buildDiffString);
    console.log('STRINGS ->', strings);
    return ['{', ...strings, '}'].join('\n');
  };

  const result = iter(tree, 1);
  console.info('RESULT STYLISH ->', result);
  return result;
};

export default stylish;
