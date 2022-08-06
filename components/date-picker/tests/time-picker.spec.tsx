import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TimePicker } from '@/components/time-picker'

describe('TimePicker', () => {
  it('render', () => {
    const wrapper = mount(TimePicker)

    expect(wrapper.classes()).toContain('vxp-time-picker-vars')
  })
})
