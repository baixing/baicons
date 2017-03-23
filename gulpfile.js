var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var gulpReplace = require('gulp-replace');

var p2bmapping = require('./template/p2b_mapping.json');
var version = require('./package.json').version.replace(/\./g, '')
var fontName = "baicons";
var fontName2 = "baicons2";
var fontMobile = "baicons-mobile"

console.log(version);

var fontPath = "fonts/";
var cssDest = "./";
var stylusDest = "./stylus";

var style = "baicons.css";
var style2 = "baicons2.css";
var p2b = "p2b.css";
var reference = "icons-reference.html";
var reference2 = "icons-reference2.html";

var mobileStyle = "baicons-mobile.css"
var mobileReference = 'icons-reference-mobile.html'

function cleanFonts(cb) {
  gulp.src(["./*.css", "./stylus/*.styl", fontPath]).pipe(clean()).on('finish', cb)
}

function generateFonts(cb) {
  gulp.src(['source/*.svg'])
    .pipe(iconfont({
      fontName: 'baicons',
      formats: ['eot', 'svg', 'ttf', 'woff']
    }))
    .on('glyphs', function (glyphs) {

      gulp.src('template/styles_template.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          fontPath: fontPath,
          version: version
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
    .pipe(rename(function(path) {
      path.basename += '-' + version
    }))
    .pipe(gulp.dest('./fonts/'))
    .on('finish',cb);
}

function generateFonts2(cb) {
  gulp.src(['source2/*.svg'])
    .pipe(iconfont({
      fontName: fontName2,
      formats: ['eot', 'svg', 'ttf', 'woff']
    }))
    .on('glyphs', function (glyphs) {

      gulp.src('template/styles_template.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName2,
          fontPath: fontPath,
          version: version
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
    .pipe(rename(function(path) {
      path.basename += '-' + version
    }))
    .pipe(gulp.dest('./fonts/'))
    .on('finish',cb);
}

function generateMobileFonts(cb) {
  gulp.src(['mobile/*.svg'])
    .pipe(iconfont({
      fontName: fontMobile,
      formats: ['eot', 'svg', 'ttf', 'woff']
    }))
    .on('glyphs', function (glyphs) {

      gulp.src('template/styles_template.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontMobile,
          fontPath: fontPath,
          version: version
        }))
        .pipe(rename(mobileStyle))
        .pipe(gulp.dest(cssDest));

      gulp.src('template/reference_template.html')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          cssdest: cssDest,
          style: mobileStyle
        }))
        .pipe(rename(mobileReference))
        .pipe(gulp.dest(cssDest));
    })
    .pipe(rename(function(path) {
      path.basename += '-' + version
    }))
    .pipe(gulp.dest('./fonts/'))
    .on('finish',cb);
}

function generateMobileStylus(cb) {
  gulp.src(cssDest + mobileStyle)
    .pipe(gulpReplace(/fonts\/(baicons-mobile-\d+\.(eot|woff|ttf|svg))/g, '//s.baixing.net/font/baicons/fonts/$1'))
    .pipe(rename(mobileStyle.replace(/\.css$/, ".styl")))
    .pipe(gulp.dest(stylusDest))
    .on('finish',cb);
}

gulp.task('build', gulp.series(cleanFonts, generateFonts, generateFonts2, generateMobileFonts, generateMobileStylus));

gulp.task('default', gulp.series('build'));
