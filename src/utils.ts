import * as path from 'path';
import * as fs from 'fs';
import * as MarkdownIt from 'markdown-it';
import * as ejs from 'ejs';
import * as rd from 'rd';

export type FindOneSyncCallback = (filename: string, stats: fs.Stats) => void;

interface iData {
  [name: string]: any;
}

const md = new MarkdownIt({
  html: true, // 在源码中启用 HTML 标签
  langPrefix: 'language-', // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
});

/**
 * 去掉文件扩展名
 * @param name 文件名
 */
export function stripExtname(name: string) {
  let i = 0 - path.extname(name).length;
  if (i === 0) i = name.length;
  return name.slice(0, i);
}

/**
 * markdown转换成html
 * @param content
 */
export function markdownToHtml(content: string) {
  return md.render(content || '');
}

/**
 * 解析文章元数据
 * @param data
 */
export function parseSourceContent(data: string) {
  const split = '---\n';

  const i = data.indexOf(split);

  const info = {
    source: '',
  };

  if (i !== -1) {
    const j = data.indexOf(split, i + split.length);

    if (j !== -1) {
      const str = data.slice(i + split.length, j).trim();

      data = data.slice(j + split.length);

      str.split('\n').forEach((line: string) => {
        const arr = line.split(':');
        info[arr[0]] = arr[1].trim();
      });
    }
  }

  info.source = data;
  return info;
}

/**
 * ejs渲染
 * @param file 渲染文件
 * @param data 数据
 */
export function renderFile(file: string, data: Object) {
  return ejs.render(fs.readFileSync(file).toString(), {
    filename: file,
    locals: data,
  });
}

// 遍历所有文章
export function eachSourceFile(
  sourceDir: string,
  callback: FindOneSyncCallback
) {
  rd.eachFileFilterSync(sourceDir, /\.md$/, callback);
}

// 渲染文章列表
export function renderIndex(dir: string) {
  const list = [];

  const sourceDir = path.resolve(dir, '_posts');
  eachSourceFile(sourceDir, (f: string) => {
    const source = fs.readFileSync(f).toString();
    const post: iData = parseSourceContent(source);
    post.timestamp = new Date(post.date);

    post.url = `/posts/${stripExtname(f.slice(sourceDir.length + 1))}.html`;

    list.push(post);
  });

  list.sort((a, b) => b.timestamp - a.timestamp);

  const html = renderFile(path.resolve(dir, '_layout', 'index.ejs'), list);

  return html;
}

// 渲染文章
export function renderPost(dir: string, file: string) {
  const content = fs.readFileSync(file).toString();

  const post: iData = parseSourceContent(content.toString());

  post.content = markdownToHtml(post.source);
  post.layout = post.layout || 'post';

  const html = renderFile(
    path.resolve(dir, '_layout', post.layout + '.ejs'),
    post
  );
  return html;
}
