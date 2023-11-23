import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const parse = (filePath) => {
  const relativeFilePath = resolve(cwd(), filePath);
  const file = readFileSync(relativeFilePath);
  const json = JSON.parse(file);

  return json;
};

export default parse;
