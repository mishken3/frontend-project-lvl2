import genDiff from '../src/genDiff.js';
import { convertJSON, convertTXT } from '../src/convertFiles.js';

let firstFlatJSON;
let secondFlatJSON;
let expetedFlatJSON;

beforeAll(() => {
  firstFlatJSON = convertJSON('flat_json1.json');
  secondFlatJSON = convertJSON('flat_json2.json');
  expetedFlatJSON = convertTXT('expected_flat_json.txt');
});

test('basic work', () => {
  expect(genDiff(firstFlatJSON, secondFlatJSON)).toBe(expetedFlatJSON);
});
