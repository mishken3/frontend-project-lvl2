import { Command } from 'commander';
import genDiff from './index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    console.log('\n', result);

    return result;
  });

// TODO: Needs later
// const options = program.opts();

export default program;
