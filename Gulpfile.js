/**
 * @module Gulpfile
 * @description The application task runner
 */

'use strict'


const path     = require('path')
const gulp     = require('gulp')
const gutil    = require('gulp-util')
const jsdoc    = require('gulp-jsdoc3')
const mocha    = require('gulp-mocha')
const eslint   = require('gulp-eslint')
const istanbul = require('gulp-istanbul')

const conf = {
    istanbul: require('./config/istanbul'),
    eslint: require('./config/eslint'),
    jsdoc: require('./config/jsdoc'),
    mocha: require('./config/mocha')
}

// Register Tasks
gulp.task('build', ['jsdocs:build'])
gulp.task('test', ['istanbul:cover'])
gulp.task('lint', ['eslint:lint'])
gulp.task('clean', ['lint'])
gulp.task('debug', [])


/**
 * Sets up istanbul for listening on mocha.
 */
gulp.task('istanbul:precover', function () {
    return gulp.src(conf.istanbul.src)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
})

/**
 * Writes the reports to the desired output directory.
 */
gulp.task('istanbul:cover', ['istanbul:precover'], function () {
    return gulp.src(conf.mocha.src)
        .pipe(mocha(conf.mocha))
        .pipe(istanbul.writeReports({dir: conf.istanbul.dir}))
        .pipe(istanbul.enforceThresholds(conf.istanbul))
})

/**
 * Runs mocha tests
 */
gulp.task('mocha:test', function () {
    return gulp.src(conf.mocha.src)
        .pipe(mocha(conf.mocha))
})

/**
 * Lints javascript files.
 */
gulp.task('eslint:lint', function () {
    return gulp.src(conf.eslint.src)
        .pipe(eslint(conf.eslint))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

/**
 * Builds javascript documentation
 */
gulp.task('jsdocs:build', function () {
    return gulp.src(conf.jsdoc.src).pipe(jsdoc(conf.jsdoc))
})


module.exports = gulp