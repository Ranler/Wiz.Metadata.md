# Wiz.Metadata.md

参考akof1314的[Wiz.Editor.md](https://github.com/akof1314/Wiz.Editor.md)和NoAnyLove的[Wiz.Picture.md](https://github.com/NoAnyLove/Wiz.Picture.md)，在为知笔记中模拟对Markdown的Metadata支持。

## 语法

支持在文章开头插入以下Markdown语法:

```
---
Title: 文章标题
Author: 作者
Date: 2018/8/1

文章正文
```

参考[Python-Markdown的Meta-data](https://python-markdown.github.io/extensions/meta_data/)和[Markup的metadata](https://blog.github.com/2013-09-27-viewing-yaml-metadata-in-your-documents/)。

## 问题

* 只能在文章打开时渲染，保存编辑后不能自动渲染，需要再次刷新。（文档里没有找到文章保存后的回调函数）
* Metadata语法和Python-Markdown、Markup版本不完全一致。
