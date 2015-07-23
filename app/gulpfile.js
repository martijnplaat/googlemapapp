'use strict';

var gulp =  require('gulp'),
    webserver  = require('gulp-webserver'),         // Serve the web app
    jshint = require('gulp-jshint'),                // check JS syntax
    csslint = require('gulp-csslint'),              // check CSS syntax
    karma = require('gulp-karma'),                  // test runner
    uglify = require('gulp-uglify'),                // minify js code
    babelify = require('babelify'),                 // transpile ES6 modules into ES5 code
    browserify = require('browserify'),             // automatically bundle (concat) all dependent modules into one js file.
    buffer = require('vinyl-buffer'),               // buffer a vinyl object because otherwise uglify cannot read the files
    source = require('vinyl-source-stream'),        // converts stream object (basic node object) to a vinyl object (basic gulp object)
    minifyHtml = require('gulp-minify-html'),       // Minify HTML code
    usemin = require('gulp-usemin'),                // bundle all vendor JS code into one js file (Angular, Jquery, etc)
    del = require('del'),                           // remove './dist' build dir before every rebuild
    merge = require('merge-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename')
;

// ----------------------------------------
// General
// ----------------------------------------

gulp.task('csslint', function () {

  return gulp.src('./styles/*.css')
    .pipe(csslint({
      ids: false // allows ids to be used in CSS selectors
    }))
    .pipe(csslint.reporter());
});

gulp.task('jshint', function () {

  return gulp.src(['./scripts/*.js'])
    .pipe(jshint({ esnext: true }))
    .pipe(jshint.reporter('jshint-stylish'));
});

// ----------------------------------------
// Production
// ----------------------------------------

gulp.task('prod', ['prodpipe'], function() {

    // by setting the webserver source to ./dist we protect the real sources in ./app
    return gulp.src('../dist')
        .pipe(webserver({
            livereload: true
        }));
});


    gulp.task('prodpipe', ['copy'], function () {


        /* Single entry point to browserify: init.js
         However, Browserify 'forgets' the originial file information (like the filename of the file)
         Node 'knows' stream objects and Gulp 'knows' vinyl objects. They are not compatible with each other.
         Use vinyl-source-stream (source()) to translate stream to vinyl objects.
         */

        return browserify('./scripts/init.js')
            .bundle()// bundle all the js files collected by Browserify. You lose all file information.
            .pipe(source('init.js'))    // Since Browserify loses the filename we use vinyl-source-stream to make it a real vinyl object with a filename
            .pipe(buffer()) // vinyl objects (aka stream objects) cannot be read by Uglify because it needs complete file contents therefore we first buffer the stream
            .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
            .pipe(uglify()) // Now we can Uglify the javascript code.
            .pipe(sourcemaps.write('./'))
            .pipe(rename('bundled.js'))
            .pipe(gulp.dest('../dist/scripts'));

    });

    gulp.task('copy', ['vendorjs'], function() {
        
        var views = gulp.src(['./views/**/*'], {base: './views'})
            .pipe(gulp.dest('../dist/views'));

        return merge(views);

    });

    // Uglify and concat all bower components into one js file: scripts/vendor.js (see index.html comment: <!-- build:vendorjs scripts/vendor.js --> )
    gulp.task('vendorjs', ['vendorcss'], function () {

        return gulp.src('./*.html')
            .pipe(usemin({
                html: [minifyHtml()],
                vendorjs: [uglify()]
            }))
            .pipe(gulp.dest('../dist'));

    });

    // concat all css files into styles/styles.css (see index.html comment: <!-- build:vendorcss styles/styles.css --> )
    gulp.task('vendorcss', ['clean'], function () {

        return gulp.src('./styles/*.css')
            .pipe(usemin({
                vendorcss: [uglify()]
            }))
            .pipe(gulp.dest('../dist/styles'));

    });

    gulp.task('clean', ['jshint', 'csslint'], function (cb) {
        return del(['../dist/**/*'], { force:true }, cb);
    });

// ----------------------------------------
// Development
// ----------------------------------------

gulp.task('dev', ['devpipe', 'jshint', 'csslint', 'watch'], function() {
    return gulp.src('./')
        .pipe(webserver({
            livereload: true
        }));
});

    gulp.task('devpipe', function () {

        /* Single entry point to browserify: init.js
         However, Browserify 'forgets' the originial file information (filename)
         Node 'knows' stream objects and Gulp 'knows' vinyl objects. They are not compatible with each other.
         Use vinyl-source-stream (source()) to translate stream to vinyl objects.
         */

        return browserify('./scripts/init.js')
            .bundle()// bundle all the js files collected by Browserify. You lose all file information.
            .pipe(source('init.js'))    // Since Browserify loses the filename we use vinyl-source-stream to make it a real vinyl object with a filename
            .pipe(buffer()) // vinyl objects (aka stream objects) cannot be read by Uglify because it needs complete file contents therefore we first buffer the stream
            .pipe(rename('bundled.js'))
            .pipe(gulp.dest('./scripts'));
    });

    gulp.task('watch', function() {
        gulp.watch([
            './scripts/**/*.js',
            '!./scripts/bundled.js',
            './styles/*.css',
            './views/**/*.html'
        ], ['devpipe','jshint','csslint']);

    });

// ----------------------------------------
// Test
// ----------------------------------------

gulp.task('test', function() {
    return gulp.src('./test')
        .pipe(karma({
            configFile: 'test/karma.conf.js',
            action: 'watch'
        })).on('error', function(err) {
            this.emit('end'); //instead of erroring the stream, end it
        });
});