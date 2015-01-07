## Baicons - 百姓网的图标字体库

### 字体一览

[baicons/icons-reference.html](http://baixing.github.io/baicons/icons-reference.html)

### 安装

`bower install git://github.com/baixing/baicons.git --save`

### 命名规则

基本规则是（以 CSS 类名传统为准）：

* 命名采用英文
* 全部小写
* 使用中划线连字符

以此为基础的特例是，类目图标以中文拼音命名，并添加 `cat-` 前缀。

### 怎样更新图标

1. 在 `source` 目录下更新图标源文件（svg 格式）
1. 执行 `gulp generate` 命令生成图标和对应样式表
