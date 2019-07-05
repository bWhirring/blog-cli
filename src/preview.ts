import * as express from 'express';
import * as serverStatic from 'serve-static';
import * as path from 'path';
import * as fs from 'fs';
import * as config from 'config';
import * as rd from 'rd';

interface iData {
  [name: string]: any;
}

const PORT = config.get('PORT');

import {
  markdownToHtml,
  stripExtname,
  parseSourceContent,
  renderFile,
} from './utils';

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

      const post: iData = parseSourceContent(content.toString());

      post.content = markdownToHtml(post.source);
      post.layout = post.layout || 'post';

      const html = renderFile(
        path.resolve(dir, '_layout', post.layout + '.ejs'),
        post
      );
      res.send(html);
      res.end();
    });
  });

  // 渲染列表
  router.get('/', (req, res, next) => {
    const list = [];

    const sourceDir = path.resolve(dir, '_posts');
    rd.eachFileFilterSync(sourceDir, /\.md/, (f: string, s) => {
      const source = fs.readFileSync(f).toString();
      const post: iData = parseSourceContent(source);
      post.timestamp = new Date(post.date);

      post.url = `/posts/${stripExtname(f.slice(sourceDir.length + 1))}.html`;

      list.push(post);
    });

    list.sort((a, b) => b - a);

    const html = renderFile(path.resolve(dir, '_layout', 'index.ejs'), list);

    res.send(html);
    res.end();
  });

  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
}
