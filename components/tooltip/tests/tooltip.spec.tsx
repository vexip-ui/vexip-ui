import { afterEach, describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { Tooltip } from '..'

vi.useFakeTimers()

const TEXT = 'Text'

describe('Tooltip', () => {
  let wrapper: ReturnType<typeof createTooltip> | null

  function createTooltip() {
    return mount(Tooltip, {
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
  })

  it('hover trigger', async () => {
    wrapper = createTooltip()

    await wrapper.find('.trigger').trigger('mouseenter')
    vi.runAllTimers()
    await nextTick()
    expect(wrapper.find('.vxp-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.vxp-tooltip__popper').classes()).toContain('vxp-tooltip-vars')
    expect(wrapper.find('.tip').exists()).toBe(true)
  })
})
