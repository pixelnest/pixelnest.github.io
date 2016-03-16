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

// -------------------------------------------------------
// Browsers.
// -------------------------------------------------------

const BROWSERS = [ 'last 2 versions' ]

const SASS_SRC = 'src/sass'

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

    destination: 'static/static/css'
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
  var hugo = exec('hugo')
  hugo.stdout.on('data', (data) => process.stdout.write(data))
  hugo.stderr.on('data', (data) => process.stderr.write(data))
})

// -------------------------------------------------------
// Misc.
// -------------------------------------------------------

gulp.task('serve', options.default.tasks, () => {
  // Launch Jekyll.
  var hugo = exec('hugo server -w')
  hugo.stdout.on('data', (data) => process.stdout.write(data))
  hugo.stderr.on('data', (data) => process.stderr.write(data))
  hugo.on('close', (code) => console.log(`\nHugo exited.`))

  // Watchers:
  gulp.start('watch')
})
