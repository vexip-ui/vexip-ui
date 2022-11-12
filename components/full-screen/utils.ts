import type { Ref } from 'vue'
import { useFullScreen } from '@vexip-ui/hooks'

export const fullScreenMaxZIndex = 2147483584

export function useBrowserFullScreen(
  rootRef: Ref<HTMLDivElement | null>,
  className: Ref<string>,
  defaultCls: string
) {
  const { enter, exit } = useFullScreen(rootRef)

  const browserEnter = () => {
    enter()
    className.value = defaultCls
  }

  const browserExit = () => {
    exit()
    className.value = ''
  }

  return {
    browserEnter,
    browserExit
  }
}
