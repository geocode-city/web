const gulp = require("gulp");
const { series } = require("gulp");
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require("browser-sync").create();

function build() {
  return gulp
    .src('./src/*.scss')
    .pipe(sass({outputStyle: 'compact', precision: 10})
      .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(gulp.dest('./dist'))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function watch() {
  gulp.watch('./**/*.scss', build);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
      //directory: true,
      index: "./index.html"
    }
  });

  gulp.watch("./**/*.scss", build);
  gulp.watch("./*.html").on('change', browserSync.reload);
}

exports.watch = watch;
exports.build = build;
exports.default = build;
exports.serve = series(build, serve);
