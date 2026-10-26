const defaultMessage = 'This object was destroyed, do not use it anywhere'
const returnTrue = () => true

/**
 * 将一个对象销毁，销毁后的对象所有方法不可用，属性值均为 `null`
 *
 * @param object 要销毁的对象
 * @param message 销毁后，调用方法时的错误信息
 */
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
