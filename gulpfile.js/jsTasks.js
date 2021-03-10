const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const args = require('yargs').argv;
const paths = require('./paths');

const browserifyBundle = function (entry) {
    return browserify({
        entries: entry
    })
        .bundle()
        .pipe(source(paths.getJSEntryFile()))
        .pipe(buffer());
}
const createJSBundle = function () {
    const prod = args.prod;
    const debug = args.debug;
    return browserifyBundle(paths.getJSEntry())
        .pipe(gulpIf(debug, sourcemaps.init()))
        .pipe(gulpIf(prod, uglify()))
        .pipe(gulpIf(debug, sourcemaps.write('./')))    
        .pipe(gulp.dest(paths.getJSOutputFolder()));
}
const watchJS = function(cb) {
    const prod = args.prod;
    if(prod) {
        return cb();
    }
    gulp.watch(paths.getJSEntryFolder(), createJSBundle);
    cb();
}

module.exports = {
    createJSBundle: createJSBundle,
    watchJS: watchJS
}