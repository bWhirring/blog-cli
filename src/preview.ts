import * as express from 'express';
import * as serverStatic from 'serve-static';
import * as path from 'path';
import * as fs from 'fs';
import * as MarkdownIt from 'markdown-it';
import * as config from 'config';

const PORT = config.get('PORT');

import { markdownToHtml, stripExtname } from './utils';

export default function(dir = '.') {
  const app = express();

  const router = express.Router();

  app.use('/assets', serverStatic(path.resolve(dir, 'assets')));

  app.use(router);

  // 渲染文章
  router.get('/posts/*', (req, res, next) => {
    const name = stripExtname(req.params[0]);
    const file = path.resolve(dir, '_posts', `${name}.md`);
    fs.readFile(file, (err, content) => {
      if (err) return next(err);

      const html = markdownToHtml(content.toString());
      res.send(html);
      res.end();
    });
  });

  // 渲染列表
  router.get('/', (req, res, next) => {
    res.end('list');
  });

  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
}
