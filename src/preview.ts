import * as express from 'express';
import * as serverStatic from 'serve-static';
import * as path from 'path';
import * as config from 'config';
import * as open from 'open';

const PORT = config.get('PORT');

import { stripExtname, renderIndex, renderPost } from './utils';

export default function(dir = '.') {
  const app = express();

  const router = express.Router();

  app.use('/assets', serverStatic(path.resolve(dir, 'assets')));

  app.use(router);

  // 渲染文章
  router.get('/posts/*', (req, res, next) => {
    const name = stripExtname(req.params[0]);
    const file = path.resolve(dir, '_posts', `${name}.md`);
    const html = renderPost(dir, file);
    res.send(html);
    res.end();
  });

  // 渲染列表
  router.get('/', (req, res, next) => {
    const html = renderIndex(dir);
    res.send(html);
    res.end();
  });

  const url = `http://localhost:${PORT}`;

  app.listen(PORT, () => {
    console.log(`server running at ${url}`);
  });

  open(url);
}
