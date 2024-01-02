import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Github, Loader2, User } from 'lucide-vue-next'
import { Switch } from '..'

describe('Switch', () => {
  it('render', () => {
    const wrapper = mount(Switch)

    expect(wrapper.classes()).toContain('vxp-switch-vars')
    expect(wrapper.find('.vxp-switch__signal').exists()).toBe(true)
    expect(wrapper.find('.vxp-switch__label').exists()).toBe(true)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('size', async () => {
    const wrapper = mount(Switch, {
      props: { size: 'large' }
    })

    expect(wrapper.classes()).toContain('vxp-switch--large')

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.classes()).toContain('vxp-switch--small')
  })

  it('toggle', async () => {
    const wrapper = mount(Switch)

    expect(wrapper.classes()).not.toContain('vxp-switch--open')

    await wrapper.find('input').trigger('change')
    expect(wrapper.classes()).toContain('vxp-switch--open')

    await wrapper.find('input').trigger('change')
    expect(wrapper.classes()).not.toContain('vxp-switch--open')
  })

  it('change event', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Switch, {
      props: { onChange }
    })

    await wrapper.find('input').trigger('change')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(true)
    expect(wrapper.emitted()).toHaveProperty('update:value')
    expect(wrapper.emitted()['update:value'][0]).toEqual([true])

    await wrapper.find('input').trigger('change')
    expect(onChange).toHaveBeenLastCalledWith(false)
    expect(wrapper.emitted()['update:value'][1]).toEqual([false])
  })

  it('disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Switch, {
      props: { onChange }
    })

    expect(wrapper.classes()).not.toContain('vxp-switch--disabled')

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('vxp-switch--disabled')

    await wrapper.find('input').trigger('change')
    expect(wrapper.classes()).not.toContain('vxp-switch--checked')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('state', () => {
    ;(['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <Switch state={state}></Switch>)

      expect(wrapper.find('.vxp-switch').classes()).toContain(`vxp-switch--${state}`)
    })
  })

  it('open/close color', async () => {
    const wrapper = mount(Switch, {
      props: {
        openColor: 'green',
        closeColor: 'red'
      }
    })

    expect(wrapper.attributes('style')).toContain('background-color: red;')

    await wrapper.setProps({ value: true })
    expect(wrapper.attributes('style')).toContain('background-color: green;')
  })

  it('loading', async () => {
    const wrapper = mount(Switch)

    expect(wrapper.classes()).not.toContain('vxp-switch--loading')
    expect(wrapper.findComponent(Loader2).exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(wrapper.classes()).toContain('vxp-switch--loading')
    expect(wrapper.findComponent(Loader2).exists()).toBe(true)
  })

  it('inner text', async () => {
    const wrapper = mount(Switch, {
      props: {
        openText: 'open',
        closeText: 'close'
      }
    })
    const label = wrapper.find('.vxp-switch__label')

    expect(label.find('.vxp-switch__close-text').exists()).toBe(true)
    expect(label.find('.vxp-switch__close-text').text()).toEqual('close')
    expect(label.find('.vxp-switch__open-text').exists()).toBe(false)

    await wrapper.setProps({ value: true })
    expect(label.find('.vxp-switch__open-text').exists()).toBe(true)
    expect(label.find('.vxp-switch__open-text').text()).toEqual('open')
    expect(label.find('.vxp-switch__close-text').exists()).toBe(false)
  })

  it('icon', async () => {
    const wrapper = mount(Switch, {
      props: {
        openIcon: Github,
        closeIcon: User
      }
    })

    expect(wrapper.findComponent(User).exists()).toBe(true)
    expect(wrapper.findComponent(Github).exists()).toBe(false)

    await wrapper.setProps({ value: true })
    expect(wrapper.findComponent(User).exists()).toBe(false)
    expect(wrapper.findComponent(Github).exists()).toBe(true)

    await wrapper.setProps({ loading: true })
    expect(wrapper.findComponent(User).exists()).toBe(false)
    expect(wrapper.findComponent(Github).exists()).toBe(false)
  })

  it('before change', async () => {
    const onBeforeChange = vi.fn()
    const wrapper = mount(Switch, {
      props: { onBeforeChange }
    })

    await wrapper.find('input').trigger('change')
    expect(onBeforeChange).toHaveBeenCalled()

    onBeforeChange.mockReturnValue(false)
    await wrapper.find('input').trigger('change')
    expect(wrapper.classes()).toContain('vxp-switch--open')

    onBeforeChange.mockImplementation(
      () =>
        new Promise(resolve => {
          nextTick(() => resolve(true))
        })
    )
    await wrapper.find('input').trigger('change')
    await nextTick()
    expect(wrapper.classes()).toContain('vxp-switch--open')
    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-switch--open')
  })
})
