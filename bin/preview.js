"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var serverStatic = require("serve-static");
var path = require("path");
var fs = require("fs");
var config = require("config");
var PORT = config.get('PORT');
var utils_1 = require("./utils");
function default_1(dir) {
    if (dir === void 0) { dir = '.'; }
    var app = express();
    var router = express.Router();
    app.use('/assets', serverStatic(path.resolve(dir, 'assets')));
    app.use(router);
    // 渲染文章
    router.get('/posts/*', function (req, res, next) {
        var name = utils_1.stripExtname(req.params[0]);
        var file = path.resolve(dir, '_posts', name + ".md");
        fs.readFile(file, function (err, content) {
            if (err)
                return next(err);
            var post = utils_1.parseSourceContent(content.toString());
            post.content = utils_1.markdownToHtml(post.source);
            post.layout = post.layout || 'post';
            var html = utils_1.renderFile(path.resolve(dir, '_layout', post.layout + '.ejs'), post);
            res.send(html);
            res.end();
        });
    });
    // 渲染列表
    router.get('/', function (req, res, next) {
        res.end('list');
    });
    app.listen(PORT, function () {
        console.log("server running at http://localhost:" + PORT);
    });
}
exports.default = default_1;
//# sourceMappingURL=preview.js.map