import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Carousel } from '..'

describe('Carousel', () => {
  it('render', () => {
    const wrapper = mount(Carousel)

    expect(wrapper.classes()).toContain('vxp-carousel-vars')
  })
})
