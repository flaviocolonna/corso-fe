const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
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
    return browserifyBundle(paths.getJSEntry())
        .pipe(gulp.dest(paths.getJSOutputFolder()));
}
const watchJS = function(cb) {
    gulp.watch(paths.getJSEntryFolder(), createJSBundle);
    cb();
}

module.exports = {
    createJSBundle: createJSBundle,
    watchJS: watchJS
}