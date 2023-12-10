import _ from 'lodash';
import { KEY_TYPES } from '../constants.js';

const compare = (mainObject, secondObject) => {
  const keys = _.union(
    Object.keys(mainObject),
    Object.keys(secondObject),
  ).sort();

  const diffAst = keys.map((key) => {
    const mainValue = mainObject[key];
    const secondValue = secondObject[key];

    if (_.isPlainObject(mainValue) && _.isPlainObject(secondValue)) {
      return {
        name: key,
        type: KEY_TYPES.nested,
        children: compare(mainValue, secondValue),
      };
    }

    if (_.isEqual(mainValue, secondValue)) {
      return {
        name: key,
        type: KEY_TYPES.unchanged,
        value: mainValue,
      };
    }

    if (!_.has(mainObject, key)) {
      return {
        name: key,
        type: KEY_TYPES.added,
        newValue: secondValue,
      };
    }

    if (!_.has(secondObject, key)) {
      return {
        name: key,
        type: KEY_TYPES.removed,
        value: mainValue,
      };
    }

    return {
      name: key,
      type: KEY_TYPES.changed,
      value: mainValue,
      newValue: secondValue,
    };
  });

  return diffAst;
};

export { compare };
