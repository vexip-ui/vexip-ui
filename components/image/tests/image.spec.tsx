import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Image } from '..'

describe('Image', () => {
  it('render', () => {
    const wrapper = mount(Image)

    expect(wrapper.classes()).toContain('vxp-image-vars')
  })
})
