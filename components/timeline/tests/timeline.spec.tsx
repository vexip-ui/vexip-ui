import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Timeline } from '..'

describe('Timeline', () => {
  it('render', () => {
    const wrapper = mount(Timeline)

    expect(wrapper.classes()).toContain('vxp-timeline-vars')
  })
})
