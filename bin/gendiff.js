#!/usr/bin/env node
/* eslint-disable no-console */

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option(
    '-f, --format <type>',
    'output formats: "stylish", "plain", "json"',
    'stylish',
  )
  .action((filepath1, filepath2, options) => {
    const result = genDiff(filepath1, filepath2, options.format);
    console.log(result);
  });

program.parse();
