#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander = require("commander");
var preview_1 = require("./preview");
var build_1 = require("./build");
var create_1 = require("./create");
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
    .action(create_1.default);
commander
    .command('preview [dir]')
    .description('实时预览')
    .action(preview_1.default);
commander
    .command('build [dir]')
    .description('生成静态HTML')
    .option('-o, --output <dir>', '生成的静态HTML存放目录')
    .action(build_1.default);
function help() {
    commander.parse(process.argv);
    if (commander.args.length < 1)
        return commander.help();
}
help();
//# sourceMappingURL=index.js.map