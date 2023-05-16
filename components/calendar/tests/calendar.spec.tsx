import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { Calendar } from '..'

const NOW = Date.now()

describe('Calendar', () => {
  it('render', () => {
    const wrapper = mount(Calendar)

    expect(wrapper.classes()).toContain('vxp-calendar-vars')
  })

  it('set value', () => {
    const wrapper = mount(() => <Calendar value={NOW}></Calendar>)

    expect(wrapper.find('.vxp-calendar__date--selected').exists()).toBe(true)
  })

  it('disable date', () => {
    const todayDate = new Date().getDate()
    const disabledDate = (date: Date) => date.getDate() === todayDate
    const wrapper = mount(() => <Calendar disabled-date={disabledDate}></Calendar>)

    expect(wrapper.find('.vxp-calendar__date--disabled').exists()).toBe(true)
  })

  it('select', () => {
    const onSelect = vi.fn()
    const wrapper = mount(() => <Calendar onSelect={onSelect}></Calendar>)

    wrapper.find('.vxp-calendar__date').trigger('click')

    expect(onSelect).toHaveBeenCalled()
  })
})
