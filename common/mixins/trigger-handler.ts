import type { Ref } from 'vue'

export function useTriggerHandler(trigger: Ref<string>, currentVisible: Ref<boolean>, delay = 250) {
  let timer: number

  function handleTriggerEnter() {
    if (trigger.value === 'hover') {
      clearTimeout(timer)

      timer = window.setTimeout(() => {
        currentVisible.value = true
      }, delay)
    }
  }

  function handleTriggerLeave() {
    if (trigger.value === 'hover') {
      clearTimeout(timer)

      timer = window.setTimeout(() => {
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
    handleTriggerClick
  }
}
