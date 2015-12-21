/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var rename = require("gulp-rename");
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('lint', function () {
    return gulp.src('aragonite.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
});

gulp.task('min', function () {
    return gulp.src('aragonite.js')
      .pipe(uglify())
      .pipe(rename('aragonite.min.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('compress',['min'], function () {
    return gulp.src('./dist/js/aragonite.min.js')
      .pipe(gzip())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['compress'], function () {
    console.log('Build completed...');
});