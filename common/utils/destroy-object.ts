const defaultMessage = 'This object was destroyed, do not use it anywhere'
const returnTrue = () => true

export function destroyObject(object: any, message = defaultMessage) {
  const throwDestroyed = () => {
    throw new Error(message)
  }

  Object.keys(object).forEach(name => {
    if (typeof object[name] === 'function') {
      object[name] = throwDestroyed.bind(object)
    } else {
      object[name] = null
    }
  })

  Object.getOwnPropertyNames(object.constructor.prototype).forEach(name => {
    if (name !== 'constructor' && typeof object[name] === 'function') {
      object[name] = throwDestroyed.bind(object)
    }
  })

  object.isDestroyed = returnTrue
}
