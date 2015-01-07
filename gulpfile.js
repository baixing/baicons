var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');
var fs = require('fs');

var pbmapping = JSON.parse(fs.readFileSync('p2bmapping.json', 'utf8'));

var fontName = "baicons";
var fontPath = "fonts/";
var cssDest = "./";
var style = "style.css";
var p2b = "p2b.css";
var reference = "reference.html";

gulp.task('generate', function(){
  gulp.src(['source/*.svg'])
    .pipe(iconfont({
      fontName: 'baicons'
    }))
      .on('codepoints', function(codepoints) {

        gulp.src('template/styles_template.css')
            .pipe(consolidate('lodash', {
              glyphs: codepoints,
              fontName: fontName,
              fontPath: fontPath
            }))
            .pipe(rename(style))
            .pipe(gulp.dest(cssDest));

          gulp.src('template/p2b_template.css')
              .pipe(consolidate('lodash', {
                  glyphs: codepoints,
                  mapping: pbmapping
              }))
              .pipe(rename(p2b))
              .pipe(gulp.dest(cssDest));

          gulp.src('template/reference_template.html')
              .pipe(consolidate('lodash', {
                  glyphs: codepoints,
                  cssdest: cssDest,
                  style: style
              }))
              .pipe(rename(reference))
              .pipe(gulp.dest(cssDest));
      })
    .pipe(gulp.dest('./fonts/'));
});
