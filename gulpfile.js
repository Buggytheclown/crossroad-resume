var gulp = require('gulp');
var sass = require('gulp-sass');
var rimraf = require('gulp-rimraf');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var reload = browserSync.reload;

const SRC_DIR = 'src';
const SRC_APP_DIR = SRC_DIR + '/app';
const SRC_ASSETS = SRC_DIR + '/assets';

const DIST_DIR = 'dist';
const DIST_APP_DIR = DIST_DIR + '/app';
const DIST_ASSETS = DIST_DIR + '/assets';

const BROWSER_OPEN_FILE = '/app/html/index.html';

// TODO plumber

var project_builders = [];
var project_watchers = [];

// >>>>>>>>>>> SASS >>>>>>>>>>>
const SASS_BUILD = 'sass:build';
gulp.task(SASS_BUILD, function () {
    return gulp.src(SRC_APP_DIR + '/css' + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_APP_DIR + '/css'))

});
project_builders.push(SASS_BUILD);

const SASS_WATCH = 'sass:watch';
gulp.task(SASS_WATCH, function () {
    gulp.watch('src/app/css/**/*.scss', [SASS_BUILD]).on('change', reload);
});
project_watchers.push(SASS_WATCH);


// >>>>>>>>>>> HTML >>>>>>>>>>>
const HTML_BUILD = 'html:build';
gulp.task(HTML_BUILD, function () {
    return gulp.src(SRC_APP_DIR + '/html' + '/**.html')
        .pipe(gulp.dest(DIST_APP_DIR + '/html'));
});
project_builders.push(HTML_BUILD);

const HTML_WATCH = 'html:watch';
gulp.task(HTML_WATCH, function () {
    gulp.watch('src/app/html/**.html', [HTML_BUILD]).on('change', reload);
});
project_watchers.push(HTML_WATCH);


// >>>>>>>>>>> ASSETS >>>>>>>>>>>
const ASSETS_COPY = 'assets:copy';
gulp.task(ASSETS_COPY, function () {
    return gulp.src(SRC_ASSETS + '/**/*')
        .pipe(gulp.dest(DIST_ASSETS))
});
project_builders.push(ASSETS_COPY);

const CLEAN = 'clean';
gulp.task(CLEAN, function () {
    return gulp.src(DIST_DIR, {read: false})
        .pipe(rimraf());
//    TODO del
});

// >>>>>>>>>>> BULD >>>>>>>>>>>
const BUILD = 'build';
gulp.task(BUILD, project_builders);


// >>>>>>>>>>> WATCH >>>>>>>>>>>
const WATCH = 'watch';
gulp.task(WATCH, project_watchers);


// const SERVE = 'serve';
gulp.task('serve', [BUILD, WATCH], function () {
    browserSync.init({
        server: {
            baseDir: DIST_DIR
        },
        ui: false,
        startPath: BROWSER_OPEN_FILE

    });
});

console.log('project_builders: ', project_builders);
console.log('project_watchers: ', project_watchers);
