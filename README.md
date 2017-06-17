# Config Provider
Manages configurations from package to package.

## Note
Most of the configuration modules that I looked up had configurations loaded in a single file or looked to the environment.  This is a valid and efficient methodology, but not the ideal for module-level projects.

From a personal standpoint, I have configurations that I use on a regular that I prefer to simply hard link to the directories so they meet my desired setup.

## Disclosure
Application-level configurations may want to look to the environment for the actual value.  The loaded configuration file can look to those values and default as needed.  These configurations are intended for configurations in packages that may have their environment variables overridden.  __Environment variables are still the best source of dynamic configuration values.__

## Installation
Using NPM
```
npm install configprovider
```

Using Yarn
```
yarn add configprovider
```

## Usage
The default config directory looks as follows:
```
- config/
    - env/
        - development.js
        - local.js
        - production.js
        - staging.js
        - testing.js
        - // more environment specific configurations
    - database.js
    - logging.js
    - // more default configurations
```

The configprovider module will load the default configurations and replace any overriding configurations in the environment specific configuration file.


## Options
| Key | Type | Default | Description |
| --- | --- | --- | --- |
| dir | string | config | The directory that will hold the configuration files. |
| env | string | config/env | The name of the environment directory for overrides. If `null`, the directory will not be searched (should be used for packages and importable code) |
| node_env | string | production | The NODE_ENV that should be set.  It allows a different environment to be injected. |

## Environment Configurations
Though the default configurations are a file to file basis, the environment configurations work slightly different.  The file should be an object where each key is a file corresponding to a file in the root of the config directory.

For example

`/config/database.json`
```javascript
{
    "driver": "mysql",
    "host": "localhost",
    "port": "3306",
    "name": "my_db",
    "username": "root",
    "password": "root"
}
```

One can override only a few of the values via:
`/config/env/development.json`
```javascript
{
    "database": {
        "username": "vagrant",
        "password": "vagrant"
    }
}
```

The configuration passed back will look as follows:

```javascript
let config = require('configprovider')()

let db = config('database')
// {
//   "driver": "mysql",
//   "host": "localhost",
//   "port": "3306",
//   "name": "my_db",
//   "username": "vagrant",
//   "password": "vagrant"
// }
```


## Alternative module
The following are a list of other configuration packages:
- [config](https://www.npmjs.com/package/config) Single configuration files
- [config-node](https://www.npmjs.com/package/config-node) Uses environment
- [node-config-manager](https://www.npmjs.com/package/node-config-manager) Uses environment