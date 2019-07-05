import * as path from 'path';
import * as fs from 'fs';
import * as MarkdownIt from 'markdown-it';
import * as ejs from 'ejs';

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
