var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST_URL: 'http://119.29.186.36:8089/v1',
  PAGE_SHOW_COUNT: 5,
})
