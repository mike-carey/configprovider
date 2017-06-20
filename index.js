/**
 * @module configprovider
 * @description Provides configuration management
 *
 * @author Mike Carey <carey@cs.uwp.edu>
 */

'use strict'

const _ = require('underscore')
const fs = require('fs')
const path = require('path')
const debug = require('debug')('configprovider')


/**
 * Grabs a configuration file from a directory allowing overriding by environment.
 *
 * @param  {Object} options
 * @param  {String} [options.dir=config] The directory to look for configurationss
 * @param  {String} [options.env=env] The directory that will hold the environment specific configurations
 * @param  {String} [options.node_env=production] The node environment to load environment specific configurations from
 *
 * @return {*} The exports of the default configuration overridden by the configurations found in the environment specific configuration at the [filename - extension] key
 */
module.exports = function config(options) {
    if (options && typeof options == typeof String()) {
        options = {
            dir: options
        }
    }

    options = options || {}
    options.dir = options.dir || "config"
    options.env = options.env === undefined ? "env" : options.env
    options.node_env = options.node_env || process.env.NODE_ENV || "production"

    // Allow the error to be thrown since this is a programming error
    if (!fs.lstatSync(path.resolve(options.dir)).isDirectory()) {
        throw new Error(options.dir + " is not a directory.")
    }

    debug("Using %s as the config directory", options.dir)

    options.dir = path.resolve(options.dir)

    let envcache = undefined
    function env(arg) {
        if (envcache === undefined && options.env !== null) {
            let file = path.join(options.dir, options.env, options.node_env)

            envcache = {}
            try {
                debug("Checking the %s module", file)

                let _envcache = require(file)

                debug("Found a %s configuration for %s", options.env, arg)

                envcache = _envcache
            } catch (e) {
                // Rethrow if it was a bad file
                if (e.code !== 'MODULE_NOT_FOUND' || e.message.indexOf(file) === -1) {
                    throw e
                }
            }
        }

        return envcache[arg] === null ? {} : envcache[arg]
    }

    let cache = {}
    return (arg) => {
        if (cache[arg] === undefined) {
            debug("Loading config '%s'", arg)
            let merge = Object.assign({}, require(path.join(options.dir, arg)))
            cache[arg] = _.extend(merge, env(arg))
        }

        return cache[arg]
    }
}