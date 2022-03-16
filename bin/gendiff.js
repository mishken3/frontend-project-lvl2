#!/usr/bin/env node
import { Command } from 'commander';
import changeDetector from '../src/genDiff.js';
import * as fs from 'fs';
import { cwd } from 'process';
import path from 'path';

/*
// ===============================
// ===============================
// ===============================
// ===============================
*/

// const file1JSON = fs.readFileSync('file1.json', 'utf-8');
// const testPaths = (file) => path.resolve(fs.readFileSync(file, 'utf-8'));
// const convertJSON = (file) =>
//   JSON.parse(fs.readFileSync(testPaths(file), 'utf-8'));

// const convertJSON = (file) => {
//   const path = JSON.parse(testPaths(file));
//   console.log(path);
//   return path;
// };

const convertJSON = (filepath) => {
  const fixPath = path.resolve(cwd(), filepath);
  const file = fs.readFileSync(fixPath, 'utf-8');
  const convertedFile = JSON.parse(file);
  return convertedFile;
};

/*
// ===============================
// ===============================
// ===============================
// ===============================
*/

const program = new Command();
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --forman <type>', 'output format')
  .action((filepath1, filepath2) => {
    const result = changeDetector(
      convertJSON(filepath1),
      convertJSON(filepath2)
    );
    console.log(result);
  });

program.parse();
