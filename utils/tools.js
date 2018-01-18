import { Component } from 'react'

export function isStatelessComponent (TargetComponent) {
  return (
    typeof TargetComponent === 'function' &&
    (!TargetComponent.prototype || !TargetComponent.prototype.render) &&
    !TargetComponent.isReactClass &&
    !Component.isPrototypeOf(TargetComponent)
  )
}