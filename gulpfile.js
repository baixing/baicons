var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');

var p2bmapping = require('./template/p2b_mapping.json');
var fontName = "baicons";
var fontName2 = "baicons2";

var fontPath = "fonts/";
var cssDest = "./";

var style = "baicons.css";
var style2 = "baicons2.css";
var p2b = "p2b.css";
var reference = "icons-reference.html";
var reference2 = "icons-reference2.html";

function generateFonts(cb) {
  gulp.src(['source/*.svg'])
    .pipe(iconfont({
      fontName: 'baicons'
    }))
    .on('glyphs', function (glyphs) {

      gulp.src('template/styles_template.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          fontPath: fontPath
        }))
        .pipe(rename(style))
        .pipe(gulp.dest(cssDest));

      gulp.src('template/p2b_template.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          mapping: p2bmapping
        }))
        .pipe(rename(p2b))
        .pipe(gulp.dest(cssDest));

      gulp.src('template/reference_template.html')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          cssdest: cssDest,
          style: style
        }))
        .pipe(rename(reference))
        .pipe(gulp.dest(cssDest));
    })
    .pipe(gulp.dest('./fonts/'))
    .on('finish',cb);
}

function generateFonts2(cb) {
  gulp.src(['source2/*.svg'])
    .pipe(iconfont({
      fontName: fontName2,
	  normalize: true
    }))
    .on('glyphs', function (glyphs) {

      gulp.src('template/styles_template.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName2,
          fontPath: fontPath
        }))
        .pipe(rename(style2))
        .pipe(gulp.dest(cssDest));

      gulp.src('template/reference_template.html')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          cssdest: cssDest,
          style: style2
        }))
        .pipe(rename(reference2))
        .pipe(gulp.dest(cssDest));
    })
    .pipe(gulp.dest('./fonts/'))
    .on('finish',cb);
}

gulp.task('build', gulp.parallel(generateFonts, generateFonts2));

gulp.task('default', gulp.parallel(generateFonts, generateFonts2));
