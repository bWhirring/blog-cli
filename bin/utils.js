"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var MarkdownIt = require("markdown-it");
var md = new MarkdownIt({
    html: true,
    langPrefix: 'language-',
});
/**
 * 去掉文件扩展名
 * @param name 文件名
 */
function stripExtname(name) {
    var i = 0 - path.extname(name).length;
    if (i === 0)
        i = name.length;
    return name.slice(0, i);
}
exports.stripExtname = stripExtname;
/**
 * markdown转换成html
 * @param content
 */
function markdownToHtml(content) {
    return md.render(content || '');
}
exports.markdownToHtml = markdownToHtml;
//# sourceMappingURL=utils.js.map