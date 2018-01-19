import isUnproxy from './isUnproxy'
/* global toString */

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
      const descriptor = Reflect.getOwnPropertyDescriptor(target, name)
      if (
        name === '__pipe__' ||
        Reflect.ownKeys(Symbol).map(key => Symbol[key]).includes(name) ||
        (descriptor && typeof descriptor.value === 'function')
      ) {
        return Reflect.get(target, name, receiver)
      }
      const isProxy = descriptor && typeof descriptor.value === 'object'
      const isRoot = target === this._store
      if (isRoot && !this._getterPaths[name]) {
        path = Object.create(null)
        this._getterPaths[name] = path
      }
      if (toString.call(target) === '[object Array]') {
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
        return proxy.call(this, descriptor.value, path[name])
      } else {
        return Reflect.get(target, name, receiver)
      }
    }
  })
}
