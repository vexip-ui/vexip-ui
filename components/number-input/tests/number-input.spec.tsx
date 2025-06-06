import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { globalIcons } from '@vexip-ui/config'
import { Github } from 'lucide-vue-next'
import { NumberInput } from '..'

import type { DOMWrapper } from '@vue/test-utils'

vi.useFakeTimers()

const NUMBER = 100

function getValue(wrapper: DOMWrapper<Element>) {
  return (wrapper.element as HTMLInputElement).value
}

function emitInput(wrapper: DOMWrapper<Element>, value: number) {
  const input = wrapper.element as HTMLInputElement
  input.value = String(value)
  input.dispatchEvent(new Event('input'))
}

function emitChange(wrapper: DOMWrapper<Element>, value: number) {
  const input = wrapper.element as HTMLInputElement
  input.value = String(value)
  input.dispatchEvent(new Event('change'))
}

describe('NumberInput', () => {
  it('render', () => {
    const wrapper = mount(() => <NumberInput placeholder={'test'}></NumberInput>)

    expect(wrapper.classes()).toContain('vxp-input-vars')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').attributes('placeholder')).toEqual('test')
    expect(wrapper.find('.vxp-number-input__plus').exists()).toBe(true)
    expect(wrapper.find('.vxp-number-input__minus').exists()).toBe(true)
  })

  it('value', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: NUMBER },
    })

    expect(getValue(wrapper.find('input'))).toEqual(String(NUMBER))

    await wrapper.setProps({ value: null })
    expect(getValue(wrapper.find('input'))).toEqual('')
  })

  it('invalid value', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: NUMBER },
    })

    expect(getValue(wrapper.find('input'))).toEqual(String(NUMBER))

    await wrapper.setProps({ value: 'abc' })
    expect(getValue(wrapper.find('input'))).toEqual('')
  })

  it('scientific notation', async () => {
    const value = 1.1641532182693484e-10
    const wrapper = mount(NumberInput, {
      props: { value },
    })

    expect(getValue(wrapper.find('input'))).toEqual(String(value))

    await wrapper.setProps({ value: null })
    expect(getValue(wrapper.find('input'))).toEqual('')
  })

  it('disabled', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input').element

    expect(wrapper.classes()).not.toContain('vxp-number-input--disabled')
    expect(input.disabled).toBe(false)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('vxp-number-input--disabled')
    expect(input.disabled).toBe(true)
  })

  it('prefix', async () => {
    const onClick = vi.fn()
    const wrapper = mount(() => <NumberInput prefix={Github} onPrefixClick={onClick}></NumberInput>)

    expect(wrapper.find('.vxp-number-input__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(Github).exists()).toBe(true)

    await wrapper.find('.vxp-number-input__prefix').trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('prefix color', async () => {
    const wrapper = mount(() => <NumberInput prefix={Github} prefix-color={'red'}></NumberInput>)

    expect(wrapper.find('.vxp-number-input__prefix').attributes('style')).toContain('color: red;')
  })

  it('prefix slot', async () => {
    const wrapper = mount(() => (
      <NumberInput prefix={Github}>
        {{
          prefix: () => <span class={'prefix'}></span>,
        }}
      </NumberInput>
    ))

    expect(wrapper.find('.vxp-number-input__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(Github).exists()).toBe(false)
    expect(wrapper.find('.prefix').exists()).toBe(true)
  })

  it('suffix', async () => {
    const onClick = vi.fn()
    const wrapper = mount(() => <NumberInput suffix={Github} onSuffixClick={onClick}></NumberInput>)

    expect(wrapper.find('.vxp-number-input__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(Github).exists()).toBe(true)

    await wrapper.find('.vxp-number-input__suffix').trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('suffix color', async () => {
    const wrapper = mount(() => <NumberInput suffix={Github} suffix-color={'red'}></NumberInput>)

    expect(wrapper.find('.vxp-number-input__suffix').attributes('style')).toContain('color: red;')
  })

  it('suffix slot', async () => {
    const wrapper = mount(() => (
      <NumberInput suffix={Github}>
        {{
          suffix: () => <span class={'suffix'}></span>,
        }}
      </NumberInput>
    ))

    expect(wrapper.find('.vxp-number-input__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(Github).exists()).toBe(false)
    expect(wrapper.find('.suffix').exists()).toBe(true)
  })

  it('size', () => {
    const wrapper = mount(() => <NumberInput size={'large'}></NumberInput>)

    expect(wrapper.find('.vxp-number-input').classes()).toContain('vxp-number-input--large')
  })

  it('state', () => {
    ;(['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <NumberInput state={state}></NumberInput>)

      expect(wrapper.find('.vxp-number-input').classes()).toContain(`vxp-number-input--${state}`)
    })
  })

  it('loading', async () => {
    const wrapper = mount(NumberInput)

    expect(wrapper.find('.vxp-number-input__loading').exists()).toBe(false)
    expect(wrapper.findComponent(globalIcons.value.loading.icon).exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.vxp-number-input__loading').exists()).toBe(true)
    expect(wrapper.findComponent(globalIcons.value.loading.icon).exists()).toBe(true)
  })

  it('loading lock', async () => {
    const wrapper = mount(NumberInput)

    expect(wrapper.classes()).not.toContain('vxp-number-input--loading')

    await wrapper.setProps({ loading: true, loadingLock: true })
    expect(wrapper.classes()).toContain('vxp-number-input--loading')
  })

  it('loading icon', () => {
    const wrapper = mount(() => <NumberInput loading loading-icon={Github}></NumberInput>)

    expect(wrapper.findComponent(globalIcons.value.loading.icon).exists()).toBe(false)
    expect(wrapper.findComponent(Github).exists()).toBe(true)
  })

  it('change event', async () => {
    const onChange = vi.fn()
    const wrapper = mount(NumberInput, {
      props: { onChange },
    })
    const input = wrapper.find('input')

    emitChange(input, NUMBER)
    await nextTick()
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(NUMBER)
    expect(wrapper.emitted()).toHaveProperty('update:value')
    expect(wrapper.emitted()['update:value'][0]).toEqual([NUMBER])
  })

  it('input event', async () => {
    const onInput = vi.fn()
    const wrapper = mount(NumberInput, {
      props: { onInput },
    })
    const input = wrapper.find('input')

    emitInput(input, NUMBER)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onInput).toHaveBeenCalled()
  })

  it('input throttle', async () => {
    const onInput = vi.fn()
    const wrapper = mount(NumberInput, {
      props: { onInput },
    })
    const input = wrapper.find('input')

    emitInput(input, NUMBER)
    emitInput(input, NUMBER)
    emitInput(input, NUMBER)
    emitInput(input, NUMBER)
    emitInput(input, NUMBER)
    expect(onInput).toHaveBeenCalledTimes(1)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onInput).toHaveBeenCalledTimes(2)
  })

  it('focus/blur event', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const wrapper = mount(NumberInput, {
      props: { onFocus, onBlur },
    })
    const input = wrapper.find('input')

    expect(wrapper.classes()).not.toContain('vxp-number-input--focused')

    await input.trigger('focus')
    expect(wrapper.classes()).toContain('vxp-number-input--focused')
    expect(onFocus).toHaveBeenCalled()

    await input.trigger('blur')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-number-input--focused')
    expect(onBlur).toHaveBeenCalled()
  })

  it('clearable', async () => {
    const onClear = vi.fn()
    const wrapper = mount(NumberInput, {
      props: {
        clearable: true,
        suffix: Github,
        onClear,
      },
    })

    expect(wrapper.find('.vxp-select__clear').exists()).toBe(false)

    await wrapper.setProps({ value: 1 })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.vxp-number-input__clear').exists()).toBe(true)
    expect(wrapper.find('.vxp-number-input__suffix').exists()).toBe(true)
    expect(wrapper.find('.vxp-number-input__suffix').attributes('style')).toContain('opacity: 0%;')

    await wrapper.find('.vxp-number-input__clear').trigger('click')
    expect(onClear).toHaveBeenCalled()
    expect(getValue(wrapper.find('.vxp-number-input__control'))).toEqual('')
  })

  it('clearable with sync', async () => {
    const onClear = vi.fn()
    const wrapper = mount(NumberInput, {
      props: {
        clearable: true,
        sync: true,
        onClear,
      },
    })

    expect(wrapper.find('.vxp-select__clear').exists()).toBe(false)

    await wrapper.setProps({ value: 1 })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.vxp-number-input__clear').exists()).toBe(true)

    await wrapper.find('.vxp-number-input__clear').trigger('click')
    expect(onClear).toHaveBeenCalled()
    expect(getValue(wrapper.find('.vxp-number-input__control'))).toEqual('')
  })

  it('enter event', async () => {
    const onEnter = vi.fn()
    const wrapper = mount(() => <NumberInput onEnter={onEnter}></NumberInput>)

    await nextTick()
    await wrapper.find('input').trigger('keyup', { key: 'Enter' })
    expect(onEnter).toHaveBeenCalled()
  })

  it('change via keys', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input')

    await nextTick()
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(getValue(input)).toEqual('1')

    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(getValue(input)).toEqual('0')

    await input.trigger('keydown.ctrl', { key: 'ArrowUp' })
    expect(getValue(input)).toEqual('100')

    await input.trigger('keydown.ctrl', { key: 'ArrowDown' })
    expect(getValue(input)).toEqual('0')

    await input.trigger('keydown.alt', { key: 'ArrowUp' })
    expect(getValue(input)).toEqual('0.1')

    await input.trigger('keydown.alt', { key: 'ArrowDown' })
    expect(getValue(input)).toEqual('0')

    await input.trigger('keydown.shift', { key: 'ArrowUp' })
    expect(getValue(input)).toEqual('10')

    await input.trigger('keydown.shift', { key: 'ArrowDown' })
    expect(getValue(input)).toEqual('0')
  })

  it('change via actions', async () => {
    const wrapper = mount(NumberInput)
    const input = wrapper.find('input')
    const plus = wrapper.find('.vxp-number-input__plus')
    const minus = wrapper.find('.vxp-number-input__minus')

    await plus.trigger('pointerdown')
    expect(getValue(input)).toEqual('1')
    expect(wrapper.find('.vxp-number-input__plus').classes()).toContain(
      'vxp-number-input__plus--holding',
    )

    await minus.trigger('pointerdown')
    expect(getValue(input)).toEqual('0')
    expect(wrapper.find('.vxp-number-input__minus').classes()).toContain(
      'vxp-number-input__minus--holding',
    )

    await plus.trigger('pointerdown.ctrl')
    expect(getValue(input)).toEqual('100')

    await minus.trigger('pointerdown.ctrl')
    expect(getValue(input)).toEqual('0')

    await plus.trigger('pointerdown.alt')
    expect(getValue(input)).toEqual('0.1')

    await minus.trigger('pointerdown.alt')
    expect(getValue(input)).toEqual('0')

    await plus.trigger('pointerdown.shift')
    expect(getValue(input)).toEqual('10')

    await minus.trigger('pointerdown.shift')
    expect(getValue(input)).toEqual('0')
  })

  it('formatter', async () => {
    const wrapper = mount(NumberInput, {
      props: {
        formatter: (v: number) => `${v}Y`,
      },
    })

    await wrapper.setProps({ value: NUMBER })
    expect(getValue(wrapper.find('input'))).toEqual(`${NUMBER}Y`)
  })

  it('control class', () => {
    const wrapper = mount(() => <NumberInput control-class={'test'}></NumberInput>)

    expect(wrapper.find('input').classes()).toContain('test')
  })

  it('precision', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 100.222, precision: 2 },
    })

    expect(getValue(wrapper.find('input'))).toEqual('100.22')

    await wrapper.setProps({ value: 111.3456 })
    expect(getValue(wrapper.find('input'))).toEqual('111.35')

    await wrapper.setProps({ value: 200.2 })
    expect(getValue(wrapper.find('input'))).toEqual('200.2')
  })

  it('steps', async () => {
    const wrapper = mount(() => (
      <NumberInput step={2} ctrl-step={3} alt-step={4} shift-step={5}></NumberInput>
    ))
    const input = wrapper.find('input')

    await nextTick()
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(getValue(input)).toEqual('2')

    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(getValue(input)).toEqual('0')

    await input.trigger('keydown.ctrl', { key: 'ArrowUp' })
    expect(getValue(input)).toEqual('3')

    await input.trigger('keydown.ctrl', { key: 'ArrowDown' })
    expect(getValue(input)).toEqual('0')

    await input.trigger('keydown.alt', { key: 'ArrowUp' })
    expect(getValue(input)).toEqual('4')

    await input.trigger('keydown.alt', { key: 'ArrowDown' })
    expect(getValue(input)).toEqual('0')

    await input.trigger('keydown.shift', { key: 'ArrowUp' })
    expect(getValue(input)).toEqual('5')

    await input.trigger('keydown.shift', { key: 'ArrowDown' })
    expect(getValue(input)).toEqual('0')
  })

  it('sync', async () => {
    const onChange = vi.fn()
    const wrapper = mount(NumberInput, {
      props: { sync: true, onChange },
    })
    const input = wrapper.find('input')
    const plus = wrapper.find('.vxp-number-input__plus')

    await plus.trigger('pointerdown')
    document.dispatchEvent(new Event('pointerup'))
    await nextTick()
    expect(getValue(input)).toEqual('1')
    expect(wrapper.emitted()).toHaveProperty('update:value')
    expect(wrapper.emitted()['update:value'][0]).toEqual([1])

    emitInput(input, NUMBER)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.emitted()['update:value'][1]).toEqual([NUMBER])

    emitChange(input, NUMBER)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onChange).toHaveBeenCalledWith(NUMBER)
    expect(wrapper.emitted()['update:value'][2]).toBeUndefined()
  })

  it('sync step', async () => {
    const onChange = vi.fn()
    const wrapper = mount(NumberInput, {
      props: { syncStep: true, onChange },
    })
    const input = wrapper.find('input')
    const plus = wrapper.find('.vxp-number-input__plus')

    await plus.trigger('pointerdown')
    expect(getValue(input)).toEqual('1')
    expect(wrapper.emitted()).toHaveProperty('update:value')
    expect(wrapper.emitted()['update:value'][0]).toEqual([1])

    emitInput(input, NUMBER)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.emitted()['update:value'][1]).toBeUndefined()

    emitChange(input, NUMBER)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onChange).toHaveBeenCalledWith(NUMBER)
    expect(wrapper.emitted()['update:value'][1]).toEqual([NUMBER])
  })

  it('range', async () => {
    const onChange = vi.fn()
    const wrapper = mount(NumberInput, {
      props: { min: 5, max: 10, onChange },
    })
    const input = wrapper.find('input')

    emitChange(input, 11)
    await nextTick()
    expect(onChange).toHaveBeenLastCalledWith(10)
    expect(wrapper.find('.vxp-number-input__plus').classes()).toContain(
      'vxp-number-input__plus--disabled',
    )

    emitChange(input, 4)
    await nextTick()
    expect(onChange).toHaveBeenLastCalledWith(5)
    expect(wrapper.find('.vxp-number-input__minus').classes()).toContain(
      'vxp-number-input__minus--disabled',
    )

    emitInput(input, 11)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-number-input').classes()).toContain('vxp-number-input--out-of-range')
  })

  // # 365
  it('ensure value sync when two way binding', async () => {
    const wrapper = mount(NumberInput, {
      props: { precision: 2 },
    })
    const input = wrapper.find('input')

    emitChange(input, 1.11)
    await nextTick()
    expect(wrapper.emitted()).toHaveProperty('update:value')
    expect(wrapper.emitted()['update:value'][0]).toEqual([1.11])

    emitChange(input, 1.111)
    await nextTick()
    expect(wrapper.emitted()['update:value'][1]).toEqual([1.11])

    emitChange(input, 1.116)
    await nextTick()
    expect(wrapper.emitted()['update:value'][2]).toEqual([1.12])
  })

  it('ignore invalid init value', () => {
    const wrapper = mount(NumberInput, {
      props: { value: 'invalid' },
    })

    expect(getValue(wrapper.find('input'))).toEqual('')
  })
})
