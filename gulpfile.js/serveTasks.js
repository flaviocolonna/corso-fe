const browserSync = require('browser-sync').create();
const paths = require('./paths');

const serve = function(cb) {
    browserSync.init({
        watch: true,
        server: {
            baseDir: paths.getDistFolder()
        }
    });
    cb();
}

module.exports = serve;