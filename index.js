'use strict'

function getByPath (path, state, forcePath) {
  var currentPath = state
  for (var x = 0; x < path.length; x++) {
    var key = path[x]
    if (forcePath && currentPath[key] === undefined) {
      var newBranch = {}
      Object.defineProperty(newBranch, '.referencePaths', {
        writable: true,
        configurable: true,
        value: [path.slice().splice(0, x + 1)]
      })
      currentPath[key] = newBranch
    }
    if (currentPath[key] === undefined) {
      return currentPath[key]
    }
    currentPath = currentPath[key]
  }
  return currentPath
}

var Computed = (function () {
  function Computed (_deps, _cb) {
    this._deps = _deps
    this._cb = _cb
  }
  Computed.prototype.getDepsMap = function () {
    return this._deps
  }
  Computed.prototype.get = function (passedState) {
    var _this = this
    return this._cb(Object.keys(this._deps).reduce(function (props, key) {
      if (typeof _this._deps[key] === 'string' || Array.isArray(_this._deps[key])) {
        var path = typeof _this._deps[key] === 'string' ? _this._deps[key].split('.') : _this._deps[key].slice()
        props[key] = Computed.getByPath(path, passedState)
      } else {
        props[key] = _this._deps[key].get(passedState)
      }
      return props
    }, {}))
  }
  Computed.getByPath = getByPath
  return Computed
}())

Object.defineProperty(exports, '__esModule', { value: true })

module.exports = function (deps, cb) {
  return new Computed(deps, cb)
}
