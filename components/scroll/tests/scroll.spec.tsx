import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Scroll } from '..'

describe('Scroll', () => {
  it('render', () => {
    const wrapper = mount(Scroll)

    expect(wrapper.classes()).toContain('vxp-scroll-vars')
  })
})
