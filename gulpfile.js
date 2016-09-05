'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less');

gulp.task('css', function() {
    gulp.src([
            'bower_components/semantic/dist/semantic.css',
            'src/css/*.less'
        ])
        .pipe(concat('app.less'))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest('dist/'))
});

gulp.task('js', function() {
    gulp.src([
            'src/js/app.js',
            'src/js/observer.js',
            'src/js/book.js',
            'src/js/book-item-view.js',
            'src/js/book-form.js'
        ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', function() {
    gulp.src([
            'bower_components/semantic/dist/themes/default/**/*'
        ])
        .pipe(gulp.dest('dist/themes/default/'));
});

gulp.task('watch', function() {
    gulp.watch('src/css/*.less', ['css']);
    gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', ['css', 'js', 'fonts', 'watch']);
