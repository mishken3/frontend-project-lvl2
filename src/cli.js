import { Command } from 'commander';
import parse from './parse.js';
import uniq from 'lodash/uniq.js';
import { compare } from './utils/compare.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const file1 = parse(filepath1);
    const file2 = parse(filepath2);
    const keys = [
      ...uniq([...Object.keys(file1), ...Object.keys(file2)]),
    ].sort();

    const result = compare(keys, file1, file2);
    console.log('\n', result);

    return result;
  });

// TODO: Needs later
// const options = program.opts();

export default program;
