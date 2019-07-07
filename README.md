### Nodejs 实战  打造静态博客系统


在查看命令帮助时，会出现`[]`、`<>`、`|` 等符号，含义如下

-  []: 表示可选
-  <>：表示可变选项，一般是多选一，而且必须选其一
-  x|y|z: 多选一， 如果加上`[]`,则可不选
-  -abc: 多选，如果加上`[]`, 则可不选


| 格式                               | 描述                             |
| ---------------------------------- | -------------------------------- |
| blog create [dir]                  | 创建一个空的博客，默认为当前目录 |
| blog preview [dir]                 | 实时预览                         |
| blog build [dir] [--output target] | 生成整站静态HTML                 |


### config(配置文件)

`config/default.json`

### 实时预览

```
blog preview [dir]
```
> 访问[链接](http://localhost:3008/posts/2019-07/hello)

[example/_post/**/*.md]

  配置放在`---`里面
  - title 文章标题
  - date 时间
  - layout 模板 默认`post`


### build
```
blog build example or blog build example -o <dir>
```


#### 参考资料

- nodejs实战(第2版)
