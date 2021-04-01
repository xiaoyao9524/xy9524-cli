#!/usr/bin/env node

const program = require('commander');
const {action} = require('./util');

program
  .version('1.2.1', '-v, --version')
  .command('init <name>')
  .action(action);

program.parse(process.argv);

