import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Transfer } from '..'

describe('Transfer', () => {
  it('render', () => {
    const wrapper = mount(Transfer)

    expect(wrapper.classes()).toContain('vxp-transfer-vars')
  })
})
