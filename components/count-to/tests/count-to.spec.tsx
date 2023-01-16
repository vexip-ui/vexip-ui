import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
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

  it('should autoplay when mounted', async () => {
    const wrapper = mount(() => <CountTo start={0} end={100} />)

    expect(wrapper.find('.vxp-count-to').text()).toEqual('0')

    wrapper.findComponent(CountTo).vm.start()
    await nextTick()
    expect(wrapper.find('.vxp-count-to').text()).toEqual('100')
  })
})
