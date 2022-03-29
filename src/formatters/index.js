import plain from './plain.js';
import stylish from './stylish.js';

function outputFormat(tree, format) {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error(
        `Wrong input format: '${format}' came, but supports only 'stylish' and 'plain' formats.`,
      );
  }
}

export default outputFormat;
