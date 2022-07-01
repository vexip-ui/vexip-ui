import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Menu } from '..'

describe('Menu', () => {
  it('render', () => {
    const wrapper = mount(Menu)

    expect(wrapper.classes()).toContain('vxp-menu-vars')
  })
})
