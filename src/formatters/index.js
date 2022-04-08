import plain from './plain.js';
import stylish from './stylish2.js';

function outputFormat(tree, format) {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(
        `Wrong input format: '${format}' came.
        Supports only 'stylish', 'plain' and 'json' formats.`,
      );
  }
}

export default outputFormat;
