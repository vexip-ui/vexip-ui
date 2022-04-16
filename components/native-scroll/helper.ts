export function animateScrollTo(options: {
  el: HTMLElement,
  xFrom?: number,
  xTo?: number,
  yFrom?: number,
  yTo?: number,
  duration?: number,
  callback?: null | (() => any)
}): void {
  const { el, xFrom = 0, xTo = 0, yFrom = 0, yTo = 0, duration = 500, callback = null } = options

  if (!el) return

  const xDistance = xTo - xFrom
  const yDistance = yTo - yFrom
  const xStep = Math.ceil((xDistance / duration) * 16)
  const yStep = Math.ceil((yDistance / duration) * 16)

  let currentX = xFrom
  let currentY = yFrom

  const scroll = () => {
    currentX += xStep
    currentY += yStep

    if ((xTo - currentX) / xDistance <= 0) {
      currentX = xTo
    }

    if ((yTo - currentY) / yDistance <= 0) {
      currentY = yTo
    }

    el.scrollTo(currentX, currentY)

    if (currentX === xTo && currentY === yTo) {
      typeof callback === 'function' && callback()
    } else {
      requestAnimationFrame(scroll)
    }
  }

  scroll()
}
