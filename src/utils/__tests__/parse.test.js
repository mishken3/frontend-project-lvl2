import { test, expect, describe } from '@jest/globals';
import parser from '../../parser/parser.js';

const filepath1JSON = './fixtures/file1.json';
const filepath2JSON = './fixtures/file2.json';

const filepath1YAML = './fixtures/file1.yaml';
const filepath2YAML = './fixtures/file2.yaml';

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

describe('JSON extension', () => {
  test('parsing first filepath', () => {
    expect(parser(filepath1JSON)).toStrictEqual(parsedFile1);
  });

  test('parsing second filepath', () => {
    expect(parser(filepath2JSON)).toStrictEqual(parsedFile2);
  });
});

describe('YAML extension', () => {
  test('parsing first filepath', () => {
    expect(parser(filepath1YAML)).toStrictEqual(parsedFile1);
  });

  test('parsing second filepath', () => {
    expect(parser(filepath2YAML)).toStrictEqual(parsedFile2);
  });
});
