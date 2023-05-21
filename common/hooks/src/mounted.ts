import { nextTick, onBeforeUnmount, onMounted, readonly, ref } from 'vue'

export function useMounted(wait?: 'tick' | 'frame') {
  const isMounted = ref(false)

  const mount = () => (isMounted.value = true)

  onMounted(() => {
    if (wait === 'tick') {
      nextTick(mount)
    } else if (wait === 'frame') {
      requestAnimationFrame(mount)
    } else {
      mount()
    }
  })

  onBeforeUnmount(() => {
    isMounted.value = false
  })

  return { isMounted: readonly(isMounted) }
}
