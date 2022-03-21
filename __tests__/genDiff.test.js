import genDiff from '../src/genDiff.js';
import parser from '../src/parsers.js';

let firstFlatJSON;
let secondFlatJSON;
let expetedFlatResult;
let firstFlatYAML;
let secondFlatYAML;
let firstFlatYML;
let secondFlatYML;

beforeAll(() => {
  expetedFlatResult = parser('expected_flat_result.txt');

  firstFlatJSON = parser('flat_json1.json');
  secondFlatJSON = parser('flat_json2.json');

  firstFlatYAML = parser('flat_yaml1.yaml');
  secondFlatYAML = parser('flat_yaml2.yaml');
  firstFlatYML = parser('flat_yml1.yml');
  secondFlatYML = parser('flat_yml2.yml');
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
