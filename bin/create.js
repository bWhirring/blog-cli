"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs_extra_1 = require("fs-extra");
var moment = require("moment");
function create(dir) {
    dir = dir || '.';
    // 创建基本目录
    fs_extra_1.mkdirsSync(path.resolve(dir, '_layout'));
    fs_extra_1.mkdirsSync(path.resolve(dir, '_posts'));
    fs_extra_1.mkdirsSync(path.resolve(dir, 'assets'));
    fs_extra_1.mkdirsSync(path.resolve(dir, 'posts'));
    // 复制模板文件
    var tplDir = path.resolve(__dirname, '../tpl');
    fs_extra_1.copySync(tplDir, dir);
    newPost(dir, 'Hello', 'first');
}
exports.default = create;
// 创建文章
function newPost(dir, title, content) {
    var data = [
        "---\ntitle: " + title + "\ndate: " + moment().format('YYYY-MM-DD') + "\nlayout: post\n---\n" + content,
    ].join('\n');
    var name = moment().format('YYYY-MM') + '/hello.md';
    var file = path.resolve(dir, '_posts', name);
    fs_extra_1.outputFileSync(file, data);
}
//# sourceMappingURL=create.js.map