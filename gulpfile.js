const gulp        = require('gulp');

const browserify  = require('browserify');
const babelify    = require('babelify');
const source      = require('vinyl-source-stream');
const buffer      = require('vinyl-buffer');
const uglify      = require('gulp-uglify');
const sourcemaps  = require('gulp-sourcemaps');
const livereload  = require('gulp-livereload');
const jasmine = require('gulp-jasmine');
const babel =  require("gulp-babel");
require('babel-core/register');


gulp.task('clientTest', () =>
    gulp.src('./client/spec/*.js').pipe(jasmine({
        includeStackTrace: true
    }))
);

gulp.task('build', function () {
    return browserify({entries: './client/source/index.js', debug: true})
        .transform("babelify", { presets: ["@babel/env"], sourceMaps: true })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
      //  .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./client/js'))
        .pipe(livereload());
});

gulp.task('watch', ['build'], function () {
    livereload.listen();
    gulp.watch('./client/source/*.js', ['build']);
});

gulp.task('default', ['watch']);
