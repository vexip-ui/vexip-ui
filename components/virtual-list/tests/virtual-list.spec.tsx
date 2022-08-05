import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { VirtualList } from '..'

describe('VirtualList', () => {
  it('render', () => {
    const wrapper = mount(VirtualList, {
      props: {
        items: Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          name: `Item ${i + 1}`
        }))
      },
      slots: {
        default: () => <li class={'item'}></li>
      }
    })

    expect(wrapper.find('.item').exists()).toBe(true)
  })
})
