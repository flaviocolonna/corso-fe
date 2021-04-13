const gulp = require('gulp');
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

module.exports = {
    compileIndex: compileIndex,
}