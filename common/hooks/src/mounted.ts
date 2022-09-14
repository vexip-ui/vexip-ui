import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useMounted() {
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
  })

  onBeforeUnmount(() => {
    isMounted.value = false
  })

  return { isMounted }
}
