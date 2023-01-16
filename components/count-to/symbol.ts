export type CountToTimingName = 'linear' | 'easeOut'
export type CountToTiming = (
  progress: number,
  localStart: number,
  end: number,
  duration: number
) => number

export const countToEasingFn: Record<CountToTimingName, CountToTiming> = {
  easeOut: (progress, localStart, end, duration) =>
    (end * (-Math.pow(2, (-10 * progress) / duration) + 1) * 1024) / 1023 + localStart,

  linear: (progress, localStart, end, duration) => {
    const percent = Math.min(progress / duration, 1)

    return percent * end
  }
}
