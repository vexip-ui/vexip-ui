import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Badge } from '..'

describe('Badge', () => {
  it('render', () => {
    const wrapper = mount(Badge)

    expect(wrapper.classes()).toContain('vxp-badge-vars')
  })
})
