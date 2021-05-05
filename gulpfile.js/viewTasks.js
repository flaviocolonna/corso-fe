const gulp = require('gulp');
const args = require('yargs').argv;
const gulpInject = require('gulp-inject');
const paths = require('./paths');

const compileIndex = function () {
    const jsIndex = gulp.src(paths.getJSEntry());
    const cssIndex = gulp.src(paths.getCSSEntryPath());
    return gulp.src(paths.getHtmlEntry())
        .pipe(gulpInject(cssIndex, { relative: true, name: "custom" }))
        .pipe(gulpInject(jsIndex, { relative: true, name: 'custom' }))
        .pipe(gulp.dest(paths.getDistFolder()));
}

const watchHtml = function (cb) {
    const prod = args.prod;
    if (prod) {
        return cb();
    }
    gulp.watch(paths.getHtmlEntry(), compileIndex);
    cb();
};
module.exports = {
    compileIndex: compileIndex,
    watchHtml: watchHtml,
}