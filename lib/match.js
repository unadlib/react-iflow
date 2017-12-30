export default (updatePath, paths) => {
  return [updatePath[0], ...updatePath].reduce((prev, path) => {
    if (prev === true) return true
    if (prev === false) return false
    return (
      typeof prev[path] === 'undefined' ? false : Object.keys(prev[path]).length === 0 ? true : prev[path]
    )
  }, paths)
}