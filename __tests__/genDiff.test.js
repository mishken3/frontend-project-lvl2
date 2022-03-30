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

/*
// Не проходит проверку финальными тестами hexlet, т.к. переиспользую переменные.
let firstJSON;
let secondJSON;
let firstYAML;
let secondYAML;
let expectedResult;
let expectPlainResult;
let expectJSONResult;

beforeAll(() => {
  firstJSON = getFixturePath('file1.json');
  secondJSON = getFixturePath('file2.json');
  firstYAML = getFixturePath('file1.yaml');
  secondYAML = getFixturePath('file2.yaml');

  expectedResult = readFixtureFile('expected_result.txt');
  expectPlainResult = readFixtureFile('expected_plain_result.txt');
  expectJSONResult = readFixtureFile('expected_json_result.txt');
});
*/

const firstJSON = getFixturePath('file1.json');
const secondJSON = getFixturePath('file2.json');
const firstYAML = getFixturePath('file1.yaml');
const secondYAML = getFixturePath('file2.yaml');
const expectedResult = readFixtureFile('expected_result.txt');
const expectPlainResult = readFixtureFile('expected_plain_result.txt');
const expectJSONResult = readFixtureFile('expected_json_result.txt');

test('stylish output-style for nested .JSON files', () => {
  expect(genDiff(firstJSON, secondJSON)).toBe(expectedResult);
});

test('stylish output-style for nested .YAML files', () => {
  expect(genDiff(firstYAML, secondYAML)).toBe(expectedResult);
});

test('plain output-style for nested .JSON files', () => {
  expect(genDiff(firstJSON, secondJSON, 'plain')).toBe(expectPlainResult);
});

test('plain output-style for nested .YAML files', () => {
  expect(genDiff(firstYAML, secondYAML, 'plain')).toBe(expectPlainResult);
});

test('json output-style for nested .JSON files', () => {
  expect(genDiff(firstJSON, secondJSON, 'json')).toBe(expectJSONResult);
});

test('json output-style for nested .YAML files', () => {
  expect(genDiff(firstYAML, secondYAML, 'json')).toBe(expectJSONResult);
});
