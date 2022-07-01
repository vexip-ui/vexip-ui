import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Drawer } from '..'

describe('Drawer', () => {
  it('render', () => {
    const wrapper = mount(Drawer)

    expect(wrapper.find('.vxp-drawer').classes()).toContain('vxp-drawer-vars')
  })
})
