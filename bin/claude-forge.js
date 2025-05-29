#!/usr/bin/env node

const { program } = require('commander');
const init = require('../lib/index');
const { version } = require('../package.json');

program
  .name('claude-forge')
  .description('Forge your ideas into reality with Claude Code')
  .version(version);

program
  .command('init')
  .description('Initialize Claude Forge in your project')
  .option('-m, --methodology <type>', 'Choose methodology (scrum, shapeup)')
  .option('-f, --force', 'Overwrite existing files')
  .option('-q, --quiet', 'Minimal output')
  .option('-l, --list', 'List available methodologies')
  .action(init);

program
  .command('list-methodologies')
  .description('List all available methodologies')
  .action(() => {
    const { listMethodologies } = require('../lib/index');
    listMethodologies();
  });

program.parse(process.argv);

// Show help if no command given
if (!process.argv.slice(2).length) {
  program.outputHelp();
}