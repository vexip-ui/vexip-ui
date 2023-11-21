import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'

import { watchPauseable } from '../src'

describe('utils', () => {
  it('watchPauseable', async () => {
    const num = ref(0)
    const cb = vi.fn()
    const { active, pause, resume, stop } = watchPauseable(num, cb)

    num.value = 1
    await nextTick()
    expect(active.value).toBeTruthy()
    expect(cb).toHaveBeenCalledWith(1, 0, expect.anything())

    pause()
    num.value = 2
    await nextTick()
    expect(active.value).toBeFalsy()
    expect(cb).toHaveBeenCalledTimes(1)

    resume()
    num.value = 3
    await nextTick()
    expect(active.value).toBeTruthy()
    expect(cb).toHaveBeenCalledWith(3, 2, expect.anything())

    stop()
    num.value = 4
    await nextTick()
    expect(active.value).toBeTruthy()
    expect(cb).toHaveBeenCalledTimes(2)
  })
})
