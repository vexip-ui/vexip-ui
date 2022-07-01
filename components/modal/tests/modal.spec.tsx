import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Modal } from '..'

describe('Modal', () => {
  it('render', () => {
    const wrapper = mount(Modal)

    expect(wrapper.find('.vxp-modal').classes()).toContain('vxp-modal-vars')
  })
})
