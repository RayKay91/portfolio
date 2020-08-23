const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');

//Log gulp runnning...
gulp.task('msg', function () {
  return console.log('Gulp is running...');
});

//Copy HTML files to dist folder
gulp.task('copyHTML', function () {
  gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

//optimise images
gulp.task('optimiseImgs', function () {
  gulp.src('src/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
});

//minify JS

gulp.task('minify-js', function () {
  gulp.src('src/*.js').pipe(uglify()).pipe(gulp.dest('dist'));
});

//minify CSS

gulp.task('minify-css', function () {
  gulp.src('src/*.css').pipe(uglify()).pipe(gulp.dest('dist'));
});

//sass compiler
gulp.task('compile-sass', function () {
  gulp
    .src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src'));
});

gulp.task(
  'default',
  gulp.series(
    'msg',
    'copyHTML',
    'optimiseImgs',
    'minify-js',
    'compile-sass',
    'minify-css'
  )
);

gulp.task('watch', function () {
  gulp.watch('src/styles.scss').on('change', gulp.series('compile-sass'));
});
