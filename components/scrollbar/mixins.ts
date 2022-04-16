import { ref } from 'vue'
import { noop } from '@/common/utils/common'
import { throttle } from '@/common/utils/performance'
import { ScrollbarType } from './symbol'

import type { Ref } from 'vue'

export function useTrack({
  currentScroll = ref(0),
  trackSpeed = ref(2),
  track = ref(null),
  bar = ref(null),
  tracking = ref(false),
  type = ref(ScrollbarType.VERTICAL),
  barLength = ref(35),
  disabled = ref(false),
  handleDown = noop,
  handleMove = noop,
  handleUp = noop,
  handleScroll = noop
}: {
  currentScroll: Ref<number>,
  type: Ref<ScrollbarType>,
  trackSpeed?: Ref<number>,
  track?: Ref<HTMLElement | null>,
  bar?: Ref<HTMLElement | null>,
  tracking?: Ref<boolean>,
  barLength?: Ref<number>,
  disabled?: Ref<boolean>,
  handleDown?: (scroll: number) => void,
  handleMove?: (scroll: number) => void,
  handleUp?: (scroll: number) => void,
  handleScroll?: (scroll: number) => void
}) {
  let length: number
  let startAt: number
  let cursorAt: number
  let targetScroll: number
  let forward = true
  let processing = false

  function animateMoveBar() {
    if (!tracking.value) return

    processing = true

    const speedRate = computeSpeedRate(targetScroll, currentScroll.value)
    let changed = false

    if (forward) {
      if (currentScroll.value < targetScroll) {
        currentScroll.value += speedRate * trackSpeed.value
        changed = true
      }
    } else if (currentScroll.value > targetScroll) {
      currentScroll.value -= speedRate * trackSpeed.value
      changed = true
    }

    if (changed) {
      verifyScroll()
      handleScroll(currentScroll.value)
    }

    if (
      tracking.value && forward
        ? currentScroll.value < targetScroll
        : currentScroll.value > targetScroll
    ) {
      requestAnimationFrame(animateMoveBar)
    } else {
      processing = false
    }
  }

  function handleMouseDown(event: MouseEvent) {
    if (event.button !== 0 || disabled.value) {
      return false
    }

    event.stopPropagation()
    event.preventDefault()

    if (!track.value || !bar.value) return false

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    const rect = track.value.getBoundingClientRect()
    const barRect = bar.value.getBoundingClientRect()

    let position: number

    if (type.value === ScrollbarType.VERTICAL) {
      length = rect.height
      startAt = barRect.top - rect.top
      cursorAt = barRect.top
      position = startAt + event.clientY - cursorAt
    } else {
      length = rect.width
      startAt = barRect.left - rect.left
      cursorAt = barRect.left
      position = startAt + event.clientX - cursorAt
    }

    targetScroll = Math.max(
      0,
      Math.min((position / length / (100 - barLength.value / 2)) * 1e4, 100)
    )
    forward = targetScroll >= currentScroll.value

    tracking.value = true

    handleDown(currentScroll.value)
    animateMoveBar()
  }

  const handleTrackMove = throttle((event: MouseEvent) => {
    let position: number

    if (type.value === ScrollbarType.VERTICAL) {
      position = startAt + event.clientY - cursorAt
    } else {
      position = startAt + event.clientX - cursorAt
    }

    targetScroll = Math.max(
      0,
      Math.min((position / length / (100 - barLength.value / 2)) * 1e4, 100)
    )

    !processing && animateMoveBar()
  })

  function handleMouseMove(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    handleMove(currentScroll.value)
    handleTrackMove(event)
  }

  function handleMouseUp(event: MouseEvent) {
    event.preventDefault()

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    tracking.value = false

    handleUp(currentScroll.value)
  }

  function verifyScroll() {
    currentScroll.value = Math.max(0, Math.min(currentScroll.value, 100))
  }

  return {
    trackSpeed,
    track,
    bar,
    tracking,
    barLength,
    disabled,

    handleMouseDown
  }
}

function computeSpeedRate(start: number, end: number) {
  const span = Math.abs(start - end)

  for (let i = 0; i < 5; ++i) {
    if (span < (i + 1) * 20) {
      return 1 + 0.25 * i
    }
  }

  return 2
}
