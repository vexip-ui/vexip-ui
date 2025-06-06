export interface ScrollElement {
  scrollTo(x: number, y: number): void,
  [prop: string]: any
}

export function animateScrollTo(
  el: ScrollElement,
  from: number,
  to: number,
  duration: number,
  callback: unknown,
): void {
  const distance = to - from
  const step = Math.ceil((distance / duration) * 16)

  const end = () => {
    typeof callback === 'function' && callback()
  }

  if (!distance) {
    end()
    return
  }

  if (duration <= 0) {
    el.scrollTo(0, to)
    end()
    return
  }

  let current = from

  const scroll = () => {
    if (!distance) return

    current = current + step

    if ((to - current) / distance <= 0) {
      current = to
    }

    el.scrollTo(0, current)

    if (current === to) {
      end()
    } else {
      requestAnimationFrame(scroll)
    }
  }

  scroll()
}
