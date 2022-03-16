import * as fs from 'fs';
import genDiff from '../src/changeDetector.js';

const file1JSON = fs.readFileSync('__fixtures__/file1.json', 'utf-8');
const file2JSON = fs.readFileSync('__fixtures__/file2.json', 'utf-8');
const convertJSON = (file) => JSON.parse(file);

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('basic work', () => {
  expect(genDiff(convertJSON(file1JSON), convertJSON(file2JSON))).toBe(result);
});
