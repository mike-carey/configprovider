/**
 * @test config
 * @desc Tests the config function
 */

'use strict'

const fs = require('fs')
const path = require('path')
const mock = require('mock-fs')

const assert = require('chai').assert

let config = require('../index')

/**
 * Configuration module
 */
describe('config', () => {
    let env = null

    let config_path = path.resolve(__dirname, "config")

    let conf_db = path.join(config_path, "database")

    let conf_env = path.join(config_path, "env", "spoof")

    function _config() {
        let args = [config_path]
        Object.keys(arguments).forEach((key) => {
            args.push(arguments[key])
        })

        return path.join.apply({}, args)
    }

    beforeEach((done) => {
        env = process.env.NODE_ENV
        process.env.NODE_ENV = undefined

        done()
    })

    afterEach((done) => {
        process.env.NODE_ENV = env
        env = null

        done()
    })

    /**
     * Error checking
     */
    describe('Bad directory option', () => {
        it('Should throw an error if no config directory exists', () => {
            mock({})

            assert.throws(() => {
                var _ = config()
            })

            mock.restore()
        })

        it('Received a bad directory', () => {
            mock({
                "config": {}
            })

            assert.throws(() => {
                var _ = config({dir: "notthere"})
            })

            mock.restore()
        })

        it('Received a file', () => {
            mock({
                "config.json": "{}"
            })

            assert.throws(() => {
                var _ = config({dir: "config.json"})
            })

            mock.restore()
        })
    })

    it('Should be a function', () => {
        mock({
            config: {}
        })

        var _ = config()
        assert.isFunction(_)

        mock.restore()
    })

    /**
     * Basic functionality test
     */
    describe('Should find a config directory', () => {
        it('Found a "default" configuration', () => {
            let foo = config({
                dir: config_path
            })('database').foo

            assert.equal(foo, "bar", "Could not get configuration for default environment")
        })
    })

    /**
     * Environment configuration
     */
    describe('Should use environment directory', () => {
        it('Finds an environment configuration', () => {
            let foo = config({
                dir: config_path,
                node_env: "spoof"
            })("database").foo

            assert.equal(foo, "baz", "Could not get configuration for 'spoof' environment")
        })

        it('Uses environment variable for enviroment directory', () => {
            process.env.NODE_ENV = 'spoof'

            let foo = config({
                dir: config_path,
                node_env: "spoof"
            })("database").foo

            assert.equal(foo, "baz", "Could not get configuration from NODE_ENV environment variable")
        })
    })

    /**
     * Should not supress an error
     */
    describe('Should not surpress errors', () => {
        it('Should throw a Syntax Error', () => {
            assert.throws(() => {
                let foo = config({
                    dir: config_path,
                    node_env: "syntax"
                })("database").foo
            })
        })

        it('Should throw an Import Error', () => {
            assert.throws(() => {
                let foo = config({
                    dir: config_path,
                    node_env: "import"
                })("database").foo
            })
        })
    })
})