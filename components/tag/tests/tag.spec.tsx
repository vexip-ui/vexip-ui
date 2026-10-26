import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { Tag } from '..'

const TEXT = 'Text'

describe('Tag', () => {
  it('render', () => {
    const wrapper = mount(() => <Tag>{TEXT}</Tag>)

    expect(wrapper.find('.vxp-tag').classes()).toContain('vxp-tag-vars')
    expect(wrapper.find('.vxp-tag').text()).toEqual(TEXT)
  })

  it('size', async () => {
    const wrapper = mount(Tag)

    expect(wrapper.classes()).not.toContain('vxp-tag--default')

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.classes()).toContain('vxp-tag--large')

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.classes()).toContain('vxp-tag--small')
  })

  it('type', async () => {
    ;(['primary', 'info', 'success', 'warning', 'error'] as const).forEach(type => {
      const wrapper = mount(() => <Tag type={type}></Tag>)

      expect(wrapper.find('.vxp-tag').classes()).toContain(`vxp-tag--${type}`)
    })
  })

  it('status classes', () => {
    const wrapper = mount(Tag, {
      props: {
        border: true,
        simple: true,
        circle: true,
      },
    })

    expect(wrapper.classes()).toContain('vxp-tag--border')
    expect(wrapper.classes()).toContain('vxp-tag--simple')
    expect(wrapper.classes()).toContain('vxp-tag--circle')
  })

  it('closable', async () => {
    const onClose = vi.fn()
    const wrapper = mount(Tag, {
      props: { onClose },
    })

    expect(wrapper.find('.vxp-tag__close').exists()).toBe(false)

    await wrapper.setProps({ closable: true })
    expect(wrapper.find('.vxp-tag__close').exists()).toBe(true)

    await wrapper.find('.vxp-tag__close').trigger('click')
    expect(onClose).toHaveBeenCalled()
  })

  it('disabled', async () => {
    const onClose = vi.fn()
    const wrapper = mount(Tag, {
      props: { disabled: true, closable: true, onClose },
    })

    expect(wrapper.find('.vxp-tag').classes()).toContain('vxp-tag--disabled')
    expect(wrapper.find('.vxp-tag__close').exists()).toBe(true)

    await wrapper.find('.vxp-tag__close').trigger('click')
    expect(onClose).not.toHaveBeenCalled()
  })
})
