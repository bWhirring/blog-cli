"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var MarkdownIt = require("markdown-it");
var ejs = require("ejs");
var rd = require("rd");
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
/**
 * 解析文章元数据
 * @param data
 */
function parseSourceContent(data) {
    var split = '---\n';
    var i = data.indexOf(split);
    var info = {
        source: '',
    };
    if (i !== -1) {
        var j = data.indexOf(split, i + split.length);
        if (j !== -1) {
            var str = data.slice(i + split.length, j).trim();
            data = data.slice(j + split.length);
            str.split('\n').forEach(function (line) {
                var arr = line.split(':');
                info[arr[0]] = arr[1].trim();
            });
        }
    }
    info.source = data;
    return info;
}
exports.parseSourceContent = parseSourceContent;
/**
 * ejs渲染
 * @param file 渲染文件
 * @param data 数据
 */
function renderFile(file, data) {
    return ejs.render(fs.readFileSync(file).toString(), {
        filename: file,
        locals: data,
    });
}
exports.renderFile = renderFile;
// 遍历所有文章
function eachSourceFile(sourceDir, callback) {
    rd.eachFileFilterSync(sourceDir, /\.md$/, callback);
}
exports.eachSourceFile = eachSourceFile;
// 渲染文章列表
function renderIndex(dir) {
    var list = [];
    var sourceDir = path.resolve(dir, '_posts');
    eachSourceFile(sourceDir, function (f) {
        var source = fs.readFileSync(f).toString();
        var post = parseSourceContent(source);
        post.timestamp = new Date(post.date);
        post.url = "/posts/" + stripExtname(f.slice(sourceDir.length + 1)) + ".html";
        list.push(post);
    });
    list.sort(function (a, b) { return b.timestamp - a.timestamp; });
    var html = renderFile(path.resolve(dir, '_layout', 'index.ejs'), list);
    return html;
}
exports.renderIndex = renderIndex;
// 渲染文章
function renderPost(dir, file) {
    var content = fs.readFileSync(file).toString();
    var post = parseSourceContent(content.toString());
    post.content = markdownToHtml(post.source);
    post.layout = post.layout || 'post';
    var html = renderFile(path.resolve(dir, '_layout', post.layout + '.ejs'), post);
    return html;
}
exports.renderPost = renderPost;
//# sourceMappingURL=utils.js.map