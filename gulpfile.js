const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');

//Copy HTML files to dist folder
gulp.task('minifyHTML', function () {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

//optimise images
gulp.task('optimiseImgs', function () {
  return gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

//copy JS

gulp.task('copy-js', function () {
  return gulp.src('src/*.js').pipe(gulp.dest('dist'));
});

//minify CSS

gulp.task('minify-css', function () {
  return gulp.src('src/*.css').pipe(cleanCSS()).pipe(gulp.dest('dist'));
});

//sass compiler
gulp.task('compile-sass', function () {
  return gulp
    .src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src'));
});

gulp.task(
  'default',
  gulp.series('minifyHTML', 'optimiseImgs', 'compile-sass', 'minify-css')
);

gulp.task('watch', function () {
  gulp.watch('src/styles.scss').on('change', gulp.series('compile-sass'));
});
