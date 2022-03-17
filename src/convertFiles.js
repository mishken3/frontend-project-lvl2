import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const convertTXT = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const convertJSON = (filepath) => {
  const fixPath = getFixturePath(filepath);
  const file = fs.readFileSync(fixPath, 'utf-8');
  const convertedFile = JSON.parse(file);
  return convertedFile;
};

export { convertJSON, convertTXT };
