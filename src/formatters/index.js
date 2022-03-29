import plain from './plain.js';
import stylish from './stylish.js';

function outputFormat(format, tree) {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error(`Wrong input formar. '${format} came'`);
  }
}

export default outputFormat;
