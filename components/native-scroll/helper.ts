interface ScrollElement {
  scrollTo(x: number, y: number): void,
  [prop: string]: any,
}

export function animateScrollTo(options: {
  el: ScrollElement,
  xFrom?: number,
  xTo?: number,
  yFrom?: number,
  yTo?: number,
  duration?: number,
  callback?: null | (() => any),
}): void {
  const { el, xFrom = 0, xTo = 0, yFrom = 0, yTo = 0, duration = 500, callback = null } = options

  if (!el) return

  const end = () => {
    typeof callback === 'function' && callback()
  }

  if (duration <= 0) {
    el.scrollTo(xTo, yTo)
    end()
    return
  }

  const xDistance = xTo - xFrom
  const yDistance = yTo - yFrom

  if (!xDistance && !yDistance) {
    end()
    return
  }

  const xStep = Math.ceil((xDistance / duration) * 16)
  const yStep = Math.ceil((yDistance / duration) * 16)

  let currentX = xFrom
  let currentY = yFrom

  const scroll = () => {
    currentX += xStep
    currentY += yStep

    if (xDistance && (xTo - currentX) / xDistance <= 0) {
      currentX = xTo
    }

    if (yDistance && (yTo - currentY) / yDistance <= 0) {
      currentY = yTo
    }

    el.scrollTo(currentX, currentY)

    if ((!xDistance || currentX === xTo) && (!yDistance || currentY === yTo)) {
      end()
    } else {
      requestAnimationFrame(scroll)
    }
  }

  scroll()
}
