#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander = require("commander");
var version = require('../package.json').version;
commander.version(version);
commander
    .command('help')
    .description('显示帮助')
    .action(function () {
    commander.help();
});
commander
    .command('create [dir]')
    .description('创建一个空的blog')
    .action(function (dir) {
    console.log('create %s', dir);
});
commander
    .command('preview [dir]')
    .description('实时预览')
    .action(function (dir) {
    console.log('preview %s', dir);
});
function help() {
    commander.parse(process.argv);
    if (commander.args.length < 1)
        return commander.help();
}
help();
//# sourceMappingURL=index.js.map