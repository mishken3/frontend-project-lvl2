/* const separator = '    ';
const plus = '  + ';
const minus = '  - ';
const empty = '    ';

const getPrefix = (depth) => separator.repeat(depth);

const stringify = (lastElement, data, depth) => {
  if (typeof data !== 'object') return `${lastElement}${data}`;
  const prefix = getPrefix(depth + 1);
  const strings = Object.entries(data)
    .map(([key, value]) => `${prefix}${empty}${key}: ${value}`)
    .join('\n');
  const changedLastElement = `${lastElement}{`;
  return `${changedLastElement}\n${strings}\n${prefix}}`;
};

const mapper = {
  nested: ({ name, children }, depth, fn) =>
    `${getPrefix(depth)}${empty}${name}: {\n${fn(
      children,
      depth + 1,
    )}\n${getPrefix(depth)}${empty}}`,
  added: ({ name, newValue }, depth) =>
    stringify(`${getPrefix(depth)}${plus}${name}: `, newValue, depth),
  removed: ({ name, value }, depth) =>
    stringify(`${getPrefix(depth)}${minus}${name}: `, value, depth),
  changed: ({ name, value, oldValue }, depth) => {
    const prefixOld = `${getPrefix(depth)}${minus}${name}: `;
    const prefixNew = `${getPrefix(depth)}${plus}${name}: `;
    return `${stringify(prefixOld, oldValue, depth)}\n${stringify(
      prefixNew,
      value,
      depth,
    )}`;
  },
  unchanged: ({ name, value }, depth) =>
    `${getPrefix(depth)}${empty}${name}: ${value}`,
};

export const stylish = (ast) => {
  console.log('ast :>> ', JSON.stringify(ast, '', 2));

  const iter = (tree, depth) =>
    tree
      .map((node) => {
        console.log('node :>> ', node);
        return mapper[node.type](node, depth, iter);
      })
      .join('\n');

  return `{\n${iter(ast, 0)}\n}`;
};

 */

// =========

// export const stylish = (diff) => {
//   const iter = (node, depth) => {
//     if (node.type === KEY_TYPES.nested) {
//       return node.children
//         .map((child) => {
//           const prefix = getPrefix(depth);
//           const childString = `${prefix}${node.name}: {\n${iter(
//             child,
//             depth + 1,
//           )}\n${prefix}}`;

//           return childString;
//         })
//         .join('\n');
//     }

//     const { name, type, value } = node;

//     if (type === KEY_TYPES.added) {
//       const addedValue = stringify(node.newValue, REPLACER, depth);

//       return `${SPACE_BEFORE_DIFFERENCE_SIGN}${ADDED_SING} ${name}: ${addedValue}`;
//     }

//     if (type === KEY_TYPES.changed) {
//       const oldValue = stringify(value, REPLACER, depth);
//       const newValue = stringify(node.newValue, REPLACER, depth);

//       return `${SPACE_BEFORE_DIFFERENCE_SIGN}${REMOVED_SING} ${name}: ${oldValue}\n${SPACE_BEFORE_DIFFERENCE_SIGN}${ADDED_SING} ${name}: ${newValue}`;
//     }

//     if (type === KEY_TYPES.removed) {
//       const removedValue = stringify(value, REPLACER, depth);
//       return `${SPACE_BEFORE_DIFFERENCE_SIGN}${REMOVED_SING} ${name}: ${removedValue}`;
//     }

//     if (type === KEY_TYPES.unchanged) {
//       const unchangedValue = stringify(value, REPLACER, depth);
//       return `${SPACE_BEFORE_DIFFERENCE_SIGN}  ${name}: ${unchangedValue}`;
//     }

//     return stringify(node, REPLACER, depth);
//   };

//   const diffString = diff.map((node) => iter(node, 1)).join('\n');

//   return `{\n${diffString}\n}`;
// };

/*
// const ADDED_SING = '+ ';
// const REMOVED_SING = '- ';
// const EMPTY = '  ';

// const indent = (x) => '    '.repeat(x);

// const stringifyObject = (data, count, func) => {
//   if (!_.isObject(data)) {
//     return data;
//   }
//   const modified = Object.entries(data).map(([key, value]) =>
//     func(count + 1, key, value, '    '),
//   );
//   return ['{', ...modified, `${indent(count + 1)}}`].join('\n');
// };

// const stringifyValue = (depth, key, value, sign) =>
//   `${indent(depth)}${sign}${key}: ${stringifyObject(
//     value,
//     depth,
//     stringifyValue,
//   )}`;

// const typeActions = {
//   nested: (count, object, func) =>
//     stringifyValue(
//       count,
//       object.name,
//       func(object.children, count + 1),
//       '    ',
//     ),
//   changed: (count, object) => [
//     stringifyValue(count, object.name, object.value, '  - '),
//     stringifyValue(count, object.name, object.newValue, '  + '),
//   ],
//   removed: (count, object) =>
//     stringifyValue(count, object.name, object.value, '  - '),
//   added: (count, object) =>
//     stringifyValue(count, object.name, object.newValue, '  + '),
//   unchanged: (count, object) =>
//     stringifyValue(count, object.name, object.value, '    '),
// };

// const makeStylish = (diffs, depth) => {
//   const modified = diffs.flatMap((item) =>
//     typeActions[item.type](depth, item, makeStylish),
//   );
//   return ['{', ...modified, `${indent(depth)}}`].join('\n');
// };

// export const stylish = (difference) => makeStylish(difference, 0);

*/
