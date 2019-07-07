"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs_extra_1 = require("fs-extra");
var utils_1 = require("./utils");
function default_1(dir, options) {
    dir = dir || '.';
    var outputDir = path.resolve(options.output || dir);
    // 写入文件
    function outputFile(file, content) {
        console.log("\u751F\u6210\u9875\u9762 " + file.slice(outputDir.length + 1));
        fs_extra_1.outputFileSync(file, content);
    }
    // 生成文章内容
    var sourceDir = path.resolve(dir, '_posts');
    utils_1.eachSourceFile(sourceDir, function (f) {
        var html = utils_1.renderPost(dir, f);
        var relativeFile = utils_1.stripExtname(f.slice(sourceDir.length + 1)) + '.html';
        var file = path.resolve(outputDir, 'posts', relativeFile);
        outputFile(file, html);
    });
    // Index
    var homeIndex = utils_1.renderIndex(dir);
    var fileIndex = path.resolve(outputDir, 'index.html');
    outputFile(fileIndex, homeIndex);
}
exports.default = default_1;
//# sourceMappingURL=build.js.map