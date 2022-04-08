import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const getFixturePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};

const readFixtureFile = (filepath) => {
  const fixPath = getFixturePath(filepath);
  const data = fs.readFileSync(fixPath, 'utf-8');
  return data;
};

// const fileExtensions = ['json', 'yaml'];
const fileExtensions = ['json']; // clfor refactor stylish.js, delete after

const formatTypes = ['stylish', 'json', 'plain'];

describe.each(formatTypes)('compare', (format) => {
  test.each(fileExtensions)(`${format} %p`, (extension) => {
    const file1 = getFixturePath(`file1.${extension}`);
    const file2 = getFixturePath(`file2.${extension}`);
    const expectedResult = readFixtureFile(`expected_${format}_result.txt`);

    const compare = genDiff(file1, file2, format);
    expect(compare).toBe(expectedResult);
  });
});
