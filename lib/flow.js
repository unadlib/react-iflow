import React, { Component, Children } from 'react'

export default (selector) => {
  return (TargetComponent) => {
    class Species extends Component {
      static WrappedComponent = TargetComponent

      constructor (...args) {
        super(...args)
        const _getterPaths = new Set()
        this._getterPaths = _getterPaths
        this.store = proxy(this.props.store, true)
        const rootStore = this.props.store

        function proxy (target, path = []) {
          return new Proxy(target, {
            get (target, name, receiver) {
              const isProxy = typeof target[name] === 'object'
              if (target === rootStore) path = []
              path.push(name)
              _getterPaths.add(path)
              if (isProxy) {
                return proxy(target[name], path)
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
          console.log(updatePath, 'updatePath')
          const isUpdate = this._getterPaths.has(updatePath)
          // if (isUpdate) {
          //   this.forceUpdate()
          // }
          this.forceUpdate()
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