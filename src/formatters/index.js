import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

function outputFormat(tree, format) {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(
        `Wrong input format: '${format}' came. \nBut supports only 'stylish', 'plain' and 'json' formats.`,
      );
  }
}

export default outputFormat;
