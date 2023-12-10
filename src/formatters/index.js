import { stylish } from './stylish.js';
import { plain } from './plain.js';

const FORMATTING_TYPES = {
  plain: 'plain',
  stylish: 'stylish',
};

const formatter = (diff, format) => {
  if (format === FORMATTING_TYPES.plain) {
    return plain(diff);
  }

  return stylish(diff);
};

export default formatter;
