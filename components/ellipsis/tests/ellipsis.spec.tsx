import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { noop } from '@vexip-ui/utils'
import { Ellipsis } from '..'

vi.useFakeTimers()

const TEXT = 'Text'

describe('Ellipsis', () => {
  it('render', () => {
    const wrapper = mount(() => <Ellipsis>{TEXT}</Ellipsis>)

    expect(wrapper.text()).toEqual(TEXT)
  })

  it('render with attrs', () => {
    const wrapper = mount(() => (
      <Ellipsis class={'test'} style={{ color: 'red' }}>
        {TEXT}
      </Ellipsis>
    ))

    expect(wrapper.find('.vxp-ellipsis').classes()).toContain('test')
    expect(wrapper.find('.vxp-ellipsis').attributes('style')).toContain('color: red;')
  })

  it('tooltip visible', async () => {
    const wrapper = mount(() => <Ellipsis transfer={false}>{TEXT}</Ellipsis>)
    const rectMock = vi
      .spyOn(wrapper.find('.vxp-ellipsis').element, 'getBoundingClientRect')
      .mockImplementation(() => ({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        width: -1,
        height: 0,
        right: 0,
        bottom: 0,
        toJSON: noop,
      }))

    // expect(wrapper.findComponent(Ellipsis).vm.active).toBe(false)
    expect(wrapper.findComponent(Ellipsis).vm.visible).toBe(false)

    await wrapper.find('.vxp-ellipsis').trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    // expect(wrapper.findComponent(Ellipsis).vm.active).toBe(true)
    expect(wrapper.findComponent(Ellipsis).vm.visible).toBe(true)
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.vxp-tooltip__popper').text()).toBe(TEXT)

    await wrapper.find('.vxp-ellipsis').trigger('mouseleave')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.findComponent(Ellipsis).vm.visible).toBe(false)

    rectMock.mockRestore()
  })

  it('multiple', async () => {
    const wrapper = mount(() => <Ellipsis max-lines={2}>{TEXT}</Ellipsis>)

    expect(wrapper.find('.vxp-ellipsis').classes()).toContain('vxp-ellipsis--multiple')

    wrapper.find('.vxp-ellipsis').trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.findComponent(Ellipsis).vm.visible).toBe(false)

    Object.defineProperty(wrapper.find('.vxp-ellipsis').element, 'scrollHeight', {
      configurable: true,
      get: () => 10,
    })

    wrapper.find('.vxp-ellipsis').trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.findComponent(Ellipsis).vm.visible).toBe(true)
  })
})
