export default function proxy (target, path = []) {
  return new Proxy(target, {
    get: (target, name, receiver) => {
      const isProxy = typeof target[name] === 'object'
      if (target === this.props.store) path = []
      path.push(name)
      this._getterPaths.add(path)
      if (isProxy) {
        return proxy.call(this, target[name], path)
      } else {
        return Reflect.get(target, name, receiver)
      }
    }
  })
}
