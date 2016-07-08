'use strict'

var get = require('lodash/get')

module.exports = function (deps, cb) {
  return {
    getDepsMap: function () {
      return deps
    },
    get: function (state) {
      return cb(Object.keys(deps).reduce(function (props, key) {
        if (typeof deps[key] === 'string' || Array.isArray(deps[key])) {
          var path = typeof deps[key] === 'string' ? deps[key].split('.') : deps[key].slice()
          props[key] = get(state, path)
        } else {
          props[key] = deps[key].get(state)
        }
        return props
      }, {}))
    },
    getByPath: function (path, state) {
      return get(state, path)
    }
  }
}
