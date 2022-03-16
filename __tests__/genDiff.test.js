import genDiff from '../src/genDiff.js';
import convertJSON from '../src/convertJSON.js';

const firstFile = convertJSON('__fixtures__/file1.json');
const secondFile = convertJSON('__fixtures__/file2.json');

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('basic work', () => {
  expect(genDiff(firstFile, secondFile)).toBe(result);
});
