import { Input } from '@/components/input'
import { Masker } from '@/components/masker'

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { User } from '@vexip-ui/icons'
import { ConfigProvider } from '..'

describe('ConfigProvider', () => {
  it('render', () => {
    const wrapper = mount(() => <ConfigProvider>{'content'}</ConfigProvider>)

    expect(wrapper.text()).toEqual('content')
  })

  it('provide props', () => {
    const props = {
      input: {
        size: 'large'
      }
    }
    const wrapper = mount(() => (
      <ConfigProvider props={props}>
        <Input></Input>
      </ConfigProvider>
    ))

    expect(wrapper.find('.vxp-input').classes()).toContain('vxp-input--large')
  })

  it('provide locale', () => {
    const locale = {
      input: {
        placeholder: 'test'
      }
    }
    const wrapper = mount(() => (
      <ConfigProvider locale={locale}>
        <Input></Input>
      </ConfigProvider>
    ))

    expect(wrapper.find('input[type="text"]').attributes('placeholder')).toEqual('test')
  })

  it('provide icons', () => {
    const icons = {
      loading: User
    }
    const wrapper = mount(() => (
      <ConfigProvider icons={icons}>
        <Input loading></Input>
      </ConfigProvider>
    ))

    expect(wrapper.find('.vxp-input').findComponent(User).exists()).toBe(true)
  })

  it('provide z-index', () => {
    const zIndex = 666
    const wrapper = mount(() => (
      <ConfigProvider z-index={zIndex}>
        <Masker active></Masker>
      </ConfigProvider>
    ))

    expect(wrapper.find('.vxp-masker').attributes('style')).toContain('z-index: 666;')
  })
})
