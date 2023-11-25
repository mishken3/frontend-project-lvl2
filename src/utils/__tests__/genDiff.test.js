import { expect, test } from '@jest/globals';
import genDiff from '../../index.js';

const filepath1JSON = './fixtures/file1.json';
const filepath2JSON = './fixtures/file2.json';

const filepath1YAML = './fixtures/file1.yaml';
const filepath2YAML = './fixtures/file2.yaml';

const resultString = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
}`;

test('comparing two files by filepaths: json', () => {
  expect(genDiff(filepath1JSON, filepath2JSON)).toBe(resultString);
});

test('comparing two files by filepaths: yaml', () => {
  expect(genDiff(filepath1YAML, filepath2YAML)).toBe(resultString);
});
