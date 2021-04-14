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
    },
    icons: {
        base: 'icons',
        dist: 'icons',
    },
    css: {
        entry: 'index.css',
        base: 'css',
        dist: 'css',
    },
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
    },
    getIconsSrcPath: (innerPath) => {
        const baseIconsPath = `${paths.src.entry}/${paths.icons.base}`;
        return innerPath ? `${baseIconsPath}/${innerPath}` : baseIconsPath;
    },
    getCSSEntryPath: () =>
        `${paths.src.entry}/${paths.css.base}/${paths.css.entry}`,
    getCSSSrcPath: (innerPath) => {
        const baseCSSPath = `${paths.src.entry}/${paths.css.base}`;
        return innerPath ? `${baseCSSPath}/${innerPath}` : baseCSSPath;
    },
    getOutputCSSFilename: () => paths.css.entry,
    getCSSOutputPath: function () {
        return `${this.getDistFolder()}/${paths.css.dist}`;
    },
};