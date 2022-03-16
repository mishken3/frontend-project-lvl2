import changeDetector from '../src/changeDetector.js';
import * as fs from 'fs';

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
  expect(changeDetector(convertJSON(file1JSON), convertJSON(file2JSON))).toBe(
    result
  );
});
