import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { GithubB, ChevronDown, Spinner } from '@vexip-ui/icons'
import { mount } from '@vue/test-utils'
import { Select } from '..'

import type { DOMWrapper } from '@vue/test-utils'

const TEXT = 'Text'
const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

function getValue(wrapper: DOMWrapper<Element>) {
  return (wrapper.element as HTMLInputElement).value
}

function emitInput(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new Event('input'))
}

describe('Select', () => {
  it('render', () => {
    const wrapper = mount(Select, {
      props: { visible: true, options: OPTIONS }
    })

    expect(wrapper.classes()).toContain('vxp-select-vars')
    expect(wrapper.classes()).toContain('vxp-input-vars')
    expect(wrapper.find('.vxp-select__selector').exists()).toBe(true)
    expect(wrapper.find('.vxp-select__control').exists()).toBe(true)
    expect(wrapper.find('.vxp-select__popper').exists()).toBe(true)
    expect(wrapper.findAll('.vxp-option').length).toEqual(4)
  })

  it('has empty', async () => {
    const wrapper = mount(Select, {
      props: { visible: true, options: OPTIONS }
    })

    expect(wrapper.find('.vxp-select__empty').exists()).toBe(false)

    await wrapper.setProps({ options: [] })
    expect(wrapper.find('.vxp-select__empty').exists()).toBe(true)
  })

  it('transfer', async () => {
    const wrapper = mount(Select, {
      props: { visible: true, transfer: true, options: OPTIONS }
    })

    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-select__popper').exists()).toBe(false)
    expect(document.querySelector('.vxp-select__popper')).not.toBeNull()
  })

  it('single value', async () => {
    const wrapper = mount(Select, {
      props: {
        visible: true,
        value: OPTIONS[0],
        options: OPTIONS,
        placeholder: TEXT
      }
    })

    expect(wrapper.find('.vxp-select__control').text()).toEqual(OPTIONS[0])
    expect(wrapper.find('.vxp-option--selected').exists()).toBe(true)

    await wrapper.setProps({ value: null })
    expect(wrapper.find('.vxp-select__control').text()).toEqual(TEXT)
    expect(wrapper.find('.vxp-option--selected').exists()).toBe(false)
  })

  it('placeholder', async () => {
    const wrapper = mount(Select)

    expect(wrapper.find('.vxp-select__placeholder').exists()).toBe(true)

    await wrapper.setProps({ placeholder: TEXT })
    expect(wrapper.find('.vxp-select__placeholder').text()).toEqual(TEXT)
  })

  it('toggle visible', async () => {
    const wrapper = mount(Select)
    const selector = wrapper.find('.vxp-select__selector')

    expect(selector.classes()).not.toContain('vxp-select__selector--focused')

    await wrapper.trigger('click')
    expect(selector.classes()).toContain('vxp-select__selector--focused')

    await wrapper.trigger('click')
    expect(selector.classes()).not.toContain('vxp-select__selector--focused')
  })

  it('key toggle visible', async () => {
    const wrapper = mount(Select)
    const selector = wrapper.find('.vxp-select__selector')

    await nextTick()
    await wrapper.trigger('keydown', { key: 'Space' })
    expect(selector.classes()).toContain('vxp-select__selector--focused')

    await wrapper.trigger('keydown', { key: 'Escape' })
    expect(selector.classes()).not.toContain('vxp-select__selector--focused')

    await wrapper.setProps({ visible: true })
    await wrapper.trigger('keydown', { key: 'Tab' })
    expect(selector.classes()).not.toContain('vxp-select__selector--focused')

    await wrapper.setProps({ visible: true })
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(selector.classes()).toContain('vxp-select__selector--focused')
  })

  it('disabled', async () => {
    const wrapper = mount(Select)
    const selector = wrapper.find('.vxp-select__selector')

    expect(selector.classes()).not.toContain('vxp-select__selector--disabled')

    await wrapper.setProps({ visible: true })
    expect(selector.classes()).toContain('vxp-select__selector--focused')

    await wrapper.setProps({ disabled: true })
    expect(selector.classes()).toContain('vxp-select__selector--disabled')
    expect(selector.classes()).not.toContain('vxp-select__selector--focused')
  })

  it('toggle event', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(Select, {
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

  it('options show', async () => {
    const wrapper = mount(Select, {
      props: { options: OPTIONS }
    })

    expect(wrapper.find('.vxp-select__popper').exists()).toBe(false)

    await wrapper.trigger('click')
    expect(wrapper.find('.vxp-select__popper').exists()).toBe(true)
  })

  it('multiple', async () => {
    const wrapper = mount(Select)

    expect(wrapper.classes()).not.toContain('vxp-select--multiple')

    await wrapper.setProps({ multiple: true })
    expect(wrapper.classes()).toContain('vxp-select--multiple')
  })

  it('multiple value', async () => {
    const wrapper = mount(Select, {
      props: {
        visible: true,
        value: OPTIONS.slice(0, 2),
        multiple: true,
        options: OPTIONS
      }
    })
    let tags = wrapper.findAll('.vxp-select__tag:not(.vxp-select__counter)')

    expect(tags.length).toEqual(2)
    expect(wrapper.findAll('.vxp-option--selected').length).toEqual(2)
    tags.forEach((tag, i) => {
      expect(tag.text()).toEqual(OPTIONS[i])
    })

    await wrapper.setProps({ value: [] })
    tags = wrapper.findAll('.vxp-select__tag:not(.vxp-select__counter)')
    expect(tags.length).toEqual(0)
    expect(wrapper.findAll('.vxp-option--selected').length).toEqual(0)
  })

  it('tag close', async () => {
    const wrapper = mount(() => (
      <Select value={OPTIONS.slice(0, 2)} multiple options={OPTIONS}></Select>
    ))

    await wrapper.find('.vxp-tag__close').trigger('click')
    expect(wrapper.findAll('.vxp-select__tag:not(.vxp-select__counter)').length).toEqual(1)
  })

  it('prefix', () => {
    const wrapper = mount(() => <Select prefix={GithubB}></Select>)

    expect(wrapper.find('.vxp-select__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('prefix color', async () => {
    const wrapper = mount(() => <Select prefix={GithubB} prefix-color={'red'}></Select>)

    expect(wrapper.find('.vxp-select__prefix').attributes('style')).toContain('color: red;')
  })

  it('prefix slot', async () => {
    const wrapper = mount(() => (
      <Select prefix={GithubB}>
        {{
          prefix: () => <span class={'prefix'}></span>
        }}
      </Select>
    ))

    expect(wrapper.find('.vxp-select__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(false)
    expect(wrapper.find('.prefix').exists()).toBe(true)
  })

  it('suffix', async () => {
    const wrapper = mount(Select)

    expect(wrapper.find('.vxp-select__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(ChevronDown).exists()).toBe(true)

    await wrapper.setProps({ suffix: GithubB })
    expect(wrapper.findComponent(ChevronDown).exists()).toBe(false)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('suffix color', async () => {
    const wrapper = mount(() => <Select suffix={GithubB} suffix-color={'red'}></Select>)

    expect(wrapper.find('.vxp-select__suffix').attributes('style')).toContain('color: red;')
  })

  it('suffix slot', async () => {
    const wrapper = mount(() => (
      <Select suffix={GithubB}>
        {{
          suffix: () => <span class={'suffix'}></span>
        }}
      </Select>
    ))

    expect(wrapper.find('.vxp-select__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(false)
    expect(wrapper.find('.suffix').exists()).toBe(true)
  })

  it('size', () => {
    const wrapper = mount(() => <Select size={'large'}></Select>)

    expect(wrapper.find('.vxp-select__selector').classes()).toContain('vxp-select__selector--large')
  })

  it('state', () => {
    (['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <Select state={state}></Select>)

      expect(wrapper.find('.vxp-select__selector').classes()).toContain(
        `vxp-select__selector--${state}`
      )
    })
  })

  it('loading', async () => {
    const wrapper = mount(Select)

    expect(wrapper.find('.vxp-select__loading').exists()).toBe(false)
    expect(wrapper.findComponent(Spinner).exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.vxp-select__loading').exists()).toBe(true)
    expect(wrapper.findComponent(Spinner).exists()).toBe(true)
  })

  it('loading lock', async () => {
    const wrapper = mount(Select)
    const selector = wrapper.find('.vxp-select__selector')

    expect(selector.classes()).not.toContain('vxp-select__selector--loading')

    await wrapper.setProps({ loading: true, loadingLock: true })
    expect(selector.classes()).toContain('vxp-select__selector--loading')
  })

  it('loading icon', () => {
    const wrapper = mount(() => <Select loading loading-icon={GithubB}></Select>)

    expect(wrapper.findComponent(Spinner).exists()).toBe(false)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('single select', async () => {
    const onChange = vi.fn()
    const onSelect = vi.fn()
    const wrapper = mount(Select, {
      props: {
        visible: true,
        options: OPTIONS,
        onChange,
        onSelect
      }
    })

    await wrapper.find('.vxp-option').trigger('click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(OPTIONS[0], OPTIONS[0])
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenLastCalledWith(OPTIONS[0], OPTIONS[0])
    expect(wrapper.emitted()).toHaveProperty('update:value')
    expect(wrapper.emitted('update:value')![0]).toEqual([OPTIONS[0]])

    await wrapper.trigger('click')
    await wrapper.find('.vxp-option').trigger('click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledTimes(2)
  })

  it('multiple select', async () => {
    const onChange = vi.fn()
    const onSelect = vi.fn()
    const onCancel = vi.fn()
    const wrapper = mount(Select, {
      props: {
        visible: true,
        multiple: true,
        options: OPTIONS,
        onChange,
        onSelect,
        onCancel
      }
    })

    const options = wrapper.findAll('.vxp-option')

    await options[0].trigger('click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith([OPTIONS[0]], [OPTIONS[0]])
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenLastCalledWith(OPTIONS[0], OPTIONS[0])
    expect(onCancel).not.toHaveBeenCalled()
    expect(wrapper.emitted()).toHaveProperty('update:value')
    expect(wrapper.emitted('update:value')![0]).toEqual([[OPTIONS[0]]])

    await options[1].trigger('click')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith([OPTIONS[0], OPTIONS[1]], [OPTIONS[0], OPTIONS[1]])

    await options[0].trigger('click')
    expect(onChange).toHaveBeenCalledTimes(3)
    expect(onChange).toHaveBeenLastCalledWith([OPTIONS[1]], [OPTIONS[1]])
    expect(onCancel).toHaveBeenCalled()
    expect(onCancel).toHaveBeenLastCalledWith(OPTIONS[0], OPTIONS[0])

    await options[0].trigger('click')
    expect(onChange).toHaveBeenCalledTimes(4)
    expect(onChange).toHaveBeenLastCalledWith([OPTIONS[1], OPTIONS[0]], [OPTIONS[1], OPTIONS[0]])
  })

  it('clearable', async () => {
    const onClear = vi.fn()
    const wrapper = mount(Select, {
      props: {
        clearable: true,
        options: OPTIONS,
        placeholder: TEXT,
        onClear
      }
    })
    const selector = wrapper.find('.vxp-select__selector')

    expect(wrapper.find('.vxp-select__clear').exists()).toBe(false)

    await wrapper.setProps({ value: OPTIONS[0] })
    await selector.trigger('mouseenter')
    expect(wrapper.find('.vxp-select__clear').exists()).toBe(true)
    expect(wrapper.find('.vxp-select__suffix').exists()).toBe(true)
    expect(wrapper.find('.vxp-select__suffix').attributes('style')).toContain('opacity: 0%;')

    await wrapper.find('.vxp-select__clear').trigger('click')
    expect(onClear).toHaveBeenCalled()
    expect(selector.text()).toEqual(TEXT)
  })

  it('render input when filter', async () => {
    const wrapper = mount(Select, {
      props: {
        filter: true,
        visible: true,
        options: OPTIONS
      }
    })

    expect(wrapper.find('input').exists()).toBe(true)

    await wrapper.find('.vxp-option').trigger('click')
    expect(getValue(wrapper.find('input'))).toEqual(OPTIONS[0])

    await wrapper.trigger('click')
    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('input').element.disabled).toBe(true)

    await wrapper.setProps({ multiple: true })
    expect(wrapper.find('input').element.disabled).toBe(true)

    await wrapper.setProps({ disabled: false })
    await wrapper.trigger('click')
    await wrapper.find('.vxp-option').trigger('click')
    expect(getValue(wrapper.find('input'))).toEqual('')
  })

  it('filter', async () => {
    const wrapper = mount(Select, {
      props: {
        visible: true,
        filter: true,
        options: OPTIONS
      }
    })
    const input = wrapper.find('input').element

    emitInput(input, '2')
    await nextTick()
    expect(wrapper.findAll('.vxp-option').length).toEqual(1)
  })

  it('filter creatable', async () => {
    const wrapper = mount(Select, {
      props: {
        visible: true,
        filter: true,
        creatable: true,
        options: OPTIONS
      }
    })
    const input = wrapper.find('input').element

    emitInput(input, '2')
    await nextTick()
    expect(wrapper.findAll('.vxp-option').length).toEqual(2)

    emitInput(input, '22')
    await nextTick()
    expect(wrapper.findAll('.vxp-option').length).toEqual(1)

    emitInput(input, OPTIONS[1])
    await nextTick()
    expect(wrapper.findAll('.vxp-option').length).toEqual(1)

    emitInput(input, '222')
    await nextTick()
    await wrapper.find('.vxp-option').trigger('click')
    expect(getValue(wrapper.find('input'))).toEqual('222')

    await wrapper.trigger('click')
    emitInput(input, '22')
    await nextTick()
    expect(wrapper.findAll('.vxp-option').length).toEqual(2)
  })

  it('delete tag when filter in multiple', async () => {
    const wrapper = mount(Select, {
      props: {
        visible: true,
        filter: true,
        multiple: true,
        options: OPTIONS
      }
    })

    await wrapper.setProps({ value: [OPTIONS[0], OPTIONS[1]] })
    expect(wrapper.findAll('.vxp-select__tag:not(.vxp-select__counter)').length).toEqual(2)
    await wrapper.find('input').trigger('keydown', { key: 'Backspace' })
    expect(wrapper.findAll('.vxp-select__tag:not(.vxp-select__counter)').length).toEqual(1)
  })

  it('hitting option', async () => {
    const wrapper = mount(Select, {
      props: {
        visible: true,
        options: OPTIONS
      }
    })

    const options = wrapper.findAll('.vxp-option')

    await nextTick()
    await wrapper.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.findAll('.vxp-option--hitting').length).toEqual(1)
    expect(options[0].classes()).toContain('vxp-option--hitting')

    await wrapper.trigger('keydown', { key: 'ArrowUp' })
    expect(options[0].classes()).not.toContain('vxp-option--hitting')
    expect(options[3].classes()).toContain('vxp-option--hitting')

    await options[2].trigger('mousemove')
    expect(options[3].classes()).not.toContain('vxp-option--hitting')
    expect(options[2].classes()).toContain('vxp-option--hitting')
  })

  it('key config', () => {
    const wrapper = mount(Select, {
      props: {
        visible: true,
        value: 'v',
        options: [
          {
            l: 'l',
            v: 'v'
          }
        ],
        keyConfig: {
          label: 'l',
          value: 'v'
        }
      }
    })

    expect(wrapper.find('.vxp-select__control').text()).toEqual('l')
    expect(wrapper.find('.vxp-option--selected').exists()).toBe(true)
  })
})
