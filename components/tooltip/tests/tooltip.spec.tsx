import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Tooltip } from '..'

describe('Tooltip', () => {
  it('render', () => {
    const wrapper = mount(Tooltip, {
      slots: {
        trigger: () => <span class={'trigger'}></span>
      }
    })

    expect(wrapper.find('.trigger').exists()).toBe(true)
  })
})
