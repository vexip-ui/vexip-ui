import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Card } from '..'

describe('Card', () => {
  it('render', () => {
    const wrapper = mount(Card)

    expect(wrapper.classes()).toContain('vxp-card-vars')
  })
})
