const { src, dest, watch, series, parallel } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');

//Copy HTML files to dist folder
function minifyHTML() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}

//optimise images
function optimiseImgs() {
  return src('src/images/*').pipe(imagemin()).pipe(dest('dist/images'));
}

//copy JS

function copyJs() {
  return src('src/*.js').pipe(dest('dist'));
}

//minify CSS

function minifyCss() {
  return src('src/*.css').pipe(cleanCSS()).pipe(dest('dist'));
}

//sass compiler
function compileSass() {
  return src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('src'));
}

function watchTask() {
  watch('src/styles.scss', compileSass);
}


exports.build = parallel(minifyHTML, optimiseImgs, copyJs, compileSass,
  minifyCss)

exports.default = series(
  parallel(minifyHTML, optimiseImgs, copyJs, compileSass, minifyCss),
  watchTask
)

