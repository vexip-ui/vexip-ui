import { readonly, ref } from 'vue'
import { isClient } from '@vexip-ui/utils'

const currentTarget = ref<string>()

if (isClient) {
  window.addEventListener('hashchange', updateTarget)
  updateTarget()
}

function updateTarget() {
  const hash = location.hash

  if (!hash || hash === '#') {
    currentTarget.value = ''
  } else {
    currentTarget.value = decodeURIComponent(hash.startsWith('#') ? hash.substring(1) : hash)
  }
}

export const hashTarget = readonly(currentTarget)
