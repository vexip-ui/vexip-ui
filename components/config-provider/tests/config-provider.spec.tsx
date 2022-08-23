import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ConfigProvider } from '..'
import { Input } from '@/components/input'

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
})
