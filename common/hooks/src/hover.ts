import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

import type { Ref } from 'vue'

export function useHover(wrapper: Ref<HTMLElement | null> = ref(null)) {
  const isHover = ref(false)

  onMounted(() => {
    nextTick(() => {
      if (wrapper.value) {
        wrapper.value.addEventListener('mouseenter', enterWrapper)
        wrapper.value.addEventListener('mouseleave', leaveWrapper)
      }
    })
  })

  onBeforeUnmount(() => {
    if (wrapper.value) {
      wrapper.value.removeEventListener('mouseenter', enterWrapper)
      wrapper.value.removeEventListener('mouseleave', leaveWrapper)
    }
  })

  function enterWrapper() {
    isHover.value = true
  }

  function leaveWrapper() {
    isHover.value = false
  }

  return { wrapper, isHover }
}
