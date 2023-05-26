import { computed, ref } from 'vue'

import { isClient } from '@vexip-ui/utils'
import { observeResize } from './resize'

const rtl = ref(false)
const computedRtl = computed(() => rtl.value)

const elId = '__rtl_observer__'

export function useRtl() {
  if (isClient && !document.querySelector(`#${elId}`)) {
    initObserver()
  }

  return { isRtl: computedRtl }
}

function initObserver() {
  if (!isClient) return

  const style = document.createElement('style')
  const content = `#${elId} { width: 1px } html.rtl #${elId}, html[dir='rtl'] #${elId} { width: 2px }`

  style.textContent = content
  document.head.appendChild(style)

  const observer = document.createElement('div')

  observer.id = elId
  observer.role = 'none'
  observer.style.cssText =
    'position: fixed; top -10px; left: -10px; height: 1px; visibility: hidden;'

  observeResize(observer, () => {
    if (!isClient) return

    rtl.value =
      document.documentElement.classList.contains('rtl') ||
      document.documentElement.getAttribute('dir') === 'rtl'
  })

  document.body.appendChild(observer)
}
