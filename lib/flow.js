import React, { Component, Children } from 'react'

export default (selector) => {
  return (TargetComponent) => {
    class Species extends Component {
      static WrappedComponent = TargetComponent

      constructor (...args) {
        super(...args)
        this._getterPaths = new Set()
        this.store = proxy.call(this, this.props.store)
        const rootStore = this.props.store

        function proxy (target, path = []) {
          return new Proxy(target, {
            get :(target, name, receiver) => {
              const isProxy = typeof target[name] === 'object'
              if (target === rootStore) path = []
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

        setTimeout(() => console.log(this._getterPaths), 1000)

        this._observer = (...args) => {
          const updatePath = args.slice(1, -2).join('.')
          this._update(updatePath)
        }
        this.props.store.__pipe__.on(this._observer)
        this._update = (updatePath) => {
          // TODO isUpdate JSON Array Object for
          const isUpdate = Array.from(this._getterPaths).map(value => value.join('.')).includes(updatePath)
          if (isUpdate) {
            this._getterPaths = new Set()
            this.forceUpdate()
          }
        }

      }

      componentWillUnmount () {
        this.prpops.store.__pipe__.off(this._observer)
      }

      render () {
        const props = {
          ...this.props,
          store: this.store,
        }
        return <TargetComponent {...props}/>
      }
    }

    return Species
  }
}