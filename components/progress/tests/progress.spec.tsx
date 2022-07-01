import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Progress } from '..'

describe('Progress', () => {
  it('render', () => {
    const wrapper = mount(Progress)

    expect(wrapper.classes()).toContain('vxp-progress-vars')
  })
})
