import { type ShallowRef } from 'vue'

let lastScroller: HTMLElement | null | undefined = null

export function handleLastScroller(target: ShallowRef<HTMLElement | undefined>) {
  if (lastScroller !== target.value) {
    if (lastScroller) {
      const targetAffix = lastScroller.querySelector('.vxp-affix--fixed') as HTMLElement

      if (targetAffix) {
        const classArr = targetAffix.classList

        classArr.remove('vxp-affix--fixed')
        targetAffix.className = Array.from(classArr).join(' ')
      }
    }
    lastScroller = target.value
  }
}
