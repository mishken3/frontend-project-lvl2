import genDiff from '../src/genDiff.js';
import { readFixtureFile } from '../src/parsers.js';

const firstFlatJSON = 'flat_json1.json';
const secondFlatJSON = 'flat_json2.json';
const firstFlatYAML = 'flat_yaml1.yaml';
const secondFlatYAML = 'flat_yaml2.yaml';
const firstFlatYML = 'flat_yml1.yml';
const secondFlatYML = 'flat_yml2.yml';

let expetedFlatResult;

beforeAll(() => {
  expetedFlatResult = readFixtureFile('expected_flat_result.txt');
});

test('Flat JSON', () => {
  expect(genDiff(firstFlatJSON, secondFlatJSON)).toBe(expetedFlatResult);
});

test('Flat YAML', () => {
  expect(genDiff(firstFlatYAML, secondFlatYAML)).toBe(expetedFlatResult);
});

test('Flat YML', () => {
  expect(genDiff(firstFlatYML, secondFlatYML)).toBe(expetedFlatResult);
});
