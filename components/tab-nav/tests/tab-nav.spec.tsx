import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TabNav } from '..'

describe('TabNav', () => {
  it('render', () => {
    const wrapper = mount(TabNav)

    expect(wrapper.classes()).toContain('vxp-tab-nav-vars')
  })
})
