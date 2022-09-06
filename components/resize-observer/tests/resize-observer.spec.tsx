import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ResizeObserver } from '..'

describe('ResizeObserver', () => {
  it('render', async () => {
    const wrapper = mount(ResizeObserver, {
      slots: {
        default: () => <div class={'test'}></div>
      }
    })

    expect(wrapper.find('.test').exists()).toBe(true)
  })
})
