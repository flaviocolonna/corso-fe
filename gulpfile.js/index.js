const gulp = require('gulp');
const del = require('del');
const viewTasks = require('./viewTasks');
const jsTasks = require('./jsTasks');
const paths = require('./paths');
const serve = require('./serveTasks');

const clean = function(cb) {
    del.sync(paths.getDistFolder(), { force: true });
    cb();
}
const build = gulp.series(clean, viewTasks.compileIndex, jsTasks.createJSBundle, jsTasks.watchJS, serve);

module.exports = {
    build: build,
}