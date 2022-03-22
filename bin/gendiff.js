#!/usr/bin/env node
/* eslint-disable no-console */

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    console.log(result);
    console.log('Compares two configuration files and shows a difference.');
  });

program.parse();
