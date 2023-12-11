import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('stylish format', () => {
  expect(
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')),
  ).toBe(readFileSync(getFixturePath('stylish.txt'), 'utf-8'));
});

test('plain format', () => {
  const result = genDiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
    'plain',
  );

  expect(result).toBe(readFileSync(getFixturePath('plain.txt'), 'utf-8'));
});
