var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');

var p2bmapping = require('./template/p2b_mapping.json');
var fontName = "baicons";

var fontPath = "fonts/";
var cssDest = "./";

var style = "styles.css";
var p2b = "p2b.css";
var reference = "icons-reference.html";

function generateFonts(cb) {
  gulp.src(['source/*.svg'])
    .pipe(iconfont({
      fontName: 'baicons'
    }))
    .on('codepoints', function (codepoints) {

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
          mapping: p2bmapping
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
    .pipe(gulp.dest('./fonts/'))
    .on('finish',cb);
}

gulp.task('gen', generateFonts);

gulp.task('default', generateFonts);
