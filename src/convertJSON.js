import * as fs from 'fs';
import { cwd } from 'process';
import path from 'path';

const convertJSON = (filepath) => {
  const fixPath = path.resolve(cwd(), filepath);
  const file = fs.readFileSync(fixPath, 'utf-8');
  const convertedFile = JSON.parse(file);
  return convertedFile;
};

export default convertJSON;
