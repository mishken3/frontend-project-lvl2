import { stylish } from './stylish.js';
import { plain } from './plain.js';
import { json } from './json.js';

const FORMATTING_TYPES = {
  plain: 'plain',
  stylish: 'stylish',
  json: 'json',
};

const formatter = (diff, format) => {
  if (format === FORMATTING_TYPES.plain) {
    return plain(diff);
  }

  if (format === FORMATTING_TYPES.json) {
    return json(diff);
  }

  return stylish(diff);
};

export default formatter;
