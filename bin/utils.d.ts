/**
 * 去掉文件扩展名
 * @param name 文件名
 */
export declare function stripExtname(name: string): string;
/**
 * markdown转换成html
 * @param content
 */
export declare function markdownToHtml(content: string): string;
/**
 * 解析文章元数据
 * @param data
 */
export declare function parseSourceContent(data: string): {
    source: string;
};
/**
 * ejs渲染
 * @param file 渲染文件
 * @param data 数据
 */
export declare function renderFile(file: string, data: Object): string;
