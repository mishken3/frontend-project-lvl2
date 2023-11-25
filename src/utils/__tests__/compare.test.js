import { compare } from '../compare.js';

const firstObj = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const secondObj = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const resultString = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
}`;

test('should compare flat objects', () => {
  expect(compare(firstObj, secondObj)).toBe(resultString);
});
