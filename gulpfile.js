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

gulp.task('default', ['build:sass', 'build:jekyll'])
gulp.task('serve', ['watch'], () => gulp.start('sync'))

// -------------------------------------------------------
// CSS.
// -------------------------------------------------------

gulp.task('build:sass', () => {
  return sass(SASS_SRC + '/pixelnest.scss', { style: 'expanded', require: 'sass-globbing' })
    .pipe(autoprefixer({ browsers: BROWSERS }))
    .pipe(gulp.dest('_site/static/css'))

    .pipe(browserSync.stream())

    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('_site/static/css'))
})

// -------------------------------------------------------
// Jekyll.
// -------------------------------------------------------

gulp.task('build:jekyll', (done) => {
  return cp.spawn('jekyll', ['build', '--incremental'], { stdio: 'inherit' })
           .on('close', done)
})

// -------------------------------------------------------
// Watch.
// -------------------------------------------------------

gulp.task('watch:sass', ['build:sass'], () => {
  gulp.watch([SASS_SRC + '/**/*.scss'].concat(IGNORED_FILES), ['build:sass'])
})

gulp.task('watch:html', ['build:jekyll'], () => {
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

gulp.task('reload', ['build:jekyll'], () => {
  browserSync.reload()
})
