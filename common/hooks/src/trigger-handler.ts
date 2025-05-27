import type { Ref } from 'vue'

export function useTriggerHandler(trigger: Ref<string>, currentVisible: Ref<boolean>, delay = 100) {
  let timer: ReturnType<typeof setTimeout>

  function handleTriggerEnter() {
    if (trigger.value === 'hover') {
      clearTimeout(timer)

      timer = setTimeout(() => {
        currentVisible.value = true
      }, delay)
    }
  }

  function handleTriggerLeave() {
    if (trigger.value === 'hover') {
      clearTimeout(timer)

      timer = setTimeout(() => {
        currentVisible.value = false
      }, delay)
    }
  }

  function handleTriggerClick() {
    if (trigger.value === 'click') {
      currentVisible.value = !currentVisible.value
    }
  }

  return {
    handleTriggerEnter,
    handleTriggerLeave,
    handleTriggerClick,
  }
}
