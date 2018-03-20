var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');


gulp.task('lint', function () {
    gulp.src(['./src/app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function () {
    return gulp.src('./public/*')
        .pipe(clean({
            force: true
        }));
});


gulp.task('minify-js', function () {
    return gulp.src(['./src/assets/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./public/'));
});

gulp.task('browserify', function () {
    return browserify('./src/app/app.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/'));
})

gulp.task('copy', ['browserify', 'scss'], function () {
    gulp.src(['./src/**/*.html', './src/**/*.css', './src/assets/images/*'])
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream())
});


gulp.task('scss', function () {
    gulp.src('./src/assets/scss/*scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/stylesheets/'))
});

gulp.task('images', function () {
    gulp.src('./src/assets/images/**')
        .pipe(gulp.dest('./public/assets/images'));
})

gulp.task('build', ['copy', 'scss', 'minify-js', 'images']);


gulp.task('browser-sync', ['build'], function () {
    browserSync.init({
        server: {
            baseDir: "./public",
            routes: {
                "/bower_components": "bower_components",
                "/node_modules": "node_modules"
            }
        }
    })
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("./src/**/*.*", ["build"]);
    gulp.watch("./public/**/*.*").on('change', browserSync.reload);
})