/**
 * @module configprovider
 * @description Provides configuration management
 *
 * @author Mike Carey <carey@cs.uwp.edu>
 */

'use strict'


/**
 * Grabs a configuration file from a directory allowing overriding by environment.
 *
 * @param  {Object} options
 * @param  {String} [options.dir=config] The directory to look for configurationss
 * @param  {String} [options.env=env] The directory that will hold the environment specific configurations
 * @param  {String} [options.node_env=development] The node environment to load environment specific configurations from
 *
 * @return {*} The exports of the default configuration overridden by the configurations found in the environment specific configuration at the [filename - extension] key
 */
module.exports = function config(options) {
    throw new Error("Not implmented yet")
}