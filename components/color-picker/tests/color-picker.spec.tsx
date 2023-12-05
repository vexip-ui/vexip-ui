import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { noop } from '@vexip-ui/utils'
import { GithubB } from '@vexip-ui/icons'
import { globalIcons } from '@vexip-ui/config'
import { ColorPicker } from '..'

const icons = globalIcons.value

vi.useFakeTimers()

async function toggleMove(el: HTMLElement, value = 40) {
  const elRectMock = vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    width: value * 2,
    height: value * 2,
    right: 0,
    bottom: 0,
    toJSON: noop
  })

  const downEvent = new CustomEvent('pointerdown') as any
  downEvent.button = 0
  downEvent.clientX = 0
  downEvent.clientY = 0
  el.dispatchEvent(downEvent)
  await nextTick()

  const moveEvent = new CustomEvent('pointermove') as any
  moveEvent.clientX = value
  moveEvent.clientY = value
  document.dispatchEvent(moveEvent)
  vi.runOnlyPendingTimers()
  await nextTick()

  const upEvent = new CustomEvent('pointerup') as any
  document.dispatchEvent(upEvent)

  elRectMock.mockRestore()
}

describe('ColorPicker', () => {
  it('render', () => {
    const wrapper = mount(ColorPicker, {
      props: { visible: true }
    })

    expect(wrapper.classes()).toContain('vxp-color-picker-vars')
    expect(wrapper.classes()).toContain('vxp-input-vars')
    expect(wrapper.find('.vxp-color-picker__selector').exists()).toBe(true)
    expect(wrapper.find('.vxp-color-picker__control').exists()).toBe(true)
    expect(wrapper.find('.vxp-color-picker__popper').exists()).toBe(true)
    expect(wrapper.find('.vxp-color-picker__palette').exists()).toBe(true)
  })

  it('transfer', async () => {
    const wrapper = mount(() => <ColorPicker visible transfer></ColorPicker>)

    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-color-picker__popper').exists()).toBe(false)
    expect(document.querySelector('.vxp-color-picker__popper')).not.toBeNull()
  })

  it('toggle visible', async () => {
    const wrapper = mount(ColorPicker)
    const selector = wrapper.find('.vxp-color-picker__selector')

    expect(selector.classes()).not.toContain('vxp-color-picker__selector--focused')

    await selector.trigger('click')
    expect(selector.classes()).toContain('vxp-color-picker__selector--focused')

    await selector.trigger('click')
    expect(selector.classes()).not.toContain('vxp-color-picker__selector--focused')
  })

  it('key toggle visible', async () => {
    const wrapper = mount(ColorPicker)
    const selector = wrapper.find('.vxp-color-picker__selector')

    await nextTick()
    await wrapper.trigger('keydown', { key: 'Space' })
    expect(selector.classes()).toContain('vxp-color-picker__selector--focused')

    await wrapper.trigger('keydown', { key: 'Escape' })
    expect(selector.classes()).not.toContain('vxp-color-picker__selector--focused')
  })

  it('disabled', async () => {
    const wrapper = mount(ColorPicker)
    const selector = wrapper.find('.vxp-color-picker__selector')

    expect(selector.classes()).not.toContain('vxp-color-picker__selector--disabled')

    await wrapper.setProps({ visible: true })
    expect(selector.classes()).toContain('vxp-color-picker__selector--focused')

    await wrapper.setProps({ disabled: true })
    expect(selector.classes()).toContain('vxp-color-picker__selector--disabled')
    expect(selector.classes()).not.toContain('vxp-color-picker__selector--focused')
  })

  it('toggle event', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(ColorPicker, {
      props: { onToggle }
    })

    await wrapper.trigger('click')
    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenLastCalledWith(true)
    expect(wrapper.emitted()).toHaveProperty('update:visible')
    expect(wrapper.emitted('update:visible')![0]).toEqual([true])

    await wrapper.trigger('click')
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(onToggle).toHaveBeenLastCalledWith(false)
    expect(wrapper.emitted('update:visible')![1]).toEqual([false])

    await wrapper.setProps({ disabled: true })
    await wrapper.trigger('click')
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(wrapper.emitted('update:visible')!.length).toBe(2)
  })

  it('popper show', async () => {
    const wrapper = mount(ColorPicker)

    expect(wrapper.find('.vxp-color-picker__popper').attributes('style')).toContain(
      'display: none;'
    )

    await wrapper.trigger('click')
    expect(wrapper.find('.vxp-color-picker__popper').attributes('style') || '').not.toContain(
      'display: none;'
    )
  })

  it('popper will be removed when alive false', async () => {
    const wrapper = mount(ColorPicker, {
      props: { popperAlive: false }
    })

    expect(wrapper.find('.vxp-color-picker__popper').exists()).toBe(false)

    await wrapper.trigger('click')
    expect(wrapper.find('.vxp-color-picker__popper').exists()).toBe(true)
  })

  it('prefix', () => {
    const wrapper = mount(() => <ColorPicker prefix={GithubB}></ColorPicker>)

    expect(wrapper.find('.vxp-color-picker__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('prefix color', async () => {
    const wrapper = mount(() => <ColorPicker prefix={GithubB} prefix-color={'red'}></ColorPicker>)

    expect(wrapper.find('.vxp-color-picker__prefix').attributes('style')).toContain('color: red;')
  })

  it('prefix slot', async () => {
    const wrapper = mount(() => (
      <ColorPicker prefix={GithubB}>
        {{
          prefix: () => <span class={'prefix'}></span>
        }}
      </ColorPicker>
    ))

    expect(wrapper.find('.vxp-color-picker__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(false)
    expect(wrapper.find('.prefix').exists()).toBe(true)
  })

  it('suffix', async () => {
    const wrapper = mount(ColorPicker)

    expect(wrapper.find('.vxp-color-picker__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(icons.angleDown.icon).exists()).toBe(true)

    await wrapper.setProps({ suffix: GithubB })
    expect(wrapper.findComponent(icons.angleDown.icon).exists()).toBe(false)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('suffix color', async () => {
    const wrapper = mount(() => <ColorPicker suffix={GithubB} suffix-color={'red'}></ColorPicker>)

    expect(wrapper.find('.vxp-color-picker__suffix').attributes('style')).toContain('color: red;')
  })

  it('suffix slot', async () => {
    const wrapper = mount(() => (
      <ColorPicker suffix={GithubB}>
        {{
          suffix: () => <span class={'suffix'}></span>
        }}
      </ColorPicker>
    ))

    expect(wrapper.find('.vxp-color-picker__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(false)
    expect(wrapper.find('.suffix').exists()).toBe(true)
  })

  it('size', () => {
    const wrapper = mount(() => <ColorPicker size={'large'}></ColorPicker>)

    expect(wrapper.find('.vxp-color-picker__selector').classes()).toContain(
      'vxp-color-picker__selector--large'
    )
  })

  it('state', () => {
    ;(['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <ColorPicker state={state}></ColorPicker>)

      expect(wrapper.find('.vxp-color-picker__selector').classes()).toContain(
        `vxp-color-picker__selector--${state}`
      )
    })
  })

  it('loading', async () => {
    const wrapper = mount(ColorPicker)

    expect(wrapper.find('.vxp-color-picker__loading').exists()).toBe(false)
    expect(wrapper.findComponent(icons.loading.icon).exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.vxp-color-picker__loading').exists()).toBe(true)
    expect(wrapper.findComponent(icons.loading.icon).exists()).toBe(true)
  })

  it('loading lock', async () => {
    const wrapper = mount(ColorPicker)
    const selector = wrapper.find('.vxp-color-picker__selector')

    expect(selector.classes()).not.toContain('vxp-color-picker__selector--loading')

    await wrapper.setProps({ loading: true, loadingLock: true })
    expect(selector.classes()).toContain('vxp-color-picker__selector--loading')
  })

  it('loading icon', () => {
    const wrapper = mount(() => <ColorPicker loading loading-icon={GithubB}></ColorPicker>)

    expect(wrapper.findComponent(icons.loading.icon).exists()).toBe(false)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('select color', async () => {
    const wrapper = mount(ColorPicker)
    const selector = wrapper.find('.vxp-color-picker__selector')

    await selector.trigger('click')

    const palette = wrapper.find('.vxp-color-picker__palette')
    await toggleMove(palette.element as HTMLElement)
    expect(palette.find('.vxp-color-picker__palette-handler').attributes('style')).toContain(
      'top: 50%; left: 50%;'
    )
  })

  it('hue color', async () => {
    const wrapper = mount(ColorPicker)
    const selector = wrapper.find('.vxp-color-picker__selector')

    await selector.trigger('click')

    const hue = wrapper.find('.vxp-color-picker__hue')
    await toggleMove(hue.element as HTMLElement)
    expect(hue.find('.vxp-color-picker__hue-handler').attributes('style')).toContain('left: 50%;')
  })

  it('alpha color', async () => {
    const wrapper = mount(ColorPicker)
    const selector = wrapper.find('.vxp-color-picker__selector')

    expect(wrapper.find('.vxp-color-picker__alpha').exists()).toBe(false)

    await wrapper.setProps({ alpha: true })
    await selector.trigger('click')

    const alpha = wrapper.find('.vxp-color-picker__alpha')
    expect(alpha.exists()).toBe(true)

    await toggleMove(alpha.element as HTMLElement)
    expect(alpha.find('.vxp-color-picker__alpha-handler').attributes('style')).toContain(
      'left: 50%;'
    )
  })

  it('shortcut', async () => {
    const wrapper = mount(ColorPicker, {
      props: { visible: true, shortcut: true }
    })

    expect(wrapper.find('.vxp-color-picker__shortcuts').exists()).toBe(true)
    expect(wrapper.find('.vxp-color-picker__shortcut-item').exists()).toBe(true)

    await wrapper.setProps({
      shortcut: ['#fff', '#000']
    })
    expect(wrapper.find('.vxp-color-picker__shortcuts').exists()).toBe(true)
    expect(wrapper.findAll('.vxp-color-picker__shortcut-item').length).toEqual(2)
  })
})
