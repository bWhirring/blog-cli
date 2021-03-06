/// <reference types="node" />
import * as fs from 'fs';
export declare type FindOneSyncCallback = (filename: string, stats: fs.Stats) => void;
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
export declare function eachSourceFile(sourceDir: string, callback: FindOneSyncCallback): void;
export declare function renderIndex(dir: string): string;
export declare function renderPost(dir: string, file: string): string;
