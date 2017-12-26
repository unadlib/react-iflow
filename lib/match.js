export default (options = {}, updatePath, paths) => {
  let isUpdate = options.isUpdate
  for (let index = 0; index < paths.length; index++) {
    let path = paths[index]
    let length
    let subLength
    for (let key = 0; key < updatePath.length; key++) {
      const name = updatePath[key]
      length = Object.keys(path).length
      if (path[name]) {
        subLength = Object.keys(path[name]).length
        const isSubNodeEnd = Object.keys(path[name]).length === 0
        if (isSubNodeEnd) {
          isUpdate = true
        } else {
          path = path[name]
        }
      } else {
        const isParentNodeEnd = length === 0
        if (isParentNodeEnd) {
          isUpdate = true
        }
        break
      }
      if (isUpdate) break
    }
    if (isUpdate) break
  }
  return isUpdate
}