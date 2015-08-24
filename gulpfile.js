// gulpfile.js

var gulp = require('gulp')
var debug = require('gulp-debug')

var jade = require('gulp-jade')
var wrap = require('gulp-wrap')
var handlebars = require('gulp-handlebars')
var concat = require('gulp-concat')
var declare = require('gulp-declare')
var del = require('del')
var mkpath = require('mkpath')
var ghpages = require('gulp-gh-pages')
var plumber = require('gulp-plumber')
var babel = require('gulp-babel')
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')

gulp.task('prepare', function () {
  mkpath('dist', function (err) {
    if (err) throw err
  })
  del([
    './dist/**/*.*'
  ])
})

gulp.task('js', function () {
  gulp.src('./src/js/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('pub', function () {
  gulp.src('./pub/*')
    .pipe(gulp.dest('dist/'))
})

gulp.task('jade', function () {
  var locals = {}
  gulp.src('./src/jade/**/*.jade')
    .pipe(jade({ locals: locals }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('scss', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'))
})

gulp.task('hbs', function () {
  gulp.src('./src/hbs/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Handlebars.templates',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('gh-pages', function () {
  gulp.src('./dist/**/*.*')
    .pipe(debug({title: 'ghpages:'}))
    .pipe(ghpages())
})

gulp.task('cleanup', function () {
  del(['./.publish'])
})

gulp.task('watcher', function () {
  gulp.watch('src/js/*.js', ['js'])
  gulp.watch('src/jade/*.jade', ['jade'])
  gulp.watch('src/hbs/*.hbs', ['hbs'])
  gulp.watch('src/scss/*.scss', ['scss'])
  gulp.watch('pub/**/*.*', ['pub'])
})

gulp.task('build', ['prepare', 'pub', 'jade', 'js', 'scss', 'hbs'])
gulp.task('watch', ['build', 'watcher'])
gulp.task('deploy', ['gh-pages'])

gulp.task('default', ['build'])
