import { getType } from '../utils/common'

export const defaults = {
  size: 'default',
  transfer: false
}

export const config = new Proxy(
  {},
  {
    get<T>(target: T, property: keyof T) {
      if (property in defaults) {
        return defaults[property as keyof typeof defaults]
      }

      return target[property] ?? defaults
    },
    set<T>(target: T, property: keyof T, value: any) {
      if (getType(value) === 'object') {
        target[property] = new Proxy(value, {
          get<T>(target: T, property: keyof T) {
            return (
              target[property] ?? defaults[property as keyof typeof defaults]
            )
          }
        })

        return true
      }

      return false
    }
  }
)
