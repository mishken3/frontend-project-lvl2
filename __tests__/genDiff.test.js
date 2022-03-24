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

let firstFlatJSON;
let secondFlatJSON;
let firstFlatYAML;
let secondFlatYAML;
let firstFlatYML;
let secondFlatYML;

let firstJSON;
let secondJSON;
let expectedResult;

let expectedFlatResult;

beforeAll(() => {
  expectedFlatResult = readFixtureFile('expected_flat_result.txt');
  expectedResult = readFixtureFile('expected_result.txt');

  firstFlatJSON = getFixturePath('flat_json1.json');
  secondFlatJSON = getFixturePath('flat_json2.json');
  firstFlatYAML = getFixturePath('flat_yaml1.yaml');
  secondFlatYAML = getFixturePath('flat_yaml2.yaml');
  firstFlatYML = getFixturePath('flat_yml1.yml');
  secondFlatYML = getFixturePath('flat_yml2.yml');

  firstJSON = getFixturePath('file1.json');
  secondJSON = getFixturePath('file2.json');
});

test('Flat JSON', () => {
  expect(genDiff(firstFlatJSON, secondFlatJSON)).toBe(expectedFlatResult);
});

test('Flat YAML', () => {
  expect(genDiff(firstFlatYAML, secondFlatYAML)).toBe(expectedFlatResult);
});

test('Flat YML', () => {
  expect(genDiff(firstFlatYML, secondFlatYML)).toBe(expectedFlatResult);
});

test('nested JSON', () => {
  expect(genDiff(firstJSON, secondJSON)).toBe(expectedResult);
});
