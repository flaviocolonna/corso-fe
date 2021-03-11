const gulp = require('gulp');
const gulpInject = require('gulp-inject');
const paths = require('./paths');

const compileIndex = function () {
    const jsIndex = gulp.src(paths.getJSEntry());
    return gulp.src(paths.getHtmlEntry())
        .pipe(gulpInject(jsIndex, { relative: true, name: 'custom' }))
        .pipe(gulp.dest(paths.getDistFolder()));
}

module.exports = {
    compileIndex: compileIndex,
}