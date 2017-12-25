import React, { Component, Children } from 'react'
import proxy from './proxy'

export default (selector) => {
  return (TargetComponent) => {
    class Species extends Component {
      static WrappedComponent = TargetComponent

      constructor (...args) {
        super(...args)
        this._getterPaths = new Set()
        this.store = proxy.call(this, this.props.store)
        this._observer = (...args) => {
          const updatePath = args.slice(1, -2).join('.')
          this._update(updatePath)
        }
        this.props.store.__pipe__.on(this._observer)
        this._update = (updatePath) => {
          // TODO isUpdate JSON Array Object etc.
          const pathStrings = Array
            .from(this._getterPaths)
            .map(value => value.join('.'))
          let isUpdate = pathStrings.includes(updatePath)
          if (!isUpdate) {
            isUpdate = pathStrings.some(
              pathString => {
                const arrayPrototypes = Reflect.ownKeys(Array.prototype).filter(i => typeof i === 'string').join('|')
                // TODO `(${arrayPrototypes})\\.length\\.constructor(?=(\\.\\d)+)`
                pathString = pathString.replace(new RegExp(
                  `\.(${arrayPrototypes})\\.length\\.constructor\\S+`
                ), '')
                return new RegExp(`^${pathString}`).test(updatePath)
              }
            )
          }
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
        console.log('render')
        return <TargetComponent {...props}/>
      }
    }

    return Species
  }
}