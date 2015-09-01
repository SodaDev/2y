var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var stripDebug = require('gulp-strip-debug');
var minifyCss = require('gulp-minify-css');
var ignore = require('gulp-ignore');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var buildFolder = 'distBuild';
var distFolder = 'dist';

gulp.task('clean', function(){
   return gulp.src([buildFolder, distFolder], {
       read: false
   }).pipe(clean());
});

gulp.task('cleanAfterBuild', ['concatCss', 'concatJs'], function(){
    return gulp.src([buildFolder], {
        read: false
    }).pipe(clean());
});

gulp.task('minifyJs', ['clean'], function(){
    return gulp.src('js/**/*.js')
               .pipe(stripDebug())
               .pipe(ignore.exclude([ "**/*.min.js" ]))
               .pipe(uglify())
               .pipe(gulp.dest(buildFolder));
});

gulp.task('minifyCss', ['clean', 'copyFonts'], function(){
    return gulp.src('css/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest(buildFolder));
});

gulp.task('concatJs', ['minifyJs'], function(){
    return gulp.src(['js/angular.min.js',
                     'js/angular-ui-router.min.js',
                     'js/picturefill.min.js',
                     buildFolder + '/**/*.js'])
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest(distFolder));
});

gulp.task('concatCss', ['minifyCss'], function(){
    return gulp.src([buildFolder + '/**/*.css'])
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest(distFolder));
});

gulp.task('copyFonts', ['clean'], function(){
    return gulp.src('css/**/*.woff2')
        .pipe(gulp.dest(distFolder));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "."
        }
    });
});

gulp.task('watch', function(){
    gulp.watch(['js/**/*.js', 'css/**/*.css'],
               ['concatJs', 'concatCss'])
        .on('change', browserSync.reload);
});

gulp.task('build', [
    'concatJs',
    'concatCss',
    'watch',
    'browser-sync'
]);


