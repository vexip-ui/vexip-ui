import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Toast } from '..'

describe('Toast', () => {
  it('render', () => {
    const wrapper = mount(Toast)

    expect(wrapper.classes()).toContain('vxp-toast-vars')
  })
})
