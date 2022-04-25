import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { noop } from '@vexip-ui/utils'

/**
 * 创建一个观察了最近的上级元素 display 变化的元素 Ref
 * @param displayInit 元素初次显示后执行的回调
 * @returns 观察了 display 变化的元素 Ref
 */
export function useDisplay(displayInit = noop, element = ref<HTMLElement | null>(null)) {
  let observer: MutationObserver | null

  onMounted(() => {
    nextTick(() => {
      const hiddenParentNode = queryOutsideHiddenElement()

      if (hiddenParentNode) {
        observer = new MutationObserver(() => {
          if (hiddenParentNode.style.display !== 'none') {
            if (typeof displayInit === 'function') {
              displayInit()
            }

            observer?.disconnect()
            observer = null
          }
        })

        observer.observe(hiddenParentNode, {
          attributes: true,
          childList: true,
          characterData: true,
          attributeFilter: ['style']
        })
      } else {
        typeof displayInit === 'function' && displayInit()
      }
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  function queryOutsideHiddenElement() {
    if (element.value) {
      let parentElement = element.value.parentElement

      while (parentElement && parentElement !== document.body) {
        if (parentElement.style.display === 'none') {
          return parentElement
        }

        parentElement = parentElement.parentElement
      }
    }

    return null
  }

  return element
}
