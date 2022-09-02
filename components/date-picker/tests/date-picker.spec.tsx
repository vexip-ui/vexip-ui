import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { DatePicker } from '..'
import { GithubB, CalendarR, Spinner } from '@vexip-ui/icons'
import { format } from '@vexip-ui/utils'

vi.useFakeTimers()

async function runScrollTimers() {
  vi.runAllTimers()
  await nextTick()
  vi.runAllTimers()
  await nextTick()
}

describe('DatePicker', () => {
  it('render', () => {
    const wrapper = mount(DatePicker)

    expect(wrapper.classes()).toContain('vxp-date-picker-vars')
    expect(wrapper.classes()).toContain('vxp-input-vars')
    expect(wrapper.find('.vxp-date-picker__selector').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__control').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__popper').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__panel').exists()).toBe(true)
    expect(wrapper.findAll('.vxp-date-picker__unit').length).toEqual(3)
    expect(wrapper.find('.vxp-date-picker__year').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__month').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__calendar').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__action').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__action').findAll('.vxp-button').length).toEqual(2)
  })

  it('transfer', async () => {
    const wrapper = mount(DatePicker, {
      props: { transfer: true }
    })

    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-date-picker__popper').exists()).toBe(false)
    expect(document.querySelector('.vxp-date-picker__popper')).not.toBeNull()
  })

  it('type', async () => {
    const wrapper = mount(DatePicker, {
      props: { type: 'datetime' }
    })

    expect(wrapper.findAll('.vxp-date-picker__unit').length).toEqual(6)
    expect(wrapper.find('.vxp-date-picker__time-wheel').exists()).toBe(true)

    await wrapper.setProps({ type: 'month' })
    expect(wrapper.findAll('.vxp-date-picker__unit').length).toEqual(2)

    await wrapper.setProps({ type: 'year' })
    expect(wrapper.findAll('.vxp-date-picker__unit').length).toEqual(1)
  })

  it('toggle visible', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const wrapper = mount(DatePicker, {
      props: { onFocus, onBlur }
    })
    const selector = wrapper.find('.vxp-date-picker__selector')
    const units = wrapper.findAll('.vxp-date-picker__unit')
    const buttons = wrapper.find('.vxp-date-picker__action').findAll('.vxp-button')

    expect(wrapper.classes()).not.toContain('vxp-date-picker--visible')
    expect(selector.classes()).not.toContain('vxp-date-picker__selector--focused')

    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('vxp-date-picker--visible')
    expect(units[2].classes()).toContain('vxp-date-picker__unit--focused')
    expect(selector.classes()).toContain('vxp-date-picker__selector--focused')
    expect(onFocus).toHaveBeenCalledTimes(1)

    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('vxp-date-picker--visible')
    expect(selector.classes()).toContain('vxp-date-picker__selector--focused')
    expect(onFocus).toHaveBeenCalledTimes(1)

    await wrapper.trigger('clickoutside')
    expect(wrapper.classes()).not.toContain('vxp-date-picker--visible')
    expect(selector.classes()).not.toContain('vxp-date-picker__selector--focused')
    expect(onBlur).toHaveBeenCalledTimes(1)

    await wrapper.trigger('click')
    ;(buttons[0].element as HTMLButtonElement).click()
    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-date-picker--visible')
    expect(selector.classes()).toContain('vxp-date-picker__selector--focused')

    await wrapper.trigger('click')
    ;(buttons[1].element as HTMLButtonElement).click()
    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-date-picker--visible')
    expect(selector.classes()).toContain('vxp-date-picker__selector--focused')
  })

  it('key toggle visible', async () => {
    const onEnter = vi.fn()
    const onCancel = vi.fn()
    const wrapper = mount(DatePicker, {
      props: { onEnter, onCancel }
    })
    const selector = wrapper.find('.vxp-date-picker__selector')
    const input = wrapper.find('.vxp-date-picker__input')

    await selector.trigger('keydown', { key: 'Space' })
    expect(wrapper.classes()).toContain('vxp-date-picker--visible')
    expect(selector.classes()).toContain('vxp-date-picker__selector--focused')

    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.classes()).not.toContain('vxp-date-picker--visible')
    expect(selector.classes()).toContain('vxp-date-picker__selector--focused')
    expect(onCancel).toHaveBeenCalled()

    await selector.trigger('keydown', { key: 'Space' })
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.classes()).not.toContain('vxp-date-picker--visible')
    expect(selector.classes()).toContain('vxp-date-picker__selector--focused')
    expect(onEnter).toHaveBeenCalled()

    await selector.trigger('keydown', { key: 'Space' })
    await input.trigger('keydown', { key: 'Space' })
    expect(wrapper.classes()).not.toContain('vxp-date-picker--visible')
    expect(selector.classes()).toContain('vxp-date-picker__selector--focused')
  })

  it('disabled', async () => {
    const wrapper = mount(DatePicker)
    const selector = wrapper.find('.vxp-date-picker__selector')

    expect(selector.classes()).not.toContain('vxp-date-picker__selector--disabled')

    await wrapper.trigger('click')
    expect(selector.classes()).toContain('vxp-date-picker__selector--focused')

    await wrapper.setProps({ disabled: true })
    expect(selector.classes()).toContain('vxp-date-picker__selector--disabled')
    expect(selector.classes()).not.toContain('vxp-date-picker__selector--focused')
  })

  it('toggle event', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(DatePicker, {
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

  it('panel actions', async () => {
    vi.setSystemTime('2022-05-27 09:24:47')

    const wrapper = mount(DatePicker)
    await nextTick()

    expect(wrapper.find('.vxp-date-picker__year').text()).toEqual('2022年')
    expect(wrapper.find('.vxp-date-picker__month').text()).toEqual('05月')

    const prevMonth = wrapper.find('.vxp-date-picker__prev-month')
    const nextMonth = wrapper.find('.vxp-date-picker__next-month')
    const prefYear = wrapper.find('.vxp-date-picker__prev-year')
    const nextYear = wrapper.find('.vxp-date-picker__next-year')

    await wrapper.trigger('click')
    await prevMonth.trigger('click')
    expect(wrapper.find('.vxp-date-picker__month').text()).toEqual('04月')

    await nextMonth.trigger('click')
    expect(wrapper.find('.vxp-date-picker__month').text()).toEqual('05月')

    await prefYear.trigger('click')
    expect(wrapper.find('.vxp-date-picker__year').text()).toEqual('2021年')

    await nextYear.trigger('click')
    expect(wrapper.find('.vxp-date-picker__year').text()).toEqual('2022年')

    await wrapper.find('.vxp-date-picker__month').trigger('click')
    expect(wrapper.find('.vxp-date-picker__month-pane').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__month').attributes('style')).toContain('display: none;')

    await wrapper.find('.vxp-date-picker__year').trigger('click')
    expect(wrapper.find('.vxp-date-picker__year-pane').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__year').text()).toEqual('2020年 - 2029年')

    await nextYear.trigger('click')
    expect(wrapper.find('.vxp-date-picker__year').text()).toEqual('2030年 - 2039年')
  })

  it('value', async () => {
    vi.setSystemTime('2022-05-26 00:00:00')

    const wrapper = mount(DatePicker, {
      props: { type: 'datetime', value: '2022-05-27 09:24:47' }
    })
    const units = wrapper.findAll('.vxp-date-picker__unit')

    expect(units[0].text()).toEqual('----')
    units.slice(1).forEach(unit => {
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
    expect(units[0].text()).toEqual('2022')
    expect(units[1].text()).toEqual('05')
    expect(units[2].text()).toEqual('27')
    expect(units[3].text()).toEqual('09')
    expect(units[4].text()).toEqual('24')
    expect(units[5].text()).toEqual('47')

    await wrapper.trigger('click')
    expect(wrapper.find('.vxp-calendar__index--selected').exists()).toBe(true)
    expect(wrapper.find('.vxp-calendar__index--selected').text()).toEqual('27')

    await wrapper.find('.vxp-date-picker__month').trigger('click')
    expect(wrapper.find('.vxp-date-picker__month-item--selected').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__month-item--selected').text()).toEqual('05月')

    await wrapper.find('.vxp-date-picker__year').trigger('click')
    expect(wrapper.find('.vxp-date-picker__year-item--selected').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__year-item--selected').text()).toEqual('2022')
  })

  it('button text', () => {
    const wrapper = mount(() => <DatePicker confirm-text={'OK'} cancel-text={'NO'}></DatePicker>)
    const buttons = wrapper.find('.vxp-date-picker__action').findAll('.vxp-button')

    expect(buttons[0].text()).toEqual('NO')
    expect(buttons[1].text()).toEqual('OK')
  })

  it('labels', () => {
    const labels = { year: '年', month: '月', date: '日', hour: '时', minute: '分', second: '秒' }
    const wrapper = mount(() => <DatePicker type={'datetime'} labels={labels}></DatePicker>)

    expect(
      expect(wrapper.find('.vxp-date-picker__selector').text()).toEqual(
        '----年/--月/--日--时:--分:--秒'
      )
    )
  })

  it('filler', () => {
    const wrapper = mount(() => <DatePicker type={'datetime'} filler={'?'}></DatePicker>)

    expect(expect(wrapper.find('.vxp-date-picker__selector').text()).toEqual('????/??/????:??:??'))
  })

  it('no filler', () => {
    const wrapper = mount(() => (
      <DatePicker type={'datetime'} value={'2022-05-27 09:24:47'} no-filler></DatePicker>
    ))

    expect(expect(wrapper.find('.vxp-date-picker__selector').text()).toEqual('2022/05/2709:24:47'))
  })

  it('separator', () => {
    const wrapper = mount(() => (
      <DatePicker type={'datetime'} date-separator={'^'} time-separator={'~'}></DatePicker>
    ))

    expect(expect(wrapper.find('.vxp-date-picker__selector').text()).toEqual('----^--^----~--~--'))
  })

  it('format', () => {
    const wrapper = mount(() => (
      <DatePicker
        value={'2022-05-27 09:24:47'}
        type={'datetime'}
        no-filler
        format={'yyyy-dd HH:ss'}
      ></DatePicker>
    ))
    const units = wrapper.findAll('.vxp-date-picker__unit')

    expect(units.length).toEqual(5)
    expect(units[0].text()).toEqual('2022')
    expect(units[1].text()).toEqual('05')
    expect(units[2].text()).toEqual('27')
    expect(units[3].text()).toEqual('09')
    expect(units[4].text()).toEqual('47')
  })

  it('prefix', () => {
    const wrapper = mount(() => <DatePicker prefix={GithubB}></DatePicker>)

    expect(wrapper.find('.vxp-date-picker__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('prefix color', async () => {
    const wrapper = mount(() => <DatePicker prefix={GithubB} prefix-color={'red'}></DatePicker>)

    expect(wrapper.find('.vxp-date-picker__prefix').attributes('style')).toContain('color: red;')
  })

  it('prefix slot', async () => {
    const wrapper = mount(() => (
      <DatePicker prefix={GithubB}>
        {{
          prefix: () => <span class={'prefix'}></span>
        }}
      </DatePicker>
    ))

    expect(wrapper.find('.vxp-date-picker__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(false)
    expect(wrapper.find('.prefix').exists()).toBe(true)
  })

  it('suffix', async () => {
    const wrapper = mount(DatePicker)

    expect(wrapper.find('.vxp-date-picker__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(CalendarR).exists()).toBe(true)

    await wrapper.setProps({ suffix: GithubB })
    expect(wrapper.findComponent(CalendarR).exists()).toBe(false)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('suffix color', async () => {
    const wrapper = mount(() => <DatePicker suffix={GithubB} suffix-color={'red'}></DatePicker>)

    expect(wrapper.find('.vxp-date-picker__suffix').attributes('style')).toContain('color: red;')
  })

  it('suffix slot', async () => {
    const wrapper = mount(() => (
      <DatePicker suffix={GithubB}>
        {{
          suffix: () => <span class={'suffix'}></span>
        }}
      </DatePicker>
    ))

    expect(wrapper.find('.vxp-date-picker__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(false)
    expect(wrapper.find('.suffix').exists()).toBe(true)
  })

  it('size', () => {
    const wrapper = mount(() => <DatePicker size={'large'}></DatePicker>)

    expect(wrapper.find('.vxp-date-picker__selector').classes()).toContain(
      'vxp-date-picker__selector--large'
    )
  })

  it('state', () => {
    (['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <DatePicker state={state}></DatePicker>)

      expect(wrapper.find('.vxp-date-picker__selector').classes()).toContain(
        `vxp-date-picker__selector--${state}`
      )
    })
  })

  it('loading', async () => {
    const wrapper = mount(DatePicker)

    expect(wrapper.find('.vxp-date-picker__loading').exists()).toBe(false)
    expect(wrapper.findComponent(Spinner).exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.vxp-date-picker__loading').exists()).toBe(true)
    expect(wrapper.findComponent(Spinner).exists()).toBe(true)
  })

  it('loading lock', async () => {
    const wrapper = mount(DatePicker)
    const selector = wrapper.find('.vxp-date-picker__selector')

    expect(selector.classes()).not.toContain('vxp-date-picker__selector--loading')

    await wrapper.setProps({ loading: true, loadingLock: true })
    expect(selector.classes()).toContain('vxp-date-picker__selector--loading')
  })

  it('loading icon', () => {
    const wrapper = mount(() => <DatePicker loading loading-icon={GithubB}></DatePicker>)

    expect(wrapper.findComponent(Spinner).exists()).toBe(false)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('change event', async () => {
    const date = Date.now()
    vi.setSystemTime(date)

    const onChange = vi.fn()
    const wrapper = mount(DatePicker, {
      props: { onChange }
    })

    await wrapper.trigger('click')
    await wrapper.trigger('clickoutside')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(format(date, 'yyyy-MM-dd'))
  })

  it('clearable', async () => {
    const onClear = vi.fn()
    const wrapper = mount(DatePicker, {
      props: {
        type: 'datetime',
        clearable: true,
        onClear
      }
    })
    const selector = wrapper.find('.vxp-date-picker__selector')

    expect(wrapper.find('.vxp-date-picker__clear').exists()).toBe(false)

    await selector.trigger('mouseenter')
    expect(wrapper.find('.vxp-date-picker__clear').exists()).toBe(false)

    await wrapper.trigger('click')
    await wrapper.trigger('clickoutside')
    await selector.trigger('mouseenter')
    expect(wrapper.find('.vxp-date-picker__clear').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__suffix').exists()).toBe(true)
    expect(wrapper.find('.vxp-date-picker__suffix').attributes('style')).toContain('opacity: 0%;')

    await wrapper.find('.vxp-date-picker__clear').trigger('click')
    await nextTick()
    expect(onClear).toHaveBeenCalled()
    expect(selector.text()).toEqual('----/--/----:--:--')
  })

  it('click unit', async () => {
    const onChangeCol = vi.fn()
    const wrapper = mount(DatePicker, {
      props: {
        type: 'datetime',
        value: '2022-05-27 09:24:47',
        onChangeCol
      }
    })
    const selector = wrapper.find('.vxp-date-picker__selector')
    const units = wrapper.findAll('.vxp-date-picker__unit')

    await wrapper.trigger('click')
    expect(onChangeCol).toHaveBeenCalled()
    expect(onChangeCol).toHaveBeenLastCalledWith('date', 'start')

    await wrapper.trigger('clickoutside')
    await units[1].trigger('click')
    expect(selector.classes()).toContain('vxp-date-picker__selector--focused')
    expect(units[1].classes()).toContain('vxp-date-picker__unit--focused')
    expect(onChangeCol).toHaveBeenLastCalledWith('month', 'start')

    await units[5].trigger('click')
    expect(selector.classes()).toContain('vxp-date-picker__selector--focused')
    expect(units[5].classes()).toContain('vxp-date-picker__unit--focused')
    expect(onChangeCol).toHaveBeenLastCalledWith('second', 'start')
  })

  it('key actions', async () => {
    const onInput = vi.fn()
    const onPlus = vi.fn()
    const onMinus = vi.fn()
    const onChangeCol = vi.fn()
    const wrapper = mount(DatePicker, {
      props: {
        type: 'datetime',
        value: '2022-05-27 09:24:47',
        onInput,
        onPlus,
        onMinus,
        onChangeCol
      }
    })
    const input = wrapper.find('.vxp-date-picker__input')
    const units = wrapper.findAll('.vxp-date-picker__unit')
    const calendarYear = wrapper.find('.vxp-date-picker__year')
    const calendarMonth = wrapper.find('.vxp-date-picker__month')

    await wrapper.trigger('click')
    await units[0].trigger('click')
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(units[0].text()).toEqual('2021')
    expect(onMinus).toHaveBeenCalled()
    expect(onMinus).toHaveBeenLastCalledWith('year', 2021)

    onChangeCol.mockClear()
    await input.trigger('keydown', { key: 'Tab' })
    expect(units[1].classes()).toContain('vxp-date-picker__unit--focused')
    expect(onChangeCol).toHaveBeenCalled()
    expect(onChangeCol).toHaveBeenLastCalledWith('month', 'start')

    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(units[1].text()).toEqual('06')
    expect(onPlus).toHaveBeenCalled()
    expect(onPlus).toHaveBeenLastCalledWith('month', 6)

    await input.trigger('keydown', { key: 'ArrowRight' })
    expect(units[2].classes()).toContain('vxp-date-picker__unit--focused')

    await input.trigger('keydown', { key: 'ArrowRight' })
    expect(units[3].classes()).toContain('vxp-date-picker__unit--focused')

    await input.trigger('keydown', { key: 'ArrowRight' })
    await input.trigger('keydown', { key: 'ArrowRight' })
    await input.trigger('keydown', { key: 'ArrowRight' })
    expect(units[0].classes()).toContain('vxp-date-picker__unit--focused')

    await input.trigger('keydown', { key: 'ArrowLeft' })
    expect(units[5].classes()).toContain('vxp-date-picker__unit--focused')

    await input.trigger('keydown', { key: 'ArrowRight' })
    await input.trigger('keydown.shift', { key: 'Tab' })
    expect(units[5].classes()).toContain('vxp-date-picker__unit--focused')

    await units[2].trigger('click')
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(units[2].text()).toEqual('26')

    await input.trigger('keydown.ctrl', { key: 'ArrowUp' })
    expect(calendarMonth.text()).toEqual('05月')
    expect(units[2].text()).toEqual('26')

    await units[1].trigger('click')
    await input.trigger('keydown.ctrl', { key: 'ArrowDown' })
    expect(calendarYear.text()).toEqual('2022年')

    await units[2].trigger('click')
    await input.trigger('keydown', { key: 'Digit2' })
    expect(units[2].text()).toEqual('02')
    expect(onInput).toHaveBeenCalled()
    expect(onInput).toHaveBeenLastCalledWith('date', 2)

    await input.trigger('keydown', { key: 'Numpad1' })
    expect(units[2].text()).toEqual('21')
    expect(units[3].classes()).toContain('vxp-date-picker__unit--focused')

    await units[2].trigger('click')
    await input.trigger('keydown', { key: 'Numpad4' })
    await input.trigger('keydown', { key: 'Numpad4' })
    expect(units[2].text()).toEqual('31')
  })

  it('shortcut', async () => {
    const fnValue = vi.fn(() => '2022-06-01')
    const onShortcut = vi.fn()
    const shortcuts = [
      { name: 'Labor Day', value: '2022-05-01' },
      { name: "Children's Day", value: fnValue }
    ]
    const wrapper = mount(DatePicker, {
      props: { shortcuts, onShortcut }
    })
    const selector = wrapper.find('.vxp-date-picker__selector')

    expect(wrapper.find('.vxp-date-picker__list--sub').exists()).toBe(true)

    const shortcutItems = wrapper.findAll('.vxp-date-picker__shortcut')

    expect(shortcutItems.length).toEqual(shortcuts.length)
    shortcutItems.forEach((item, i) => {
      expect(item.text()).toEqual(shortcuts[i].name)
    })

    await wrapper.trigger('click')
    await shortcutItems[0].trigger('click')
    expect(selector.text()).toEqual('2022/05/01')
    expect(wrapper.classes()).not.toContain('vxp-date-picker--visible')
    expect(onShortcut).toHaveBeenCalled()
    expect(onShortcut).toHaveBeenLastCalledWith(shortcuts[0].name, shortcuts[0].value)

    await wrapper.trigger('click')
    await shortcutItems[1].trigger('click')
    expect(fnValue).toHaveBeenCalled()
    expect(selector.text()).toEqual('2022/06/01')
  })

  it('range select', async () => {
    const date = new Date()
    vi.setSystemTime(date)

    const onChange = vi.fn()
    const onChangeCol = vi.fn()
    const wrapper = mount(DatePicker, {
      props: {
        isRange: true,
        onChange,
        onChangeCol
      }
    })
    const input = wrapper.findAll('.vxp-date-picker__input')
    const units = wrapper.findAll('.vxp-date-picker__unit')

    expect(input.length).toEqual(2)
    expect(units.length).toEqual(6)

    await wrapper.trigger('click')
    expect(units[2].classes()).toContain('vxp-date-picker__unit--focused')

    await input[0].trigger('keydown', { key: 'Tab' })
    expect(units[3].classes()).toContain('vxp-date-picker__unit--focused')
    expect(onChangeCol).toHaveBeenLastCalledWith('year', 'end')

    await input[1].trigger('keydown.shift', { key: 'Tab' })
    expect(units[2].classes()).toContain('vxp-date-picker__unit--focused')
    expect(onChangeCol).toHaveBeenLastCalledWith('date', 'start')

    await units[5].trigger('click')
    await input[1].trigger('keydown', { key: 'Tab' })
    expect(units[0].classes()).toContain('vxp-date-picker__unit--focused')

    await input[0].trigger('keydown.shift', { key: 'Tab' })
    expect(units[5].classes()).toContain('vxp-date-picker__unit--focused')

    await units[4].trigger('click')
    await input[1].trigger('keydown', { key: 'Numpad1' })
    await input[1].trigger('keydown', { key: 'Numpad1' })
    await units[5].trigger('click')
    await input[1].trigger('keydown', { key: 'Numpad1' })
    await input[1].trigger('keydown', { key: 'Numpad6' })
    await wrapper.trigger('clickoutside')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith([
      format(date, 'yyyy-MM-dd'),
      `${date.getFullYear()}-11-16`
    ])
  })
})
