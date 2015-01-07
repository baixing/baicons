var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var fs = require('fs');

var pbmapping = JSON.parse(fs.readFileSync('p2bmapping.json', 'utf8'));

var style_header = '\
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
            pbmapping[entry.name].forEach(function(name){
              p2b_css += "\n.icon-"+name+":before { content: \"\\"+entry.codepoint.toString(16)+"\"; }";
            });
          }
        });

        fs.writeFile("./styles.css", style_css, function(err) {
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
