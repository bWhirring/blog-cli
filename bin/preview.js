"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var serverStatic = require("serve-static");
var path = require("path");
var config = require("config");
var open = require("open");
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
        var html = utils_1.renderPost(dir, file);
        res.send(html);
        res.end();
    });
    // 渲染列表
    router.get('/', function (req, res, next) {
        var html = utils_1.renderIndex(dir);
        res.send(html);
        res.end();
    });
    var url = "http://localhost:" + PORT;
    app.listen(PORT, function () {
        console.log("server running at " + url);
    });
    open(url);
}
exports.default = default_1;
//# sourceMappingURL=preview.js.map