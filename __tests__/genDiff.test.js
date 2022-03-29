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

let firstJSON;
let secondJSON;
let firstYAML;
let secondYAML;
let expectedResult;
let expectPlainResult;

beforeAll(() => {
  firstJSON = getFixturePath('file1.json');
  secondJSON = getFixturePath('file2.json');
  firstYAML = getFixturePath('file1.yaml');
  secondYAML = getFixturePath('file2.yaml');

  expectedResult = readFixtureFile('expected_result.txt');
  expectPlainResult = readFixtureFile('expected_plain_result.txt');
});

test('nested stylish JSON', () => {
  expect(genDiff(firstJSON, secondJSON)).toBe(expectedResult);
});

test('nested stylish YAML', () => {
  expect(genDiff(firstYAML, secondYAML)).toBe(expectedResult);
});

test('nested plain JSON', () => {
  expect(genDiff(firstJSON, secondJSON, 'plain')).toBe(expectPlainResult);
});

test('nested plain YAML', () => {
  expect(genDiff(firstYAML, secondYAML, 'plain')).toBe(expectPlainResult);
});
