import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { parse as YAMLParse } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixtureFile = (filepath) => {
  const fixPath = getFixturePath(filepath);
  const file = fs.readFileSync(fixPath, 'utf-8');
  return file;
};

const getFileExtension = (file) => path.extname(file).toLocaleLowerCase();

const convertJSON = (file) => JSON.parse(file);
const convertYAML = (file) => YAMLParse(file);

const parser = (filepath) => {
  const fileExtension = getFileExtension(filepath);
  const file = readFixtureFile(filepath);

  switch (fileExtension) {
    case '.json':
      return convertJSON(file);
    case '.yaml':
    case '.yml':
      return convertYAML(file);
    case '.txt':
      return readFixtureFile(filepath);
    default:
      throw new SyntaxError('Неверный формат передаваемых файлов');
  }
};

export { parser, readFixtureFile };
