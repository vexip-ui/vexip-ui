import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { TimePicker } from '@/components/time-picker'
import { GithubB, ClockR, Spinner } from '@vexip-ui/icons'
import { format } from '@vexip-ui/utils'
import { mount } from '@vue/test-utils'

vi.useFakeTimers()

async function runScrollTimers() {
  vi.runAllTimers()
  await nextTick()
  vi.runAllTimers()
  await nextTick()
}

describe('TimePicker', () => {
  it('render', () => {
    const wrapper = mount(TimePicker, {
      props: { visible: true }
    })

    expect(wrapper.classes()).toContain('vxp-time-picker-vars')
    expect(wrapper.classes()).toContain('vxp-input-vars')
    expect(wrapper.find('.vxp-time-picker__selector').exists()).toBe(true)
    expect(wrapper.find('.vxp-time-picker__control').exists()).toBe(true)
    expect(wrapper.find('.vxp-time-picker__popper').exists()).toBe(true)
    expect(wrapper.find('.vxp-time-picker__panel').exists()).toBe(true)
    expect(wrapper.findAll('.vxp-time-picker__unit').length).toEqual(3)
    expect(wrapper.find('.vxp-time-picker__action').exists()).toBe(true)
    expect(wrapper.find('.vxp-time-picker__action').findAll('.vxp-button').length).toEqual(2)
  })

  it('transfer', async () => {
    const wrapper = mount(TimePicker, {
      props: { visible: true, transfer: true }
    })

    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-time-picker__popper').exists()).toBe(false)
    expect(document.querySelector('.vxp-time-picker__popper')).not.toBeNull()
  })

  it('toggle visible', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const wrapper = mount(TimePicker, {
      props: { onFocus, onBlur }
    })
    const selector = wrapper.find('.vxp-time-picker__selector')
    const units = wrapper.findAll('.vxp-time-picker__unit')

    expect(wrapper.classes()).not.toContain('vxp-time-picker--visible')
    expect(selector.classes()).not.toContain('vxp-time-picker__selector--focused')

    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('vxp-time-picker--visible')
    expect(units[0].classes()).toContain('vxp-time-picker__unit--focused')
    expect(selector.classes()).toContain('vxp-time-picker__selector--focused')
    expect(onFocus).toHaveBeenCalledTimes(1)

    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('vxp-time-picker--visible')
    expect(selector.classes()).toContain('vxp-time-picker__selector--focused')
    expect(onFocus).toHaveBeenCalledTimes(1)

    await wrapper.trigger('clickoutside')
    expect(wrapper.classes()).not.toContain('vxp-time-picker--visible')
    expect(selector.classes()).not.toContain('vxp-time-picker__selector--focused')
    expect(onBlur).toHaveBeenCalledTimes(1)

    await wrapper.trigger('click')
    let buttons = wrapper.find('.vxp-time-picker__action').findAll('.vxp-button')
    ;(buttons[0].element as HTMLButtonElement).click()
    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-time-picker--visible')
    expect(selector.classes()).toContain('vxp-time-picker__selector--focused')

    await wrapper.trigger('click')
    buttons = wrapper.find('.vxp-time-picker__action').findAll('.vxp-button')
    ;(buttons[1].element as HTMLButtonElement).click()
    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-time-picker--visible')
    expect(selector.classes()).toContain('vxp-time-picker__selector--focused')
  })

  it('key toggle visible', async () => {
    const onEnter = vi.fn()
    const onCancel = vi.fn()
    const wrapper = mount(TimePicker, {
      props: { onEnter, onCancel }
    })
    const selector = wrapper.find('.vxp-time-picker__selector')
    const input = wrapper.find('.vxp-time-picker__input')

    await selector.trigger('keydown', { key: 'Space' })
    expect(wrapper.classes()).toContain('vxp-time-picker--visible')
    expect(selector.classes()).toContain('vxp-time-picker__selector--focused')

    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.classes()).not.toContain('vxp-time-picker--visible')
    expect(selector.classes()).toContain('vxp-time-picker__selector--focused')
    expect(onCancel).toHaveBeenCalled()

    await selector.trigger('keydown', { key: 'Space' })
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.classes()).not.toContain('vxp-time-picker--visible')
    expect(selector.classes()).toContain('vxp-time-picker__selector--focused')
    expect(onEnter).toHaveBeenCalled()

    await selector.trigger('keydown', { key: 'Space' })
    await input.trigger('keydown', { key: 'Space' })
    expect(wrapper.classes()).not.toContain('vxp-time-picker--visible')
    expect(selector.classes()).toContain('vxp-time-picker__selector--focused')
  })

  it('disabled', async () => {
    const wrapper = mount(TimePicker)
    const selector = wrapper.find('.vxp-time-picker__selector')

    expect(selector.classes()).not.toContain('vxp-time-picker__selector--disabled')

    await wrapper.trigger('click')
    expect(selector.classes()).toContain('vxp-time-picker__selector--focused')

    await wrapper.setProps({ disabled: true })
    expect(selector.classes()).toContain('vxp-time-picker__selector--disabled')
    expect(selector.classes()).not.toContain('vxp-time-picker__selector--focused')
  })

  it('toggle event', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(TimePicker, {
      props: { onToggle }
    })

    await wrapper.trigger('click')
    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenLastCalledWith(true)
    expect(wrapper.emitted()).toHaveProperty('update:visible')
    expect(wrapper.emitted('update:visible')![0]).toEqual([true])

    await wrapper.trigger('clickoutside')
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(onToggle).toHaveBeenLastCalledWith(false)
    expect(wrapper.emitted('update:visible')![1]).toEqual([false])

    await wrapper.setProps({ disabled: true })
    await wrapper.trigger('click')
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(wrapper.emitted('update:visible')!.length).toBe(2)
  })

  it('value', async () => {
    const wrapper = mount(TimePicker, {
      props: { value: '09:24:47' }
    })
    const units = wrapper.findAll('.vxp-time-picker__unit')

    units.forEach(unit => {
      expect(unit.text()).toEqual('--')
    })

    await wrapper.trigger('click')
    await runScrollTimers()

    const activeWheelItems = wrapper.findAll('.vxp-wheel__item--active')

    expect(activeWheelItems.length).toEqual(3)
    expect(activeWheelItems[0].text()).toEqual('09')
    expect(activeWheelItems[1].text()).toEqual('24')
    expect(activeWheelItems[2].text()).toEqual('47')

    await wrapper.trigger('clickoutside')
    expect(units[0].text()).toEqual('09')
    expect(units[1].text()).toEqual('24')
    expect(units[2].text()).toEqual('47')
  })

  it('button text', () => {
    const wrapper = mount(() => (
      <TimePicker visible confirm-text={'OK'} cancel-text={'NO'}></TimePicker>
    ))
    const buttons = wrapper.find('.vxp-time-picker__action').findAll('.vxp-button')

    expect(buttons[0].text()).toEqual('NO')
    expect(buttons[1].text()).toEqual('OK')
  })

  it('labels', () => {
    const wrapper = mount(() => (
      <TimePicker labels={{ hour: '时', minute: '分', second: '秒' }}></TimePicker>
    ))

    expect(expect(wrapper.find('.vxp-time-picker__selector').text()).toEqual('--时:--分:--秒'))
  })

  it('filler', () => {
    const wrapper = mount(() => <TimePicker filler={'?'}></TimePicker>)

    expect(expect(wrapper.find('.vxp-time-picker__selector').text()).toEqual('??:??:??'))
  })

  it('no filler', () => {
    const wrapper = mount(() => <TimePicker value={'09:24:47'} no-filler></TimePicker>)

    expect(expect(wrapper.find('.vxp-time-picker__selector').text()).toEqual('09:24:47'))
  })

  it('separator', () => {
    const wrapper = mount(() => <TimePicker separator={'^'}></TimePicker>)

    expect(expect(wrapper.find('.vxp-time-picker__selector').text()).toEqual('--^--^--'))
  })

  it('format', () => {
    const wrapper = mount(() => (
      <TimePicker value={'09:24:47'} no-filler format={'HH:ss'}></TimePicker>
    ))
    const units = wrapper.findAll('.vxp-time-picker__unit')

    expect(units.length).toEqual(2)
    expect(units[0].text()).toEqual('09')
    expect(units[1].text()).toEqual('47')
  })

  it('prefix', () => {
    const wrapper = mount(() => <TimePicker prefix={GithubB}></TimePicker>)

    expect(wrapper.find('.vxp-time-picker__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('prefix color', async () => {
    const wrapper = mount(() => <TimePicker prefix={GithubB} prefix-color={'red'}></TimePicker>)

    expect(wrapper.find('.vxp-time-picker__prefix').attributes('style')).toContain('color: red;')
  })

  it('prefix slot', async () => {
    const wrapper = mount(() => (
      <TimePicker prefix={GithubB}>
        {{
          prefix: () => <span class={'prefix'}></span>
        }}
      </TimePicker>
    ))

    expect(wrapper.find('.vxp-time-picker__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(false)
    expect(wrapper.find('.prefix').exists()).toBe(true)
  })

  it('suffix', async () => {
    const wrapper = mount(TimePicker)

    expect(wrapper.find('.vxp-time-picker__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(ClockR).exists()).toBe(true)

    await wrapper.setProps({ suffix: GithubB })
    expect(wrapper.findComponent(ClockR).exists()).toBe(false)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('suffix color', async () => {
    const wrapper = mount(() => <TimePicker suffix={GithubB} suffix-color={'red'}></TimePicker>)

    expect(wrapper.find('.vxp-time-picker__suffix').attributes('style')).toContain('color: red;')
  })

  it('suffix slot', async () => {
    const wrapper = mount(() => (
      <TimePicker suffix={GithubB}>
        {{
          suffix: () => <span class={'suffix'}></span>
        }}
      </TimePicker>
    ))

    expect(wrapper.find('.vxp-time-picker__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(false)
    expect(wrapper.find('.suffix').exists()).toBe(true)
  })

  it('size', () => {
    const wrapper = mount(() => <TimePicker size={'large'}></TimePicker>)

    expect(wrapper.find('.vxp-time-picker__selector').classes()).toContain(
      'vxp-time-picker__selector--large'
    )
  })

  it('state', () => {
    (['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <TimePicker state={state}></TimePicker>)

      expect(wrapper.find('.vxp-time-picker__selector').classes()).toContain(
        `vxp-time-picker__selector--${state}`
      )
    })
  })

  it('loading', async () => {
    const wrapper = mount(TimePicker)

    expect(wrapper.find('.vxp-time-picker__loading').exists()).toBe(false)
    expect(wrapper.findComponent(Spinner).exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.vxp-time-picker__loading').exists()).toBe(true)
    expect(wrapper.findComponent(Spinner).exists()).toBe(true)
  })

  it('loading lock', async () => {
    const wrapper = mount(TimePicker)
    const selector = wrapper.find('.vxp-time-picker__selector')

    expect(selector.classes()).not.toContain('vxp-time-picker__selector--loading')

    await wrapper.setProps({ loading: true, loadingLock: true })
    expect(selector.classes()).toContain('vxp-time-picker__selector--loading')
  })

  it('loading icon', () => {
    const wrapper = mount(() => <TimePicker loading loading-icon={GithubB}></TimePicker>)

    expect(wrapper.findComponent(Spinner).exists()).toBe(false)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('change event', async () => {
    const date = Date.now()
    vi.setSystemTime(date)

    const onChange = vi.fn()
    const wrapper = mount(TimePicker, {
      props: { onChange }
    })

    await wrapper.trigger('click')
    await wrapper.trigger('clickoutside')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(format(date, 'HH:mm:ss'))
  })

  it('clearable', async () => {
    const onClear = vi.fn()
    const wrapper = mount(TimePicker, {
      props: {
        clearable: true,
        onClear
      }
    })
    const selector = wrapper.find('.vxp-time-picker__selector')

    expect(wrapper.find('.vxp-time-picker__clear').exists()).toBe(false)

    await selector.trigger('mouseenter')
    expect(wrapper.find('.vxp-time-picker__clear').exists()).toBe(false)

    await wrapper.trigger('click')
    await wrapper.trigger('clickoutside')
    await selector.trigger('mouseenter')
    expect(wrapper.find('.vxp-time-picker__clear').exists()).toBe(true)
    expect(wrapper.find('.vxp-time-picker__suffix').exists()).toBe(true)
    expect(wrapper.find('.vxp-time-picker__suffix').attributes('style')).toContain('opacity: 0%;')

    await wrapper.find('.vxp-time-picker__clear').trigger('click')
    await nextTick()
    expect(onClear).toHaveBeenCalled()
    expect(selector.text()).toEqual('--:--:--')
  })

  it('click unit', async () => {
    const onChangeCol = vi.fn()
    const wrapper = mount(TimePicker, {
      props: { value: '09:24:47', onChangeCol }
    })
    const selector = wrapper.find('.vxp-time-picker__selector')
    const units = wrapper.findAll('.vxp-time-picker__unit')

    await wrapper.trigger('click')
    expect(onChangeCol).toHaveBeenCalled()
    expect(onChangeCol).toHaveBeenLastCalledWith('hour', 'start')

    await wrapper.trigger('clickoutside')
    await wrapper.trigger('click')
    await units[2].trigger('click')
    expect(selector.classes()).toContain('vxp-time-picker__selector--focused')
    expect(units[2].classes()).toContain('vxp-time-picker__unit--focused')
    expect(onChangeCol).toHaveBeenLastCalledWith('second', 'start')

    await units[1].trigger('click')
    expect(selector.classes()).toContain('vxp-time-picker__selector--focused')
    expect(units[1].classes()).toContain('vxp-time-picker__unit--focused')
  })

  it('key actions', async () => {
    const onInput = vi.fn()
    const onPlus = vi.fn()
    const onMinus = vi.fn()
    const onChangeCol = vi.fn()
    const wrapper = mount(TimePicker, {
      props: {
        value: '09:24:47',
        onInput,
        onPlus,
        onMinus,
        onChangeCol
      }
    })
    const input = wrapper.find('.vxp-time-picker__input')
    const units = wrapper.findAll('.vxp-time-picker__unit')

    await wrapper.trigger('click')
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(units[0].text()).toEqual('08')
    expect(onMinus).toHaveBeenCalled()
    expect(onMinus).toHaveBeenLastCalledWith('hour', 8)

    onChangeCol.mockClear()
    await input.trigger('keydown', { key: 'Tab' })
    expect(units[1].classes()).toContain('vxp-time-picker__unit--focused')
    expect(onChangeCol).toHaveBeenCalled()
    expect(onChangeCol).toHaveBeenLastCalledWith('minute', 'start')

    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(units[1].text()).toEqual('25')
    expect(onPlus).toHaveBeenCalled()
    expect(onPlus).toHaveBeenLastCalledWith('minute', 25)

    await input.trigger('keydown', { key: 'ArrowRight' })
    expect(units[2].classes()).toContain('vxp-time-picker__unit--focused')

    await input.trigger('keydown', { key: 'ArrowRight' })
    expect(units[0].classes()).toContain('vxp-time-picker__unit--focused')

    await input.trigger('keydown', { key: 'ArrowLeft' })
    expect(units[2].classes()).toContain('vxp-time-picker__unit--focused')

    await input.trigger('keydown', { key: 'ArrowRight' })
    await input.trigger('keydown.shift', { key: 'Tab' })
    expect(units[2].classes()).toContain('vxp-time-picker__unit--focused')

    await input.trigger('keydown.ctrl', { key: 'ArrowUp' })
    expect(units[2].text()).toEqual('42')

    await input.trigger('keydown', { key: 'Digit4' })
    expect(units[2].text()).toEqual('04')
    expect(onInput).toHaveBeenCalled()
    expect(onInput).toHaveBeenLastCalledWith('second', 4)

    await input.trigger('keydown', { key: 'Numpad6' })
    expect(units[2].text()).toEqual('46')

    await input.trigger('keydown', { key: 'Digit0' })
    expect(units[2].text()).toEqual('00')

    await input.trigger('keydown', { key: 'Numpad8' })
    await input.trigger('keydown', { key: 'Numpad8' })
    expect(units[2].text()).toEqual('59')
  })

  it('steps', async () => {
    const wrapper = mount(TimePicker, {
      props: {
        value: '12:24:36',
        steps: [2, 3, 4]
      }
    })
    const input = wrapper.find('.vxp-time-picker__input')
    const units = wrapper.findAll('.vxp-time-picker__unit')

    await wrapper.trigger('click')
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(units[0].text()).toEqual('10')

    await units[1].trigger('click')
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(units[1].text()).toEqual('21')

    await units[2].trigger('click')
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(units[2].text()).toEqual('40')
  })

  it('ctrl steps', async () => {
    const wrapper = mount(TimePicker, {
      props: {
        value: '09:24:47',
        ctrlSteps: [2, 3, 4]
      }
    })
    const input = wrapper.find('.vxp-time-picker__input')
    const units = wrapper.findAll('.vxp-time-picker__unit')

    await wrapper.trigger('click')
    await input.trigger('keydown.ctrl', { key: 'ArrowUp' })
    expect(units[0].text()).toEqual('07')

    await units[1].trigger('click')
    await input.trigger('keydown.ctrl', { key: 'ArrowUp' })
    expect(units[1].text()).toEqual('21')

    await units[2].trigger('click')
    await input.trigger('keydown.ctrl', { key: 'ArrowDown' })
    expect(units[2].text()).toEqual('51')
  })

  it('shortcut', async () => {
    const fnValue = vi.fn(() => '12:00:00')
    const onShortcut = vi.fn()
    const shortcuts = [
      { name: 'morning', value: '08:00:00' },
      { name: 'noon', value: fnValue }
    ]
    const wrapper = mount(TimePicker, {
      props: { shortcuts, onShortcut }
    })
    const selector = wrapper.find('.vxp-time-picker__selector')

    await wrapper.trigger('click')
    expect(wrapper.find('.vxp-time-picker__list--sub').exists()).toBe(true)

    let shortcutItems = wrapper.findAll('.vxp-time-picker__shortcut')

    expect(shortcutItems.length).toEqual(shortcuts.length)
    shortcutItems.forEach((item, i) => {
      expect(item.text()).toEqual(shortcuts[i].name)
    })

    await shortcutItems[0].trigger('click')
    expect(selector.text()).toEqual(shortcuts[0].value)
    expect(wrapper.classes()).not.toContain('vxp-time-picker--visible')
    expect(onShortcut).toHaveBeenCalled()
    expect(onShortcut).toHaveBeenLastCalledWith(shortcuts[0].name, shortcuts[0].value)

    await wrapper.trigger('click')
    shortcutItems = wrapper.findAll('.vxp-time-picker__shortcut')
    await shortcutItems[1].trigger('click')
    expect(fnValue).toHaveBeenCalled()
    expect(selector.text()).toEqual('12:00:00')
  })

  it('range select', async () => {
    const date = Date.now()
    vi.setSystemTime(date)

    const onChange = vi.fn()
    const onChangeCol = vi.fn()
    const wrapper = mount(TimePicker, {
      props: {
        isRange: true,
        onChange,
        onChangeCol
      }
    })
    const input = wrapper.findAll('.vxp-time-picker__input')
    const units = wrapper.findAll('.vxp-time-picker__unit')

    expect(input.length).toEqual(2)
    expect(units.length).toEqual(6)

    await wrapper.trigger('click')
    expect(units[0].classes()).toContain('vxp-time-picker__unit--focused')

    await units[2].trigger('click')
    await input[0].trigger('keydown', { key: 'Tab' })
    expect(units[3].classes()).toContain('vxp-time-picker__unit--focused')
    expect(onChangeCol).toHaveBeenLastCalledWith('hour', 'end')

    await input[1].trigger('keydown.shift', { key: 'Tab' })
    expect(units[2].classes()).toContain('vxp-time-picker__unit--focused')
    expect(onChangeCol).toHaveBeenLastCalledWith('second', 'start')

    await units[5].trigger('click')
    await input[1].trigger('keydown', { key: 'Tab' })
    expect(units[0].classes()).toContain('vxp-time-picker__unit--focused')

    await input[0].trigger('keydown.shift', { key: 'Tab' })
    expect(units[5].classes()).toContain('vxp-time-picker__unit--focused')

    await units[3].trigger('click')
    await input[1].trigger('keydown', { key: 'Numpad1' })
    await input[1].trigger('keydown', { key: 'Numpad7' })
    await units[4].trigger('click')
    await input[1].trigger('keydown', { key: 'Numpad5' })
    await input[1].trigger('keydown', { key: 'Numpad1' })
    await units[5].trigger('click')
    await input[1].trigger('keydown', { key: 'Numpad3' })
    await input[1].trigger('keydown', { key: 'Numpad6' })
    await wrapper.trigger('clickoutside')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith([format(date, 'HH:mm:ss'), '17:51:36'])
  })
})
