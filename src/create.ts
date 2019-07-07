import * as path from 'path';
import { mkdirsSync, outputFileSync, copySync } from 'fs-extra';
import * as moment from 'moment';

import {} from './utils';

export default function create(dir: string) {
  dir = dir || '.';

  // 创建基本目录
  mkdirsSync(path.resolve(dir, '_layout'));
  mkdirsSync(path.resolve(dir, '_posts'));
  mkdirsSync(path.resolve(dir, 'assets'));
  mkdirsSync(path.resolve(dir, 'posts'));

  // 复制模板文件
  const tplDir = path.resolve(__dirname, '../tpl');
  copySync(tplDir, dir);

  newPost(dir, 'Hello', 'first');
}

// 创建文章
function newPost(dir: string, title: string, content: string) {
  const data = [
    `---
title: ${title}
date: ${moment().format('YYYY-MM-DD')}
layout: post
---
${content}`,
  ].join('\n');

  const name = moment().format('YYYY-MM') + '/hello.md';
  const file = path.resolve(dir, '_posts', name);
  outputFileSync(file, data);
}
