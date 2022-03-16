#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';
import convertJSON from '../src/convertJSON.js';

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
