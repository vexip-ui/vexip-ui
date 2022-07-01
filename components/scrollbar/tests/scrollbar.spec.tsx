import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Scrollbar } from '..'

describe('Scrollbar', () => {
  it('render', () => {
    const wrapper = mount(Scrollbar)

    expect(wrapper.classes()).toContain('vxp-scrollbar-vars')
  })
})
