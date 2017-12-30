import isUnproxy from './isUnproxy'
/* global toString */

// TODO Function does not have to be updated to the proxy view?
// TODO Array list for paths?
export default function proxy (target, path = Object.create(null)) {
  if (isUnproxy(target)) {
    return target
  }
  return new Proxy(target, {
    get: (target, name, receiver) => {
      if (name === '__pipe__') {
        return Reflect.get(target, name, receiver)
      }
      const isProxy = typeof target[name] === 'object'
      if (target === this._store) {
        path = Object.create(null)
        this._getterPaths.add(path)
      }
      if (toString.call(target) === '[object Array]') {
        const arrayPrototypes = Reflect.ownKeys(Array.prototype).filter(i => typeof i === 'string')
        if (!arrayPrototypes.includes(name)) {
          const isIncludes = arrayPrototypes.reduce((isIncludes, key) => isIncludes || !!path[key], false)
          if (!isIncludes) {
            if (!path[name]) {
              path[name] = Object.create(null)
            }
          } else {
            path = Object.create(null)
          }
        } else {
          path = Object.create(null)
        }
      }
      if (toString.call(target) === '[object Object]') {
        const primitivePrototypes = [...Reflect.ownKeys(Symbol).map(key => Symbol[key]), 'toJSON']
        if (!primitivePrototypes.includes(name)) {
          const isIncludes = primitivePrototypes.reduce((isIncludes, key) => isIncludes || key === name, false)
          if (!isIncludes) {
            if (!path[name]) {
              path[name] = Object.create(null)
            }
          } else {
            path = Object.create(null)
          }
        } else {
          path = Object.create(null)
        }
      }
      if (isProxy) {
        return proxy.call(this, target[name], path[name])
      } else {
        return Reflect.get(target, name, receiver)
      }
    }
  })
}
