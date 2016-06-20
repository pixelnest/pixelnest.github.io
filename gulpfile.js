/* jshint esversion: 6, node: true */

// -------------------------------------------------------
// Imports.
// -------------------------------------------------------

const gulp         = require('gulp')

  // SASS+CSS.
  , sass           = require('gulp-ruby-sass')
  , autoprefixer   = require('gulp-autoprefixer')
  , minifycss      = require('gulp-minify-css')

  // Utils.
  , rename         = require('gulp-rename')
  , del            = require('del')


const cp = require('child_process')
const browserSync = require('browser-sync').create()

// -------------------------------------------------------
// Constants.
// -------------------------------------------------------

const BROWSERS = [ 'last 3 versions' ]
const SASS_SRC = '_sass'

var IGNORED_FILES = [
  '!test/**/*',
  '!.gitignore',
  '!node_modules/**/*',
  '!.sass-cache/**/*',
  '!_site/**/*',
  '!.jshintrc'
]

// -------------------------------------------------------
// Tasks.
// -------------------------------------------------------

gulp.task('default', ['build:sass:prod', 'build:jekyll:prod'])

// Serve jekyll in dev mode (watch files, build and use browser sync).
gulp.task('dev', ['clean:jekyll', 'watch'], () => gulp.start('sync'))

// Serve jekyll in production.
gulp.task('prod', ['build:sass:prod'], done => {
  var env = process.env
  env.JEKYLL_ENV = "production"

  return cp.spawn('jekyll', ['serve'], { env, stdio: 'inherit' }).on('close', done)
})

// -------------------------------------------------------
// CSS.
// -------------------------------------------------------

// This task only create a non-minified CSS file, in the _site folder.
// This file will never be commited to the repository and will never conflict with git.
gulp.task('build:sass:dev', () => {
  return sass(SASS_SRC + '/pixelnest.scss', { style: 'expanded', require: 'sass-globbing' })
    .pipe(autoprefixer({ browsers: BROWSERS }))
    .pipe(gulp.dest('_site/static/css'))
    .pipe(browserSync.stream())
})

// This task creates a minified CSS file.
// Be careful: this file is checked in the repository.
// You MUST run this task to push the modification to the live server.
// This task SHOULD NOT be used in conjunction with the 'watch' task.
gulp.task('build:sass:prod', () => {
  return sass(SASS_SRC + '/pixelnest.scss', { style: 'expanded', require: 'sass-globbing' })
    .pipe(autoprefixer({ browsers: BROWSERS }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('static/css'))
})

// -------------------------------------------------------
// Jekyll.
// -------------------------------------------------------

gulp.task('clean:jekyll', done => {
  return cp.spawn('jekyll', ['clean'], { stdio: 'inherit' }).on('close', done)
})

gulp.task('build:jekyll:dev', done => {
  return cp.spawn('jekyll', ['build', '--incremental'], { stdio: 'inherit' })
           .on('close', done)
})

gulp.task('build:jekyll:prod', done => {
  // Add the production flag for jekyll.
  // We need to re-use process.env or node will throw an error.
  var env = process.env
  env.JEKYLL_ENV = "production"

  return cp.spawn('jekyll', ['build'], { env, stdio: 'inherit' })
           .on('close', done)
})

// -------------------------------------------------------
// Watch.
// -------------------------------------------------------

gulp.task('watch:sass', ['build:sass:dev'], () => {
  gulp.watch([SASS_SRC + '/**/*.scss'].concat(IGNORED_FILES), ['build:sass:dev'])
})

gulp.task('watch:html', ['build:jekyll:dev'], () => {
  gulp.watch(['**/*.html', '**/*.md', '**/*.markdown'].concat(IGNORED_FILES), ['reload'])
})

gulp.task('watch', ['watch:sass', 'watch:html'])

// -------------------------------------------------------
// Browser-Sync.
// -------------------------------------------------------

gulp.task('sync', () => {
  browserSync.init({
    server: { baseDir: '_site' },
    port: 4000,
    open: false
  })
})

gulp.task('reload', ['build:jekyll:dev'], () => {
  browserSync.reload()
})
