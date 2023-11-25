import { expect, test } from '@jest/globals';
import genDiff from '../../index.js';

const filepath1 = './fixtures/file1.json';
const filepath2 = './fixtures/file2.json';

const resultString = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
}`;

test('comparing two files by filepaths', () => {
  expect(genDiff(filepath1, filepath2)).toBe(resultString);
});
