/* global toString */

export default function pick (selector) {
  if (typeof selector === 'function') {
    const selectResult = selector(this.store, this.props)
    return check(selectResult)
  } else if (toString.call(selector) === '[object Array]') {
    return selector.reduce((prev, currentSelector) => ({
      ...prev,
      ...pick.call(this, currentSelector)
    }), {})
  } else {
    throw new Error('params error')
  }
}

const check = (selectResult) => {
  if (toString.call(selectResult) !== '[object Object]') {
    throw new Error('selectResult error')
  }
  return selectResult
}
