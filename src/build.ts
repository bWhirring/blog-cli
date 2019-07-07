import * as path from 'path';
import * as fs from 'fs';
import { outputFileSync } from 'fs-extra';
import { eachSourceFile, renderPost, stripExtname, renderIndex } from './utils';

interface IOptions {
  output: string;
}

export default function(dir: string, options: IOptions) {
  dir = dir || '.';

  const outputDir = path.resolve(options.output || dir);

  // 写入文件
  function outputFile(file: string, content: string) {
    console.log(`生成页面 ${file.slice(outputDir.length + 1)}`);
    outputFileSync(file, content);
  }

  // 生成文章内容
  const sourceDir = path.resolve(dir, '_posts');

  eachSourceFile(sourceDir, (f: string) => {
    const html = renderPost(dir, f);
    const relativeFile = stripExtname(f.slice(sourceDir.length + 1)) + '.html';

    const file = path.resolve(outputDir, 'posts', relativeFile);

    outputFile(file, html);
  });

  // Index
  const homeIndex = renderIndex(dir);
  const fileIndex = path.resolve(outputDir, 'index.html');

  outputFile(fileIndex, homeIndex);
}
