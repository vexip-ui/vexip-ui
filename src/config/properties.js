import { config } from './defaults'
import { isDefined, toCamelCase } from '../utils/common'

function getOrElse(value, defaultValue) {
  return isDefined(value) ? value : defaultValue
}

export const size = {
  default() {
    return getOrElse(config[toCamelCase(this.$options.name)].size, 'default')
  },
  validator(value) {
    return ['small', 'default', 'large'].includes(value)
  }
}

export const transfer = {
  type: [Boolean, String],
  default() {
    return getOrElse(config[toCamelCase(this.$options.name)].transfer, false)
  }
}
