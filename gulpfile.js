var browserSync = require('browser-sync');

var gulp         = require('gulp')
  , sass         = require('gulp-ruby-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , minifycss    = require('gulp-minify-css')
  , rename       = require('gulp-rename')
  , notify       = require('gulp-notify')
  , del          = require('del')
  , spawn        = require('child_process').spawn
  ;

// Inspired by https://github.com/shakyShane/jekyll-gulp-sass-browser-sync

// -------------------------------------------------------
// Tasks.
// -------------------------------------------------------

gulp.task('serve', function(done) {
  browserSync({ port: 4000, server: { baseDir: '_site' }});
});

gulp.task('watch', function (done) {
  gulp.watch('_sass/**/*.scss', ['sass']);
  return spawn('jekyll', ['build', '--watch'], { stdio: 'inherit' }).on('close', done);
});

// -------------------------------------------------------
// CSS.
// -------------------------------------------------------

gulp.task('sass', function () {
  return sass('_sass/pixelnest.scss', {
      style: 'expanded',
      require: "sass-globbing",
      onError: browserSync.notify
    })
    .pipe(autoprefixer('> 1%'))

    // Export un-minified.
    .pipe(gulp.dest('static/css'))
    .pipe(gulp.dest('_site/static/css'))

    // Send to browser-sync.
    .pipe(browserSync.reload({ stream: true }))

    // Minify…
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())

    // Export .min file.
    .pipe(gulp.dest('static/css'))
    .pipe(gulp.dest('_site/static/css'));
});

// -------------------------------------------------------
// Default.
// -------------------------------------------------------

gulp.task('default', ['serve', 'watch']);//['serve', 'watch']);
