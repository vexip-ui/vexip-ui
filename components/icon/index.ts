import _Icon, { register } from './icon'

import '@/style/icon.scss'

const Icon = _Icon as typeof _Icon & {
  register: typeof register
}

export { Icon, register }
