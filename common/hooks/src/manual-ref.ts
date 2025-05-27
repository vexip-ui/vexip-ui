import { customRef } from 'vue'

export function useManualRef() {
  const updateSet = new Set<() => void>()

  function manualRef<T>(value: T) {
    return customRef<T>((track, trigger) => {
      let origin = value

      const update = () => {
        if (value !== origin) {
          origin = value
          trigger()
        }
      }

      return {
        get: () => (track(), value),
        set: newValue => {
          if (newValue === value) return

          value = newValue
          updateSet.add(update)
        },
      }
    })
  }

  function triggerUpdate() {
    for (const trigger of updateSet) {
      trigger()
    }

    updateSet.clear()
  }

  return { updateSet, manualRef, triggerUpdate }
}
