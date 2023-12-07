import { describe, expect, it, vi } from 'vitest'

import { debounce, debounceFrame, debounceMinor, throttle } from '../src/performance'

vi.useFakeTimers()

describe('performance', () => {
  it('throttle', () => {
    const fn = vi.fn()
    const tfn = throttle(fn)

    tfn()
    tfn()
    tfn()
    tfn()
    tfn()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.runAllTimers()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('debounce', () => {
    const fn = vi.fn()
    const dfn = debounce(fn)

    dfn()
    dfn()
    dfn()
    dfn()
    dfn()
    expect(fn).toHaveBeenCalledTimes(0)
    vi.runAllTimers()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('debounceMinor', async () => {
    const fn = vi.fn()
    const dfn = debounceMinor(fn)

    dfn()
    dfn()
    dfn()
    expect(fn).toHaveBeenCalledTimes(0)
    await Promise.resolve()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('debounceMinor async', async () => {
    let i = 1

    const fn = vi.fn(() => new Promise<number>(resolve => setTimeout(() => resolve(i++), 1)))
    const dfn = debounceMinor(fn)

    const r1 = dfn()
    const r2 = dfn()
    expect(fn).toHaveBeenCalledTimes(0)
    expect(r1 === r2).toBe(true)
    await Promise.resolve()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(i).toBe(1)

    vi.runOnlyPendingTimers()
    const r3 = dfn()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(r2 === r3).toBe(false)

    await Promise.resolve()
    expect(fn).toHaveBeenCalledTimes(2)
    await r1
    expect(i).toBe(2)

    vi.runOnlyPendingTimers()
    await r3
    expect(i).toBe(3)
  })

  it('debounceMinor', async () => {
    const fn = vi.fn()
    const dfn = debounceFrame(fn)

    dfn()
    dfn()
    dfn()
    expect(fn).toHaveBeenCalledTimes(0)
    vi.runOnlyPendingTimers()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('debounceMinor async', async () => {
    let i = 1

    const fn = vi.fn(
      () => new Promise<number>(resolve => Promise.resolve().then(() => resolve(i++)))
    )
    const dfn = debounceFrame(fn)

    const r1 = dfn()
    const r2 = dfn()
    expect(fn).toHaveBeenCalledTimes(0)
    expect(r1 === r2).toBe(true)
    vi.runOnlyPendingTimers()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(i).toBe(1)

    await Promise.resolve()
    await r1
    expect(i).toBe(2)

    const r3 = dfn()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(r2 === r3).toBe(false)

    vi.runOnlyPendingTimers()
    expect(fn).toHaveBeenCalledTimes(2)

    vi.runOnlyPendingTimers()
    await r3
    expect(i).toBe(3)
  })
})
