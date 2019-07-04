#!/usr/bin/env node

import * as commander from 'commander';

const { version } = require('../package.json');

commander.version(version);

commander
  .command('help')
  .description('显示帮助')
  .action(() => {
    commander.help();
  });

commander
  .command('create [dir]')
  .description('创建一个空的blog')
  .action(dir => {
    console.log('create %s', dir);
  });

commander
  .command('preview [dir]')
  .description('实时预览')
  .action(dir => {
    console.log('preview %s', dir);
  });

commander
  .command('build [dir]')
  .description('生成静态HTML')
  .option('-o, --output <dir>', '生成的静态HTML存放目录')
  .action((dir, options) => {
    console.log('create %s, output %s', dir, options.output);
  });

function help() {
  commander.parse(process.argv);
  if (commander.args.length < 1) return commander.help();
}

help();
