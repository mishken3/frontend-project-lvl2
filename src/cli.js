import { Command } from 'commander';
import parse from './parse.js';

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
  });

// TODO: Needs later
// const options = program.opts();

export default program;
