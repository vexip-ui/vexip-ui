import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { Alert } from '..'
import { CircleInfo, CircleCheck, CircleExclamation, CircleXmark } from '@vexip-ui/icons'

const typeIconMap = {
  info: CircleInfo,
  success: CircleCheck,
  warning: CircleExclamation,
  error: CircleXmark
}

const TEXT = 'Text'

describe('Alert', () => {
  it('render', () => {
    const wrapper = mount(() => <Alert icon>{TEXT}</Alert>)

    expect(wrapper.find('.vxp-alert').classes()).toContain('vxp-alert-vars')
    expect(wrapper.find('.vxp-alert__content').text()).toEqual(TEXT)
    expect(wrapper.find('.vxp-alert__icon').exists()).toBe(true)
    expect(wrapper.findComponent(CircleInfo).exists()).toBe(true)
  })

  it('types', () => {
    (['info', 'success', 'warning', 'error'] as const).forEach(type => {
      const wrapper = mount(() => <Alert icon type={type}></Alert>)

      expect(wrapper.find('.vxp-alert').classes()).toContain(`vxp-alert--${type}`)
      expect(wrapper.findComponent(typeIconMap[type]).exists()).toBe(true)
    })
  })

  it('title', () => {
    const wrapper = mount(() => <Alert title={TEXT}></Alert>)

    expect(wrapper.find('.vxp-alert__title').text()).toEqual(TEXT)
  })

  it('close', async () => {
    const onClose = vi.fn()
    const wrapper = mount(() => <Alert closable onClose={onClose}></Alert>)
    const close = wrapper.find('.vxp-alert__close')

    expect(close.exists()).toBe(true)

    await close.trigger('click')
    expect(onClose).toHaveBeenCalled()
  })

  it('slots', () => {
    const wrapper = mount(() => (
      <Alert closable>
        {{
          default: () => TEXT,
          title: () => TEXT,
          icon: () => TEXT,
          close: () => TEXT
        }}
      </Alert>
    ))

    expect(wrapper.find('.vxp-alert__title').text()).toEqual(TEXT)
    expect(wrapper.find('.vxp-alert__content').text()).toEqual(TEXT)
    expect(wrapper.find('.vxp-alert__icon').text()).toEqual(TEXT)
    expect(wrapper.find('.vxp-alert__close').text()).toEqual(TEXT)
  })
})
