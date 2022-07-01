import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Upload } from '..'

describe('Upload', () => {
  it('render', () => {
    const wrapper = mount(Upload)

    expect(wrapper.classes()).toContain('vxp-upload-vars')
  })
})
