const gulp = require('gulp');
const del = require('del');
const viewTasks = require('./viewTasks');
const jsTasks = require('./jsTasks');
const assetsTasks = require('./assetsTasks');
const paths = require('./paths');
const serve = require('./serveTasks');

const clean = function (cb) {
    del.sync(paths.getDistFolder(), { force: true });
    cb();
}
const build = gulp.series(clean,
    assetsTasks.processIcons,
    assetsTasks.watchIcons,
    assetsTasks.processCSS,
    assetsTasks.watchCSS, viewTasks.compileIndex, viewTasks.watchHtml, jsTasks.createJSBundle, jsTasks.watchJS, serve);

module.exports = {
    build: build,
}