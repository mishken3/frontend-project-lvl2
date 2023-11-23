import { DEFAULT_TAB_SPACE } from '../constants.js';

export const compareValue = (key, firstObject, secondObject) => {
  const mainValue = firstObject[key];
  const otherValue = secondObject[key];

  // Есть во втором НО не в первом
  if (!(key in firstObject)) {
    return `- ${key}: ${otherValue}`;
  }
  // Есть в обоих И одинаковое
  if (mainValue === otherValue) {
    return `  ${key}: ${mainValue}`;
  }
  // Есть в обоих И НЕ одинаковое
  if (otherValue && mainValue !== otherValue) {
    const currentData = `- ${key}: ${mainValue}`;
    const newData = `+ ${key}: ${otherValue}`;
    return `${currentData}\n${DEFAULT_TAB_SPACE}${newData}`;
  }
  // Есть в первом НО не во втором
  if (key in firstObject && !(key in secondObject)) {
    return `- ${key}: ${mainValue}`;
  }
};

/**
 * Есть в обоих И одинаковое
 * Есть в обоих И НЕ одинаковое
 *
 * Есть в первом НО не во втором
 * Есть во втором НО не в первом
 */

export const compare = (keys, firstObject, secondObject) => {
  const diffStrings = keys.map((key) => {
    const diffValueString = compareValue(key, firstObject, secondObject);

    return `${DEFAULT_TAB_SPACE}${diffValueString}`;
  });

  const result = `{\n${diffStrings.join('\n')}\n}`;

  return result;
};
