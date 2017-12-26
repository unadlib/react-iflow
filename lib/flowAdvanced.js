import isPipe from '../utils/isPipe'
import pick from './pick'

export default function flowAdvanced (params, context) {
  let lastParam = params.slice(-1)[0]
  switch (params.length) {
    case 0:
      return {
        store: context.store
      }
    case 1:
      if (isPipe(lastParam)) {
        return {
          store: lastParam
        }
      } else {
        return {
          store: context.store,
          selector: pick.bind(this, params[0])
        }
      }
      return
    case 2:
      if (isPipe(lastParam)) {
        return {
          store: lastParam,
          selector: pick.bind(this, params[0])
        }
      } else {
        return {
          store: context.store,
          selector: pick.bind(this, params)
        }
      }
    default:
      if (isPipe(lastParam)){
        return {
          store: lastParam,
          selector: pick.bind(this, params.slice(0,-1))
        }
      } else {
        return {
          store: context.store,
          selector: pick.bind(this, params)
        }
      }
  }
}