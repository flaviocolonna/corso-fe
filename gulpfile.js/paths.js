const paths = {
    src: {
        entry: "./src"
    },
    dist: {
        entry: "./dist"
    },
    html: {
        entry: "index.html",
        output: "index.html"
    },
    js: {
        entry: "index.js",
        output: "index.js",
        base: "js"
    }
}

module.exports = {
    getSrcFolder() {
        return paths.src.entry;
    },
    getDistFolder() {
        return paths.dist.entry;
    },
    getHtmlEntry() {
        return this.getSrcFolder() + '/' + paths.html.entry;
    },
    getJSEntry() {
        return this.getSrcFolder() + '/' + paths.js.base + '/' + this.getJSEntryFile();
    },
    getJSEntryFile() {
        return paths.js.entry;
    },
    getJSOutputFolder() {
        return this.getDistFolder() + '/' + paths.js.base;
    },
    getJSEntryFolder() {
        return this.getSrcFolder() + '/' + paths.js.base;
    }
};