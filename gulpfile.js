var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var rimraf = require('gulp-rimraf');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

const SRC_DIR = 'src';
const SRC_APP_DIR = SRC_DIR + '/app';
const SRC_ASSETS = SRC_DIR + '/assets';

const DIST_DIR = 'dist';
const DIST_APP_DIR = DIST_DIR + '/app';
const DIST_ASSETS = DIST_DIR + '/assets';

const PAGE = '/index';

gulp.task('sass', function () {
    return sass(SRC_APP_DIR + PAGE + '/index.scss')
        .pipe(gulp.dest(DIST_APP_DIR + PAGE))
        .pipe(reload({stream: true}));
});

gulp.task('html', function () {
    return gulp.src(SRC_APP_DIR + PAGE + '/index.html')
        .pipe(gulp.dest(DIST_APP_DIR + PAGE))
        .pipe(reload({stream: true}));
});

gulp.task('copy.assets', function () {
    return gulp.src(SRC_ASSETS + '/**/*')
        .pipe(gulp.dest(DIST_ASSETS))
});

gulp.task('clean', function () {
    return gulp.src(DIST_DIR, {read: false})
        .pipe(rimraf());
});

// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('serve', ['sass', 'html', 'copy.assets'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src/app/index/*.scss', ['sass']);
    gulp.watch('src/app/index/*.html', ['html']);
});