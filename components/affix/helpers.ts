import { unref } from 'vue'

import type { MaybeRef } from 'vue'

let lastScroller: Window | HTMLElement | null | undefined = null

export function handleLastScroller(target: MaybeRef<HTMLElement | null | undefined>) {
  target = unref(target)

  if (lastScroller !== unref(target)) {
    if (lastScroller && lastScroller !== window && lastScroller !== document.documentElement) {
      const targetAffix = (lastScroller as HTMLElement).querySelector(
        '.vxp-affix--fixed',
      ) as HTMLElement

      if (targetAffix) {
        targetAffix.classList.remove('vxp-affix--fixed')
      }
    }

    lastScroller = target
  }
}

export function clearLastScroller(target: MaybeRef<HTMLElement | null | undefined>) {
  if (lastScroller && lastScroller === unref(target)) {
    lastScroller = null
  }
}
