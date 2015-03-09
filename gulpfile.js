var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var svgfallback = require('gulp-svgfallback');
var fs = require('fs');

var p2bmapping = require('./template/p2b_mapping.json');
var fontName = "baicons";

var fontPath = "fonts/";
var cssDest = "./";
var spriteDest = "./svgSprites/";
var spriteFallback = "./png/svgfallback.css";
var sprite_reference = "svg-sprite-reference.html";


var style = "baicons.css";
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

function generateSVGSprites(cb) {
  gulp.src(['source/*.svg'])
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(rename('sprites.svg'))
    .pipe(gulp.dest('./svgSprites/'))
    .on('finish', cb);
}

function generateSVGSpritesFallback(cb) {
  gulp.src(['source/*.svg'])
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgfallback())
    .pipe(gulp.dest('./svgSprites/png/'))
    .on('finish', cb);
}

function generateSVGSpritesDemo(cb) {
  var classnames = classnames|| [];
  var files = fs.readdirSync('./source/');
  for (var i in files){
    var classname = /(.*)\..*$/.exec(files[i])[1];
    classnames.push(classname);
  }

  gulp.src('template/svgsprite_reference_template.html')
    .pipe(consolidate('lodash', {
      classnames: classnames,
      spriteDest: spriteDest,
      spriteFallback: spriteFallback
    }))
    .pipe(rename(reference))
    .pipe(gulp.dest(spriteDest));
}

gulp.task('buildIconFonts', generateFonts);
gulp.task('buildSVGSpritesOnly', generateSVGSprites);
gulp.task('buildSVGSpritesFallbackOnly', generateSVGSpritesFallback);
gulp.task('buildSVGSpritesDemoOnly', generateSVGSpritesDemo);
gulp.task('buildSVGSprites',
  gulp.parallel(
    'buildSVGSpritesOnly',
    'buildSVGSpritesFallbackOnly',
    'buildSVGSpritesDemoOnly',
    function(err, stat) {
      console.log(err);
    }
  )
);

gulp.task('default', generateFonts);
