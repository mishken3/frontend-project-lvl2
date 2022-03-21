import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { parse } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const convertTXT = (filename) => fs.readFileSync(filename, 'utf-8');
const convertJSON = (file) => JSON.parse(file);
const convertYAML = (file) => parse(file);

const parser = (filepath) => {
  const fixPath = getFixturePath(filepath);
  const file = fs.readFileSync(fixPath, 'utf-8');

  console.log('file ->', file);
  const fileExtension = path.extname(fixPath).toLocaleLowerCase();
  console.log('fileExtension ->', fileExtension);

  switch (fileExtension) {
    case '.json':
      return convertJSON(file);
    case '.yaml':
      return convertYAML(file);
    case '.txt':
      return convertTXT(fixPath);
    default:
      throw new SyntaxError('Неверный формат передаваемых файлов');
  }
};

export default parser;
