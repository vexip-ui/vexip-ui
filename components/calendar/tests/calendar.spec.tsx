import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Calendar } from '..'

describe('Calendar', () => {
  it('render', () => {
    const wrapper = mount(Calendar)

    expect(wrapper.classes()).toContain('vxp-calendar-vars')
  })
})
