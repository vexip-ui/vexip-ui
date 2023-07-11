import { Select } from '@/components/select'

import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { AutoComplete } from '..'

import type { DOMWrapper } from '@vue/test-utils'

vi.useFakeTimers()

const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

function getValue(wrapper: DOMWrapper<Element>) {
  return (wrapper.element as HTMLInputElement).value
}

function emitInput(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new Event('input'))
}

describe('AutoComplete', () => {
  it('render', async () => {
    const wrapper = mount(AutoComplete, {
      props: { value: '1', options: OPTIONS }
    })

    expect(wrapper.find('.vxp-auto-complete__input').exists()).toBe(true)
  })

  it('disabled', async () => {
    const wrapper = mount(AutoComplete)

    expect(wrapper.find('.vxp-auto-complete__input').attributes('disabled')).toBeFalsy()

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.vxp-auto-complete__input').attributes('disabled')).toBe('')
  })

  it('placeholder', async () => {
    const wrapper = mount(AutoComplete, {
      props: { placeholder: '1' }
    })

    expect(wrapper.find('.vxp-auto-complete__input').attributes('placeholder')).toBe('1')

    await wrapper.setProps({ placeholder: '2' })
    expect(wrapper.find('.vxp-auto-complete__input').attributes('placeholder')).toBe('2')
  })

  it('clearable', async () => {
    const handleClear = vi.fn()
    const wrapper = mount(AutoComplete, {
      props: {
        clearable: true,
        options: OPTIONS,
        onClear: handleClear
      }
    })

    expect(wrapper.find('.vxp-select__clear').exists()).toBe(false)

    await wrapper.setProps({ value: OPTIONS[0] })
    await wrapper.find('.vxp-select__selector').trigger('mouseenter')

    expect(wrapper.find('.vxp-select__clear').exists()).toBe(true)

    wrapper.getComponent(Select).vm.handleClear()
    await nextTick()

    expect(handleClear).toHaveBeenCalled()
    expect(getValue(wrapper.find('.vxp-auto-complete__input'))).toEqual('')
  })

  it('filter', async () => {
    const wrapper = mount(AutoComplete, {
      props: {
        options: OPTIONS,
        filter: true,
        ignoreCase: true
      }
    })
    const input = wrapper.find('input').element
    const value = OPTIONS[0]

    emitInput(input, value.toLocaleUpperCase())
    vi.runAllTimers()
    await nextTick()

    const selectPopperEl = wrapper.find('.vxp-select__popper')
    expect(selectPopperEl.exists()).toBe(true)
    expect(selectPopperEl.find('.vxp-select__label').text()).toEqual(value)
    expect(selectPopperEl.findAll('.vxp-select__label').length).toEqual(1)
  })

  it('transfer', async () => {
    const wrapper = mount(AutoComplete)

    expect(document.body.querySelector('.vxp-select__popper')).toBeNull()

    await wrapper.setProps({ transfer: true })
    expect(document.body.querySelector('.vxp-select__popper')).toBeDefined()
  })
})
