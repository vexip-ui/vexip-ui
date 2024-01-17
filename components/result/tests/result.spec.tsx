import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { globalIcons } from '@vexip-ui/config'
import { Result } from '..'

const typeIconMap = {
  primary: globalIcons.value.info.icon,
  info: globalIcons.value.info.icon,
  success: globalIcons.value.success.icon,
  warning: globalIcons.value.warning.icon,
  error: globalIcons.value.error.icon
}

const TEXT = 'Text'

describe('Result', () => {
  it('render', () => {
    const wrapper = mount(Result)
    expect(wrapper.find('.vxp-result').classes()).toContain('vxp-result-vars')
  })

  it('size', () => {
    const wrapper = mount(() => <Result size={'large'}></Result>)

    expect(wrapper.find('.vxp-result').classes()).toContain('vxp-result--large')
  })

  it('types', () => {
    ;(['primary', 'info', 'success', 'warning', 'error'] as const).forEach(type => {
      const wrapper = mount(() => <Result type={type}></Result>)
      expect(wrapper.find('.vxp-result').classes()).toContain(`vxp-result--${type}`)
      expect(wrapper.findComponent(typeIconMap[type]).exists()).toBe(true)
    })
  })

  it('title', () => {
    const wrapper = mount(() => <Result title={TEXT}></Result>)
    expect(wrapper.find('.vxp-result__title').text()).toEqual(TEXT)
  })

  it('description', () => {
    const wrapper = mount(() => <Result description={TEXT}></Result>)
    expect(wrapper.find('.vxp-result__description').text()).toEqual(TEXT)
  })

  it('slots', () => {
    const wrapper = mount(() => (
      <Result>
        {{
          description: () => TEXT,
          title: () => TEXT,
          icon: () => TEXT,
          extra: () => TEXT
        }}
      </Result>
    ))

    expect(wrapper.find('.vxp-result__description').text()).toEqual(TEXT)
    expect(wrapper.find('.vxp-result__title').text()).toEqual(TEXT)
    expect(wrapper.find('.vxp-result__icon').text()).toEqual(TEXT)
    expect(wrapper.find('.vxp-result__extra').text()).toEqual(TEXT)
  })
})
