import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { enableAutoUnmount, mount } from '@vue/test-utils'

import { getWeeksInYear, startOfWeek, yearWeekToDate } from '@vexip-ui/utils'
import { DatePicker } from '..'
import DatePanel from '../date-panel.vue'
import CalendarCell from '../../calendar/calendar-cell.vue'

enableAutoUnmount(afterEach)

describe('DatePicker week', () => {
  it.each([0, 1, 6])('round trips New Year and weekStart=%i', async weekStart => {
    const selected = new Date(2026, 0, 1)
    const wrapper = mount(DatePicker, {
      props: { type: 'week', visible: true, weekStart, today: selected },
    })
    const expected = startOfWeek(selected, weekStart)
    const panel = wrapper.findComponent(DatePanel)

    await wrapper
      .findAllComponents(CalendarCell)
      .find(cell => +cell.props('date') === +selected)!
      .find('[role="button"]')
      .trigger('click')
    expect(wrapper.vm.startState.getDate()).toEqual(expected)
    expect(wrapper.vm.startState.dateValue).toMatchObject({ year: 2026, week: 1 })
    expect(
      wrapper.findAllComponents(CalendarCell).filter(cell => cell.props('selected')),
    ).toHaveLength(7)
    panel.vm.$emit('confirm')
    await nextTick()
    expect(wrapper.emitted('update:value')?.[0]).toEqual([+expected])

    await wrapper.setProps({ value: +expected, visible: true })
    expect(wrapper.vm.startState.dateValue).toMatchObject({ year: 2026, week: 1 })
    panel.vm.refreshCalendar('start')
    await nextTick()
    expect(panel.vm.calendarYear).toBe(expected.getFullYear())
    expect(panel.vm.calendarMonth).toBe(expected.getMonth() + 1)

    panel.vm.$emit('change', new Date(2026, 0, 2))
    panel.vm.$emit('confirm')
    await nextTick()
    expect(wrapper.emitted('update:value')).toHaveLength(1)
  })

  it.each(['year', 'month', 'week', 'date'] as const)(
    'sorts and previews %s ranges',
    async type => {
      const wrapper = mount(DatePicker, {
        props: { type, range: true, visible: true, noAction: true },
      })
      const panel = wrapper.findComponent(DatePanel)
      const later = new Date(2026, 2, 18)
      const earlier = new Date(2025, 11, 10)

      panel.vm.$emit('change', later)
      panel.vm.$emit('hover', earlier)
      await nextTick()
      expect(+wrapper.vm.startState.getDate()).toBeLessThan(+wrapper.vm.endState.getDate())
      expect(wrapper.vm.startError).toBe(false)
      panel.vm.$emit('change', earlier)
      await nextTick()
      const values = wrapper.emitted('update:value')?.[0][0] as number[]
      expect(values).toHaveLength(2)
      expect(values[0]).toBeLessThan(values[1])

      if (type === 'week') {
        expect(values).toEqual([+startOfWeek(earlier), +startOfWeek(later)])
      }
    },
  )

  it('resets unfinished range selection on cancel', async () => {
    const wrapper = mount(DatePicker, {
      props: { type: 'week', range: true, visible: true, noAction: true },
    })
    const panel = wrapper.findComponent(DatePanel)
    panel.vm.$emit('change', new Date(2026, 0, 1))
    panel.vm.$emit('cancel')
    await nextTick()
    await wrapper.trigger('click')
    panel.vm.$emit('change', new Date(2026, 2, 1))
    await nextTick()
    expect(wrapper.emitted('update:value')).toBeUndefined()
  })

  it('handles rapid keys synchronously and rolls weeks across years', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        type: 'week',
        visible: true,
        value: new Date(2026, 0, 1),
        locale: { ariaLabel: { week: '周' } },
      },
    })
    const week = wrapper.findAll('.vxp-date-picker__unit')[1]
    await week.trigger('click')
    const input = wrapper.find('.vxp-date-picker__input')
    const dispatchKey = (key: string) => {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
      input.element.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(true)
    }
    dispatchKey('ArrowUp')
    expect(wrapper.vm.startState.dateValue).toMatchObject({
      year: 2025,
      week: getWeeksInYear(2025),
    })
    dispatchKey('ArrowDown')
    expect(wrapper.vm.startState.dateValue).toMatchObject({ year: 2026, week: 1 })
    dispatchKey('ArrowDown')
    dispatchKey('ArrowDown')
    expect(wrapper.vm.startState.dateValue.week).toBe(3)
    dispatchKey('1')
    expect(wrapper.vm.startState.dateValue.week).toBe(31)
    await week.trigger('click')
    dispatchKey('1')
    dispatchKey('2')
    expect(wrapper.vm.startState.dateValue.week).toBe(12)
    await nextTick()
    expect(week.attributes('aria-label')).toBe('周')
    expect(week.attributes('aria-valuemax')).toBe(String(getWeeksInYear(2026)))
    expect(wrapper.find('.vxp-date-picker__label').text()).toBe('周')
    await wrapper.setProps({ labels: { week: '' } })
    expect(wrapper.find('.vxp-date-picker__label').exists()).toBe(false)
  })

  it('clamps week 53 when changing to a 52-week year', async () => {
    const wrapper = mount(DatePicker, {
      props: { type: 'week', visible: true, value: yearWeekToDate(2028, 53) },
    })
    await wrapper.find('.vxp-date-picker__unit').trigger('click')
    await wrapper.find('.vxp-date-picker__input').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.vm.startState.dateValue).toMatchObject({ year: 2029, week: 52 })
  })

  it('recomputes week fields and the panel when type or weekStart changes', async () => {
    const value = new Date(2026, 0, 4)
    const wrapper = mount(DatePicker, { props: { type: 'month', visible: true, value } })
    await wrapper.setProps({ type: 'week', weekStart: 1 })
    expect(wrapper.vm.startState.getDate()).toEqual(new Date(2025, 11, 29))
    expect(wrapper.vm.startState.dateValue).toMatchObject({ year: 2026, week: 1 })
    expect(wrapper.find('.vxp-date-picker__calendar').exists()).toBe(true)
    await wrapper.setProps({ weekStart: 0 })
    expect(wrapper.vm.startState.getDate()).toEqual(value)
    expect(wrapper.vm.startState.dateValue).toMatchObject({ year: 2026, week: 2 })
  })

  it('preserves an uncontrolled selection when weekStart changes', async () => {
    const wrapper = mount(DatePicker, { props: { type: 'week', visible: true, noAction: true } })
    wrapper.findComponent(DatePanel).vm.$emit('change', new Date(2026, 0, 7))
    await nextTick()
    await wrapper.setProps({ weekStart: 1 })
    expect(wrapper.vm.startState.getDate()).toEqual(new Date(2025, 11, 29))
    expect(wrapper.vm.startState.activated.week).toBe(true)
  })

  it('disables an entire week when any day is disabled and expands min/max to weeks', async () => {
    const disabledDate = vi.fn((date: Date) => date.getDay() === 3)
    const wrapper = mount(DatePicker, {
      props: { type: 'week', visible: true, weekStart: 1, disabledDate },
    })
    const panel = wrapper.findComponent(DatePanel)
    for (let day = 5; day <= 11; ++day) {
      expect(panel.props('disabledDate')(new Date(2026, 0, day))).toBe(true)
    }
    const cells = wrapper.findAllComponents(CalendarCell).slice(0, 7)
    expect(cells.every(cell => cell.props('disabled'))).toBe(true)
    await cells[1].find('[role="button"]').trigger('click')
    expect(wrapper.vm.startState.activated.week).toBe(false)
    expect(wrapper.emitted('update:value')).toBeUndefined()
    const bounded = mount(DatePicker, {
      props: {
        type: 'week',
        visible: true,
        weekStart: 1,
        min: new Date(2026, 0, 7),
        max: new Date(2026, 0, 8),
      },
    }).findComponent(DatePanel)
    expect(bounded.props('disabledDate')(new Date(2026, 0, 5))).toBe(false)
    expect(bounded.props('disabledDate')(new Date(2026, 0, 11))).toBe(false)
    expect(bounded.props('disabledDate')(new Date(2026, 0, 4))).toBe(true)
    expect(bounded.props('disabledDate')(new Date(2026, 0, 12))).toBe(true)
  })
})
