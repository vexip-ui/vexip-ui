import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Form } from '..'

describe('Form', () => {
  it('render', () => {
    const wrapper = mount(Form)

    expect(wrapper.classes()).toContain('vxp-form-vars')
  })
})
