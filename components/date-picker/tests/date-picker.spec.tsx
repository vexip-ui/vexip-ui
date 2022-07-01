import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { DatePicker } from '..'

describe('DatePicker', () => {
  it('render', () => {
    const wrapper = mount(DatePicker)

    expect(wrapper.classes()).toContain('vxp-date-picker-vars')
  })
})
