/**
 * @module istanbul
 * @description Configurations for the coverage suite
 */

'use strict'

const path = require('path');

const COVERAGE = path.join(__dirname, "..", ".tmp", "coverage");


module.exports = {
    src: [
        "lib/*.js",
        "index.js"
    ],
    dir: COVERAGE,
    reporters: [
        "lcov",
        "json",
        "html",
        "text"
    ],
    reporterOpts: {
        dir: COVERAGE
    },
    thresholds: {
        global: 70,
        each: 80
    }
}