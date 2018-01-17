import isUnproxy from './isUnproxy'
/* global toString */

// TODO Function does not have to be updated to the proxy view?
// TODO Map/Set list for paths?
// TODO top path repeat?
// TODO reduce proxy times
export default function proxy (target, path = Object.create(null)) {
  if (isUnproxy(target)) {
    return target
  }
  // TODO use Proxy.revocable?
  return new Proxy(target, {
    get: (target, name, receiver) => {
      if (name === '__pipe__') {
        return Reflect.get(target, name, receiver)
      }
      const descriptor = Reflect.getOwnPropertyDescriptor(target, name)
      const isProxy = descriptor && typeof descriptor.value === 'object'
      const isRoot = target === this._store
      if (isRoot && !this._getterPaths[name]) {
        path = Object.create(null)
        this._getterPaths[name] = path
      }
      if (!isRoot && toString.call(target) === '[object Array]') {
        const arrayPrototypes = [...Reflect.ownKeys(Array.prototype).filter(i => typeof i === 'string'), 'toJSON']
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
      if (!isRoot && toString.call(target) === '[object Object]') {
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
        return proxy.call(this, descriptor.value, isRoot ? path : path[name])
      } else {
        if (descriptor && typeof descriptor.value === 'function') delete path[name]
        return Reflect.get(target, name, receiver)
      }
    }
  })
}
