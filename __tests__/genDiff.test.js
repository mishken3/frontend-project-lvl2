import genDiff from '../src/genDiff.js';
import parser from '../src/parsers.js';

let firstFlatJSON;
let secondFlatJSON;
let expetedFlatResult;
let firstFlatYAML;
let secondFlatYAML;

beforeAll(() => {
  expetedFlatResult = parser('expected_flat_result.txt');

  firstFlatJSON = parser('flat_json1.json');
  secondFlatJSON = parser('flat_json2.json');

  firstFlatYAML = parser('flat_yaml1.yaml');
  secondFlatYAML = parser('flat_yaml2.yaml');
});

test('Flat JSON', () => {
  expect(genDiff(firstFlatJSON, secondFlatJSON)).toBe(expetedFlatResult);
});

test('Flat YAML', () => {
  expect(genDiff(firstFlatYAML, secondFlatYAML)).toBe(expetedFlatResult);
});
