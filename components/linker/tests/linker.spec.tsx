import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Linker } from '..'

describe('Linker', () => {
  it('render', () => {
    const wrapper = mount(Linker)

    expect(wrapper.classes()).toContain('vxp-linker-vars')
    expect(wrapper.attributes('target')).toEqual('_blank')
  })

  it('type', () => {
    (['primary', 'success', 'error', 'warning', 'info'] as const).forEach(type => {
      const wrapper = mount(() => <Linker type={type}></Linker>)

      expect(wrapper.find('.vxp-linker').classes()).toContain(`vxp-linker--${type}`)
    })
  })

  it('disabled', async () => {
    const wrapper = mount(Linker)

    expect(wrapper.classes()).not.toContain('vxp-linker--disabled')

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('vxp-linker--disabled')
  })

  it('underline', async () => {
    const wrapper = mount(Linker)

    expect(wrapper.classes()).not.toContain('vxp-linker--underline')

    await wrapper.setProps({ underline: true })
    expect(wrapper.classes()).toContain('vxp-linker--underline')
  })

  it('to address', () => {
    const wrapper = mount(() => <Linker to={'test'}></Linker>)

    expect(wrapper.find('.vxp-linker').attributes('href')).toEqual('test')
  })

  it('target', () => {
    const wrapper = mount(() => <Linker target={'_self'}></Linker>)

    expect(wrapper.find('.vxp-linker').attributes('target')).toEqual('_self')
  })
})
