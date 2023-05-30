import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { GithubB, Spinner } from '@vexip-ui/icons'
import { Transfer } from '..'

import type { VueWrapper } from '@vue/test-utils'

vi.useFakeTimers()

function getValue() {
  return Array.from({ length: 20 }, (_, index) => index)
}
function createOptions(includeDisabled = false) {
  return Array.from({ length: 40 }, (_, index) => ({
    value: index,
    label: `选项${index + 1}`,
    disabled: includeDisabled && index % 6 === 0
  }))
}

function getPanels(wrapper: VueWrapper<any>) {
  return {
    source: wrapper.find('.vxp-transfer__panel--source'),
    target: wrapper.find('.vxp-transfer__panel--target')
  }
}

describe('Transfer', () => {
  it('render', () => {
    const options = createOptions()
    const value = getValue()
    const wrapper = mount(() => <Transfer value={value} options={options}></Transfer>)
    const { source, target } = getPanels(wrapper)

    expect(wrapper.find('.vxp-transfer').classes()).toContain('vxp-transfer-vars')
    expect(source.exists()).toBe(true)
    expect(target.exists()).toBe(true)
    expect(source.find('.vxp-transfer__header').exists()).toBe(true)
    expect(target.find('.vxp-transfer__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-transfer__actions').exists()).toBe(true)
    expect(wrapper.findAll('.vxp-button').length).toEqual(2)
    expect(source.findAll('.vxp-transfer__option').length).toEqual(20)
    expect(target.findAll('.vxp-transfer__option').length).toEqual(20)
  })

  it('disabled', () => {
    const wrapper = mount(() => <Transfer disabled></Transfer>)
    const { source, target } = getPanels(wrapper)

    expect(source.classes()).toContain('vxp-transfer__panel--disabled')
    expect(target.classes()).toContain('vxp-transfer__panel--disabled')
  })

  it('has empty', () => {
    const wrapper = mount(Transfer)
    const { source, target } = getPanels(wrapper)

    expect(source.find('.vxp-transfer__empty').exists()).toBe(true)
    expect(target.find('.vxp-transfer__empty').exists()).toBe(true)
  })

  it('state', () => {
    (['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <Transfer state={state}></Transfer>)

      expect(wrapper.find('.vxp-transfer').classes()).toContain(`vxp-transfer--${state}`)
    })
  })

  it('select options', async () => {
    const options = createOptions()
    const value = getValue()
    const onSelect = vi.fn()
    const wrapper = mount(() => (
      <Transfer value={value} options={options} onSelect={onSelect}></Transfer>
    ))
    const { source, target } = getPanels(wrapper)

    await source.find('.vxp-transfer__option').trigger('click')
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(
      'source',
      { source: [options[20].value], target: [] },
      { source: [options[20]], target: [] }
    )

    await target.find('.vxp-transfer__option').trigger('click')
    expect(onSelect).toHaveBeenCalledTimes(2)
    expect(onSelect).toHaveBeenCalledWith(
      'target',
      { source: [options[20].value], target: [options[0].value] },
      { source: [options[20]], target: [options[0]] }
    )
  })

  it('disabled options', async () => {
    const options = createOptions(true)
    const value = getValue()
    const onSelect = vi.fn()
    const wrapper = mount(() => (
      <Transfer value={value} options={options} onSelect={onSelect}></Transfer>
    ))
    const { source, target } = getPanels(wrapper)

    expect(source.findAll('.vxp-transfer__option--disabled').length).toEqual(3)
    expect(target.findAll('.vxp-transfer__option--disabled').length).toEqual(4)

    await source.find('.vxp-transfer__option--disabled').trigger('click')
    expect(onSelect).toHaveBeenCalledTimes(0)

    await target.find('.vxp-transfer__option--disabled').trigger('click')
    expect(onSelect).toHaveBeenCalledTimes(0)
  })

  it('action status', async () => {
    const options = createOptions()
    const value = getValue()
    const wrapper = mount(() => <Transfer value={value} options={options}></Transfer>)
    const { source, target } = getPanels(wrapper)
    const buttons = wrapper.findAll('.vxp-button')

    expect(buttons[0].attributes('disabled')).toEqual('')
    expect(buttons[1].attributes('disabled')).toEqual('')

    await source.find('.vxp-transfer__option').trigger('click')
    expect(buttons[0].attributes('disabled')).toBeUndefined()

    await target.find('.vxp-transfer__option').trigger('click')
    expect(buttons[1].attributes('disabled')).toBeUndefined()
  })

  it('change', async () => {
    const options = createOptions()
    const value = getValue()
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <Transfer value={value} options={options} onChange={onChange}></Transfer>
    ))
    const { source, target } = getPanels(wrapper)
    const buttons = wrapper.findAll('.vxp-button')

    await source.find('.vxp-transfer__option').trigger('click')
    ;(buttons[0].element as HTMLButtonElement).click()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(options.slice(0, 21).map(o => o.value))

    await target.find('.vxp-transfer__option').trigger('click')
    ;(buttons[1].element as HTMLButtonElement).click()
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(options.slice(1, 21).map(o => o.value))
  })

  it('paged', () => {
    const wrapper = mount(() => <Transfer paged></Transfer>)
    const { source, target } = getPanels(wrapper)

    expect(source.find('.vxp-transfer__footer').exists()).toBe(true)
    expect(source.find('.vxp-transfer__pagination').exists()).toBe(true)
    expect(target.find('.vxp-transfer__footer').exists()).toBe(true)
    expect(target.find('.vxp-transfer__pagination').exists()).toBe(true)
  })

  it('filter options', async () => {
    const options = createOptions()
    const value = getValue()
    const wrapper = mount(() => <Transfer value={value} options={options} filter></Transfer>)
    const { source, target } = getPanels(wrapper)

    expect(source.find('.vxp-transfer__filter').exists()).toBe(true)
    expect(target.find('.vxp-transfer__filter').exists()).toBe(true)

    const sourceInput = source.find('input')
    const targetInput = target.find('input')

    expect(sourceInput.exists()).toBe(true)
    expect(targetInput.exists()).toBe(true)
  })

  it('loading', async () => {
    const wrapper = mount(Transfer)
    const { source, target } = getPanels(wrapper)

    expect(source.find('.vxp-transfer__loading').exists()).toBe(false)
    expect(source.findComponent(Spinner).exists()).toBe(false)
    expect(target.find('.vxp-transfer__loading').exists()).toBe(false)
    expect(target.findComponent(Spinner).exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(source.find('.vxp-transfer__loading').exists()).toBe(true)
    expect(source.findComponent(Spinner).exists()).toBe(true)
    expect(target.find('.vxp-transfer__loading').exists()).toBe(true)
    expect(target.findComponent(Spinner).exists()).toBe(true)
  })

  it('loading icon', () => {
    const wrapper = mount(() => <Transfer loading loading-icon={GithubB}></Transfer>)
    const { source, target } = getPanels(wrapper)

    expect(source.findComponent(Spinner).exists()).toBe(false)
    expect(source.findComponent(GithubB).exists()).toBe(true)
    expect(target.findComponent(Spinner).exists()).toBe(false)
    expect(target.findComponent(GithubB).exists()).toBe(true)
  })
})
