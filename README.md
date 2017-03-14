## Baicons - 百姓网的图标字体库

### 字体一览

旧版字体
[baicons/icons-reference.html](http://baixing.github.io/baicons/icons-reference.html)

新版字体
[baicons/icons-reference2.html](http://baixing.github.io/baicons/icons-reference2.html)

手机版字体
[baicons/icons-reference2.html](http://baixing.github.io/baicons/icons-reference-mobile.html)

### 安装

`bower install git://github.com/baixing/baicons.git --save`

在页面中引用 baicons.css 或 baicons2.css 即可：

旧版网页使用:
`<link href="bower_components/baicons.css" media="all" rel="stylesheet" type="text/css">`

新版网页使用:
`<link href="bower_components/baicons2.css" media="all" rel="stylesheet" type="text/css">`

### 命名规则

基本规则是（以 CSS 类名传统为准）：

* 命名采用英文
* 全部小写
* 使用中划线连字符

在此基础上的特例是，类目图标以中文拼音命名，并添加 `cat-` 前缀，如 `cat-ershouche`。

### 怎样更新图标
1. 使用node 4，注意npm install时也需要node 4
1. 更新baicon的package.json中的版本
1. 在 `source` 或 `source` 目录下更新图标源文件（svg 格式）
1. 执行 `npm run build` 命令生成图标和对应样式表
1. 在使用baicon的package.json中升级baicon版本
