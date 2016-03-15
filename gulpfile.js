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


const exec = require('child_process').exec
const browserSync = require('browser-sync').create()

// -------------------------------------------------------
// Browsers.
// -------------------------------------------------------

const BROWSERS = [ 'last 2 versions' ]

const SASS_SRC = '_sass'

// -------------------------------------------------------
// Options.
// -------------------------------------------------------


var options = {
  default: {
    tasks: ['compile:sass']
  },

  sass: {
    folder: SASS_SRC,
    file:   SASS_SRC + '/pixelnest.scss',
    
    watch:  SASS_SRC + '/**/*.scss',

    config: {
      style: 'expanded',
      require: 'sass-globbing'
    },

    destination: '_site/static/css'
  },

  autoprefixer: {
    config: { browsers: BROWSERS }
  },

  rename: {
    config: { suffix: '.min' }
  }
}

// -------------------------------------------------------
// Tasks.
// -------------------------------------------------------

gulp.task('default', options.default.tasks)

// -------------------------------------------------------
// CSS.
// -------------------------------------------------------

gulp.task('compile:sass', () => {
  return sass(options.sass.file, options.sass.config)
    .pipe(autoprefixer(options.autoprefixer.config))
    .pipe(gulp.dest(options.sass.destination))

    .pipe(browserSync.stream())

    .pipe(rename(options.rename.config))
    .pipe(minifycss())
    .pipe(gulp.dest(options.sass.destination))
})

// -------------------------------------------------------
// Watch.
// -------------------------------------------------------

gulp.task('watch:sass', () => {
  gulp.watch(options.sass.watch, ['compile:sass'])
})

gulp.task('watch', ['watch:sass'])

// -------------------------------------------------------
// Build.
// -------------------------------------------------------

gulp.task('build', options.default.tasks, () => {
  exec('jekyll build')
})

// -------------------------------------------------------
// Misc.
// -------------------------------------------------------

gulp.task('serve', options.default.tasks, () => {
  // Launch Jekyll.
  var jekyll = exec('jekyll serve')
  jekyll.stdout.on('data', (data) => process.stdout.write(data))
  jekyll.stderr.on('data', (data) => process.stderr.write(data))
  jekyll.on('close', (code) => console.log(`\nJekyll exited.`))

  // Proxy on jekyll.
  browserSync.init({ proxy: 'localhost:4000' })

  // Watchers:
  gulp.start('watch')
})
