const gulp = require('gulp');
const sass = require('gulp-sass');
const rimraf = require('gulp-rimraf');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const reload = browserSync.reload;
const injectSvg = require('gulp-inject-svg');
const nunjucks = require('gulp-nunjucks');
const data = require('gulp-data');
const fs = require('fs');
const path = require('path');

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
        .pipe(data(function (file) {
            const DATA_FILE = './src/app/data/' + path.basename(file.path, '.html') + '.json';
            if (fs.existsSync(DATA_FILE)) {
                return JSON.parse(fs.readFileSync(DATA_FILE));
            } else {
                console.warn('!!__NO DATA FOR HTML: ', DATA_FILE);
            }
        }))
        .pipe(nunjucks.compile())
        .pipe(injectSvg())
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

const ASSETS_WATCH = 'assets:watch';
gulp.task(ASSETS_WATCH, function () {
    gulp.watch(SRC_ASSETS + '/**/*', [ASSETS_COPY]).on('change', reload);
});
project_watchers.push(ASSETS_WATCH);


const CLEAN = 'clean';
gulp.task(CLEAN, function () {
    return gulp.src(DIST_DIR, {read: false})
        .pipe(rimraf());
//    TODO del
});


// >>>>>>>>>>> JS >>>>>>>>>>>
const JS = 'JS';
gulp.task(JS, function () {
    return gulp.src(SRC_APP_DIR + '/js' + '/**.js')
        .pipe(gulp.dest(DIST_APP_DIR + '/js'))
});
project_builders.push(JS);

const JS_WATCH = 'JS:watch';
gulp.task(JS_WATCH, function () {
    gulp.watch('src/app/js/**.js', [JS]).on('change', reload);
});
project_watchers.push(JS_WATCH);

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
        startPath: BROWSER_OPEN_FILE,
        notify: false

    });
});

console.log('project_builders: ', project_builders);
console.log('project_watchers: ', project_watchers);
