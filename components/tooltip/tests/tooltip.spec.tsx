import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Tooltip } from '..'

vi.useFakeTimers()

const TEXT = 'Text'

describe('Tooltip', () => {
  let wrapper: ReturnType<typeof createTooltip> | null

  function createTooltip(props: InstanceType<typeof Tooltip>['$props'] = {}) {
    return mount(Tooltip, {
      props,
      slots: {
        trigger: () => <span class={'trigger'}>{TEXT}</span>,
        default: () => <span class={'tip'}>{TEXT}</span>
      }
    })
  }

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
      wrapper = null
    }
  })

  it('render', () => {
    wrapper = createTooltip()

    expect(wrapper.find('.trigger').exists()).toBe(true)
    expect(wrapper.find('.trigger').text()).toEqual(TEXT)
  })

  it('hover trigger', async () => {
    wrapper = createTooltip()

    await wrapper.find('.trigger').trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.vxp-tooltip__popper').classes()).toContain('vxp-tooltip-vars')
    expect(wrapper.find('.tip').exists()).toBe(true)
    expect(wrapper.find('.tip').text()).toEqual(TEXT)
  })

  it('click trigger', async () => {
    wrapper = createTooltip({ trigger: 'click' })

    await wrapper.find('.trigger').trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(false)

    await wrapper.find('.trigger').trigger('click')
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.tip').exists()).toBe(true)
    expect(wrapper.find('.tip').text()).toEqual(TEXT)
  })

  it('focus trigger', async () => {
    wrapper = createTooltip({ trigger: 'focus' })

    await wrapper.find('.trigger').trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(false)

    await wrapper.find('.trigger').trigger('focus')
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.tip').exists()).toBe(true)
    expect(wrapper.find('.tip').text()).toEqual(TEXT)
  })

  it('hover-focus trigger', async () => {
    wrapper = createTooltip({ trigger: 'hover-focus' })

    await wrapper.find('.trigger').trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.tip').exists()).toBe(true)
    expect(wrapper.find('.tip').text()).toEqual(TEXT)

    await wrapper.find('.trigger').trigger('focus')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(true)

    await wrapper.find('.trigger').trigger('mouseleave')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(true)

    await wrapper.find('.trigger').trigger('blur')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(false)
  })

  it('custom trigger', async () => {
    wrapper = createTooltip({ trigger: 'custom' })

    await wrapper.find('.trigger').trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(false)

    await wrapper.setProps({ visible: true })
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.tip').exists()).toBe(true)
    expect(wrapper.find('.tip').text()).toEqual(TEXT)
  })

  it('disabled', async () => {
    wrapper = createTooltip()

    expect(wrapper.find('.trigger').exists()).toBe(true)

    await wrapper.find('.trigger').trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(false)
  })

  it('transfer', async () => {
    wrapper = createTooltip({ transfer: true })

    await wrapper.find('.trigger').trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    await nextTick()
    vi.runOnlyPendingTimers()
    await nextTick()
    await nextTick()
    vi.runAllTimers()
    await nextTick()
    expect(document.querySelector('.vxp-tooltip__popper')).not.toBeNull()
    expect(document.querySelector('.tip')).not.toBeNull()
    expect(document.querySelector('.tip')!.innerHTML).toEqual(TEXT)

    const el = document.createElement('div')
    el.setAttribute('id', 'test')
    document.body.appendChild(el)

    await wrapper.setProps({ transfer: '#test' })
    expect(el.querySelector('.vxp-tooltip__popper')).not.toBeNull()
    expect(el.querySelector('.tip')).not.toBeNull()
    expect(el.querySelector('.tip')!.innerHTML).toEqual(TEXT)
  })

  it('raw', async () => {
    wrapper = createTooltip({ visible: true })

    expect(wrapper.find('.vxp-tooltip__tip').exists()).toBe(true)

    await wrapper.setProps({ raw: true })
    expect(wrapper.find('.vxp-tooltip__tip').exists()).toBe(false)
  })

  it('tip alive', () => {
    wrapper = createTooltip({ visible: false, tipAlive: true })

    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.vxp-tooltip__popper').attributes('style')).toContain('display: none;')
  })

  it('wrapper', async () => {
    wrapper = createTooltip({ wrapper: true })

    expect(wrapper.find('.vxp-tooltip').exists()).toBe(true)
    expect(wrapper.find('.trigger').exists()).toBe(true)
    expect(wrapper.find('.trigger').text()).toEqual(TEXT)

    await wrapper.setProps({ wrapper: 'li' })
    expect(wrapper.find('.vxp-tooltip').element.tagName).toEqual('LI')
  })

  it('no hover', async () => {
    wrapper = createTooltip({ visible: true, noHover: true })

    expect(wrapper.find('.vxp-tooltip__popper').classes()).toContain(
      'vxp-tooltip__popper--no-hover'
    )
  })

  it('no arrow', async () => {
    wrapper = createTooltip({ visible: true, noArrow: true })

    expect(wrapper.find('.vxp-tooltip__popper').classes()).toContain(
      'vxp-tooltip__popper--no-arrow'
    )
  })
})
