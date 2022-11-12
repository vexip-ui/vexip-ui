import type { Ref } from 'vue'
import { useFullScreen } from '@vexip-ui/hooks'

export const fullScreenMaxZIndex = 2147483584

export function useBrowserFullScreen(rootRef: Ref<HTMLDivElement | null>) {
  const { enter, exit } = useFullScreen(rootRef)

  const browserEnter = () => {
    enter()
  }

  const browserExit = () => {
    exit()
  }

  return {
    browserEnter,
    browserExit
  }
}
