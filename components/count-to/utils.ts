import type { EasingFn } from '@/components/count-to/props'

type EaseFn = 'linear' | 'easeOut'

export const countToEasingFnUtils: Record<EaseFn, EasingFn> = {
  easeOut: (progress, localStart, end, duration) =>
    (end * (-Math.pow(2, (-10 * progress) / duration) + 1) * 1024) / 1023 + localStart,

  linear: (progress, localStart, end, duration) => {
    const percent = Math.min(progress / duration, 1)

    return percent * end
  }
}
