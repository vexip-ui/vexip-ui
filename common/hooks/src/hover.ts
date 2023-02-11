import { ref } from 'vue'
import { useListener } from './listener'

import type { Ref } from 'vue'

export function useHover(wrapper: Ref<HTMLElement | null | undefined> = ref(null)) {
  const isHover = ref(false)

  useListener(wrapper, 'mouseenter', enterWrapper)
  useListener(wrapper, 'mouseleave', leaveWrapper)

  function enterWrapper() {
    isHover.value = true
  }

  function leaveWrapper() {
    isHover.value = false
  }

  return { wrapper, isHover }
}
