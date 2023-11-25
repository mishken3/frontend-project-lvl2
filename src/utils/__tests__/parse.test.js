import parse from '../parse.js';

const filepath1 = './fixtures/file1.json';
const filepath2 = './fixtures/file2.json';

const parsedFile1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const parsedFile2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('parsing first filepath', () => {
  expect(parse(filepath1)).toStrictEqual(parsedFile1);
});

test('parsing second filepath', () => {
  expect(parse(filepath2)).toStrictEqual(parsedFile2);
});
