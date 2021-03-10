const browserSync = require('browser-sync').create();
const args = require('yargs').argv;
const paths = require('./paths');

const serve = function(cb) {
    const prod = args.prod;
    const debug = args.debug;
    if(prod && !debug) {
        return cb();
    }
    browserSync.init({
        watch: true,
        server: {
            baseDir: paths.getDistFolder()
        }
    });
    cb();
}

module.exports = serve;