import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import { readFileSync } from 'node:fs';

import { parseJSON } from './json.js';
import { parseYAML } from './yaml.js';

const isYamlExtension = (extension) => {
  if (extension === 'yml' || extension === 'yaml') {
    return true;
  }

  return false;
};

const parser = (filePath) => {
  const relativeFilePath = resolve(cwd(), filePath);
  const file = readFileSync(relativeFilePath);
  const [, fileExtension] = extname(filePath).split('.');

  if (isYamlExtension(fileExtension)) {
    return parseYAML(file);
  }

  return parseJSON(file);
};

export default parser;
