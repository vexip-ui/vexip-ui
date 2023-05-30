import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Captcha } from '..'

describe('Captcha', () => {
  it('render', () => {
    const wrapper = mount(Captcha)

    expect(wrapper.classes()).toContain('vxp-captcha-vars')
  })
})
