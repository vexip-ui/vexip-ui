import _Icon from './icon'
import { register } from './register'

const Icon = _Icon as typeof _Icon & {
  register: typeof register
}

export { Icon, register }
