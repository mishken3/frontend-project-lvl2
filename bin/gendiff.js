#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import genDiff from '../src/genDiff.js';

const convertJSON = (filepath) => {
  const fixPath = path.resolve(cwd(), filepath);
  const file = fs.readFileSync(fixPath, 'utf-8');
  const convertedFile = JSON.parse(file);
  return convertedFile;
};

const program = new Command();
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --forman <type>', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(convertJSON(filepath1), convertJSON(filepath2));
    console.log(result);
  });

program.parse();
