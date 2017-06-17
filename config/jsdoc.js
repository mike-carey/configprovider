/**
 * @config jsdoc
 * @description Configurations for the documentation generation
 */

'use strict'


const path = require('path')

const OUTDIR = path.join(__dirname, "..", ".tmp", "docs")


module.exports = {
    src: [
        "config/**/*.js",
        "lib/**/*.js",
        "index.js"
    ],
    opts: {
        destination: OUTDIR
    },
    tags: {},
    templates: {},
    plugins: []
}