import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Layout } from '..'

describe('Layout', () => {
  it('render', () => {
    const wrapper = mount(Layout)

    expect(wrapper.classes()).toContain('vxp-layout-vars')
  })
})
