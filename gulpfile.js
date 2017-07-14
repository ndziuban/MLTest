"use strict";

const gulp  = require('gulp'),
  fs = require('fs'),
  concat = require('gulp-concat'),
  nodemon = require('gulp-nodemon'),
  del = require('del'),
  sass = require('gulp-sass');

gulp.task('sass', ['delete'], function () {
  return gulp.src('./src/stylesheets/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./statics/stylesheets/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/stylesheets/**/*.scss', ['sass']);
});

gulp.task('server', function () {
    nodemon({
        script: 'bin/www',
        watch: './',
        ext: 'js css hbs',
        env: {
            'NODE_ENV': 'development'
        }
    })
});

gulp.task('copyImages', ['delete'], function () {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('statics/images'));
});

gulp.task('delete', function() {
  return del.sync(['statics']);
});

gulp.task('js:watch', function () {
    gulp.watch('./src/js/**/*.js', ['bundleJs']);
});

gulp.task('bundleJs', ['delete'], function () {
    var localFiles = './src/js/**/*';
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js', localFiles])
        .pipe(concat('generator.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('statics/js'));
});

gulp.task('build', ['delete', 'copyImages', 'bundleJs','sass']);

gulp.task('default', ['build', 'server', 'js:watch', 'sass:watch']);
