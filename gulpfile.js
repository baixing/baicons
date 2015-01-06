var gulp = require('gulp');
var iconfont = require('gulp-iconfont');

var pbmapping = {
  "heart" : "jiaoyou",
  "cat-fangwu" : "fangwu",
  "cat-ershouche" : "cheliang",
  "cat-jianli" : "jianli",
  "arrow-left" : "arrowLeft",
  "triangle-down" : "downTriangle",
  "view-pic" : "viewPic",
  "clock" : "jianzhi",
  "user" : "user-2",
  "delete-circle" : "cancel-circle",
  "check-mark" : "checkmark",
  "safety" : "safety1",
  "arrow-top" : "arrowTop",
  "cat-chongwu" : "chongwu",
  "check-mark-circle" : "checkmark-circle",
  "cat-fuwu" : "fuwu",
  "pin-to-top" : "pinToTop",
  "arrow-bottom" : "arrowDown",
  "cart" : "ershou",
  "vcard" : "card",
  "view-item" : "viewItem",
  "cat-jiaoyu" : "jiaoyu",
  "safety-warn" : "safety2",
  "mobile" : "mobile-2",
  "cat-quanzhi" : "quanzhi",
  "cash-bag" : "cashBag",
  "windows" : "windows8",
  "arrow-right" : "arrowRight",
  "camera" : "pcCamera",
  "delete" : "close",
  "view-title" : "viewTitle"
  // cheliang & car => q
  // jiaoyou & entertainment => G
};

var style_header = '\n\
@charset "UTF-7";\n\
\n\
@font-face {\n\
  font-family: "baicons";\n\
  src:url("fonts/baicons.eot");\n\
  src:url("fonts/baicons.eot?#iefix") format("embedded-opentype"),\n\
    url("fonts/baicons.woff") format("woff"),\n\
    url("fonts/baicons.ttf") format("truetype"),\n\
    url("fonts/baicons.svg#baicons") format("svg");\n\
  font-weight: normal;\n\
  font-style: normal;\n\
\n\
}\n\
\n\
[data-icon]:before {\n\
  font-family: "baicons" !important;\n\
  content: attr(data-icon);\n\
  font-style: normal !important;\n\
  font-weight: normal !important;\n\
  font-variant: normal !important;\n\
  text-transform: none !important;\n\
  speak: none;\n\
  line-height: 1;\n\
  -webkit-font-smoothing: antialiased;\n\
  -moz-osx-font-smoothing: grayscale;\n\
}\n\
\n\
[class^="icon-"]:before,\n\
[class*=" icon-"]:before {\n\
  font-family: "baicons" !important;\n\
  font-style: normal !important;\n\
  font-weight: normal !important;\n\
  font-variant: normal !important;\n\
  text-transform: none !important;\n\
  speak: none;\n\
  line-height: 1;\n\
  -webkit-font-smoothing: antialiased;\n\
  -moz-osx-font-smoothing: grayscale;\n\
}\n\
';

var p2b_header = "/* Puerh Icons 2 Baicons */";

gulp.task('generate', function(){
  gulp.src(['source/*.svg'])
    .pipe(iconfont({
      fontName: 'baicons'
    }))
      .on('codepoints', function(codepoints) {

        var style_css = style_header + '\n';
        var p2b_css = p2b_header + '\n';
        codepoints.forEach(function(entry){
          style_css += "\n.icon-"+entry.name+":before { content: \"\\"+entry.codepoint.toString(16)+"\"; }";
          if (!!pbmapping[entry.name]) {
            p2b_css += "\n.icon-"+pbmapping[entry.name]+":before { content: \"\\"+entry.codepoint.toString(16)+"\"; }";
          }
        });

        var fs = require('fs');
        fs.writeFile("./style.css", style_css, function(err) {
          if(err) {
            console.log(err);
          }
        });
        fs.writeFile("./p2b.css", p2b_css, function(err) {
          if(err) {
            console.log(err);
          }
        });

      })
    .pipe(gulp.dest('./fonts/'));
});
