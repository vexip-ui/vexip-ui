import { describe, it, expect, vi, test, beforeEach, afterEach } from 'vitest'
import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { CountTo } from '..'

import type { SpyInstance } from 'vitest'

describe('CountTo', () => {
  let timestamp = -16
  let rafMock: SpyInstance | undefined

  beforeEach(() => {
    rafMock = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      timestamp += 16
      cb(timestamp)
      return timestamp
    })
  })

  afterEach(() => {
    rafMock?.mockRestore()

    timestamp = -16
    rafMock = undefined
  })

  it('render', () => {
    const wrapper = mount(CountTo)

    expect(wrapper.classes()).toContain('vxp-count-to')
    expect(wrapper.classes()).toContain('vxp-count-to-vars')
    expect(wrapper.find('span').text()).toEqual('0')
  })

  it('exposed methods should be valid', async () => {
    const wrapper = mount(() => <CountTo start={0} end={100} />)
    const { start, state, pause, resume, toggle } = wrapper.findComponent(CountTo).vm

    expect(wrapper.find('.vxp-count-to').text()).toEqual('0')
    start()
    await nextTick()
    expect(wrapper.find('.vxp-count-to').text()).toMatchInlineSnapshot('"100"')
    pause()
    expect(state.paused).toBeTruthy()
    resume()
    expect(state.paused).toBeFalsy()
    toggle()
    expect(state.paused).toBeTruthy()
  })

  test('prefix & suffix & separator', async () => {
    const wrapper = mount(() => (
      <CountTo start={0} end={2020.1224} prefix={'$'} suffix={'%'} separator={','} decimals={4} />
    ))

    const vm = wrapper.findComponent(CountTo).vm

    const displayVal = vm.state.displayValue

    expect(displayVal.startsWith('$')).toBeTruthy()
    expect(displayVal.endsWith('%')).toBeTruthy()
    vm.start()
    await nextTick()
    expect(vm.state.displayValue[2]).toBe(',')
    expect(vm.state.displayValue[6]).toBe('.')
  })

  test('autoplay & appear', async () => {
    const wrapper = mount({
      setup() {
        const end = ref(2023)
        return () => (
          <div>
            <CountTo start={0} end={end.value} appear={true} autoplay={true} />
            <button onClick={() => (end.value = 2024)}></button>
          </div>
        )
      }
    })
    const vm = wrapper.findComponent(CountTo).vm
    await nextTick()
    expect(vm.state.displayValue).toBe('2023')

    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(vm.state.displayValue).toBe('2024')
  })
})
