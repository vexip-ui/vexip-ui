import { config } from './defaults'
import { toCamelCase } from '../utils/common'

export const size = {
  default() {
    return config[toCamelCase(this.$options.name)].size ?? 'default'
  },
  validator(value) {
    return ['small', 'default', 'large'].includes(value)
  }
}

export const transfer = {
  type: [Boolean, String],
  default() {
    return config[toCamelCase(this.$options.name)].transfer ?? false
  }
}
