import * as path from 'path';
import * as MarkdownIt from 'markdown-it';

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
