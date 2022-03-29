#!/usr/bin/env node
/* eslint-disable no-console */

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();
program
  .version('0.0.7')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2, program.opts().format);
    console.log(result);

    console.log('Compares two configuration files and shows a difference.');
  });

program.parse();
