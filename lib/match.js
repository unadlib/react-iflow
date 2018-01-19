export default (updatePath, paths, store) => {
  if (
    updatePath.length === 0 ||
    (
      toString.call(store) === '[object Array]' && (
        Object.keys(paths).filter(i => /\d+/.test(i)).length === 0 ||
        paths[Symbol.iterator] ||
        Object.keys(paths).some(path =>
          Reflect.ownKeys(Array.prototype).filter(i => ![
            'length',
            'push',
            'pop',
            'shift',
            'unshift',
          ].includes(i)).includes(path)
        )
      )
    )
  ) {
    return true
  }
  return [updatePath[0], ...updatePath].reduce((prev, path) => {
    if (prev === true) return true
    if (prev === false) return false
    return (
      typeof prev[path] === 'undefined' ? false : Object.keys(prev[path]).length === 0 ? true : prev[path]
    )
  }, paths)
}