import { stylish } from './stylish.js';

const formatter = (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  }

  return stylish(diff);
};

export default formatter;
