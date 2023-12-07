import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { EyeR, EyeSlashR, GithubB, Spinner } from '@vexip-ui/icons'
import { Input } from '..'

import type { DOMWrapper } from '@vue/test-utils'

vi.useFakeTimers()

const TEXT = 'Text'

function getValue(wrapper: DOMWrapper<Element>) {
  return (wrapper.element as HTMLInputElement).value
}

function emitInput(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new Event('input'))
}

function emitChange(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new Event('change'))
}

describe('Input', () => {
  it('render', () => {
    const wrapper = mount(() => <Input placeholder={TEXT}></Input>)

    expect(wrapper.find('.vxp-input').classes()).toContain('vxp-input-vars')
    expect(wrapper.find('.vxp-input').classes()).toContain('vxp-input-wrapper')
    expect(wrapper.find('.vxp-input').classes()).toContain('vxp-input--text')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').attributes('placeholder')).toEqual(TEXT)
  })

  it('value', async () => {
    const wrapper = mount(Input, {
      props: { value: TEXT }
    })

    expect(getValue(wrapper.find('input'))).toEqual(TEXT)

    await wrapper.setProps({ value: '' })
    expect(getValue(wrapper.find('input'))).toEqual('')
  })

  it('disabled', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input').element

    expect(wrapper.classes()).not.toContain('vxp-input--disabled')
    expect(input.disabled).toBe(false)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('vxp-input--disabled')
    expect(input.disabled).toBe(true)
  })

  it('prefix', async () => {
    const onClick = vi.fn()
    const wrapper = mount(() => <Input prefix={GithubB} onPrefixClick={onClick}></Input>)

    expect(wrapper.find('.vxp-input__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)

    await wrapper.find('.vxp-input__prefix').trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('prefix color', async () => {
    const wrapper = mount(() => <Input prefix={GithubB} prefix-color={'red'}></Input>)

    expect(wrapper.find('.vxp-input__prefix').attributes('style')).toContain('color: red;')
  })

  it('prefix slot', async () => {
    const wrapper = mount(() => (
      <Input prefix={GithubB}>
        {{
          prefix: () => <span class={'prefix'}></span>
        }}
      </Input>
    ))

    expect(wrapper.find('.vxp-input__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(false)
    expect(wrapper.find('.prefix').exists()).toBe(true)
  })

  it('suffix', async () => {
    const onClick = vi.fn()
    const wrapper = mount(() => <Input suffix={GithubB} onSuffixClick={onClick}></Input>)

    expect(wrapper.find('.vxp-input__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)

    await wrapper.find('.vxp-input__suffix').trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('suffix color', async () => {
    const wrapper = mount(() => <Input suffix={GithubB} suffix-color={'red'}></Input>)

    expect(wrapper.find('.vxp-input__suffix').attributes('style')).toContain('color: red;')
  })

  it('suffix slot', async () => {
    const wrapper = mount(() => (
      <Input suffix={GithubB}>
        {{
          suffix: () => <span class={'suffix'}></span>
        }}
      </Input>
    ))

    expect(wrapper.find('.vxp-input__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(false)
    expect(wrapper.find('.suffix').exists()).toBe(true)
  })

  it('size', () => {
    const wrapper = mount(() => <Input size={'large'}></Input>)

    expect(wrapper.find('.vxp-input').classes()).toContain('vxp-input--large')
  })

  it('state', () => {
    ;(['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <Input state={state}></Input>)

      expect(wrapper.find('.vxp-input').classes()).toContain(`vxp-input--${state}`)
    })
  })

  it('loading', async () => {
    const wrapper = mount(Input)

    expect(wrapper.find('.vxp-input__loading').exists()).toBe(false)
    expect(wrapper.findComponent(Spinner).exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.vxp-input__loading').exists()).toBe(true)
    expect(wrapper.findComponent(Spinner).exists()).toBe(true)
  })

  it('loading lock', async () => {
    const wrapper = mount(Input)

    expect(wrapper.classes()).not.toContain('vxp-input--loading')

    await wrapper.setProps({ loading: true, loadingLock: true })
    expect(wrapper.classes()).toContain('vxp-input--loading')
  })

  it('loading icon', () => {
    const wrapper = mount(() => <Input loading loading-icon={GithubB}></Input>)

    expect(wrapper.findComponent(Spinner).exists()).toBe(false)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('change event', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Input, {
      props: { onChange }
    })
    const input = wrapper.find('input').element

    emitChange(input, TEXT)
    await nextTick()
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(TEXT)
    expect(wrapper.emitted()).toHaveProperty('update:value')
    expect(wrapper.emitted()['update:value'][0]).toEqual([TEXT])
  })

  it('input event', async () => {
    const onInput = vi.fn()
    const wrapper = mount(Input, {
      props: { onInput }
    })
    const input = wrapper.find('input').element

    emitInput(input, TEXT)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onInput).toHaveBeenCalled()
  })

  it('number value', async () => {
    const onChange = vi.fn()
    const onInput = vi.fn()
    const wrapper = mount(Input, {
      props: {
        value: 1,
        onChange,
        onInput
      }
    })
    const input = wrapper.find('input').element

    emitInput(input, '2')
    vi.runOnlyPendingTimers()
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onInput).toHaveBeenCalledWith(2)

    emitChange(input, '3')
    await nextTick()
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('input throttle', async () => {
    const onInput = vi.fn()
    const wrapper = mount(Input, {
      props: { onInput }
    })
    const input = wrapper.find('input').element

    emitInput(input, TEXT)
    emitInput(input, TEXT)
    emitInput(input, TEXT)
    emitInput(input, TEXT)
    emitInput(input, TEXT)
    expect(onInput).toHaveBeenCalledTimes(1)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onInput).toHaveBeenCalledTimes(2)
  })

  it('focus/blur event', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const wrapper = mount(Input, {
      props: { onFocus, onBlur }
    })
    const input = wrapper.find('input')

    expect(wrapper.classes()).not.toContain('vxp-input--focused')

    await input.trigger('focus')
    expect(wrapper.classes()).toContain('vxp-input--focused')
    expect(onFocus).toHaveBeenCalled()

    await input.trigger('blur')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-input--focused')
    expect(onBlur).toHaveBeenCalled()
  })

  it('clearable', async () => {
    const onClear = vi.fn()
    const wrapper = mount(Input, {
      props: {
        clearable: true,
        suffix: GithubB,
        onClear
      }
    })

    expect(wrapper.find('.vxp-select__clear').exists()).toBe(false)

    await wrapper.setProps({ value: TEXT })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.vxp-input__clear').exists()).toBe(true)
    expect(wrapper.find('.vxp-input__suffix').exists()).toBe(true)
    expect(wrapper.find('.vxp-input__suffix').attributes('style')).toContain('opacity: 0%;')

    await wrapper.find('.vxp-input__clear').trigger('click')
    expect(onClear).toHaveBeenCalled()
    expect(getValue(wrapper.find('.vxp-input__control'))).toEqual('')
  })

  it('clearable with sync', async () => {
    const onClear = vi.fn()
    const wrapper = mount(Input, {
      props: {
        clearable: true,
        sync: true,
        onClear
      }
    })

    expect(wrapper.find('.vxp-select__clear').exists()).toBe(false)

    await wrapper.setProps({ value: TEXT })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.vxp-input__clear').exists()).toBe(true)

    await wrapper.find('.vxp-input__clear').trigger('click')
    expect(onClear).toHaveBeenCalled()
    expect(getValue(wrapper.find('.vxp-input__control'))).toEqual('')
  })

  it('enter event', async () => {
    const onEnter = vi.fn()
    const wrapper = mount(() => <Input onEnter={onEnter}></Input>)

    await wrapper.find('input').trigger('keyup', { key: 'Enter' })
    expect(onEnter).toHaveBeenCalled()
  })

  it('before', async () => {
    const wrapper = mount(() => <Input before={TEXT}></Input>)

    expect(wrapper.find('.vxp-input__before').exists()).toBe(true)
    expect(wrapper.find('.vxp-input-wrapper').classes()).not.toContain('vxp-input')
  })

  it('before slot', async () => {
    const wrapper = mount(() => (
      <Input before={TEXT}>
        {{
          before: () => <span class={'before'}></span>
        }}
      </Input>
    ))

    expect(wrapper.find('.vxp-input__before').exists()).toBe(true)
    expect(wrapper.find('.vxp-input__before').text()).toEqual('')
    expect(wrapper.find('.vxp-input-wrapper').classes()).not.toContain('vxp-input')
  })

  it('after', async () => {
    const wrapper = mount(() => <Input after={TEXT}></Input>)

    expect(wrapper.find('.vxp-input__after').exists()).toBe(true)
    expect(wrapper.find('.vxp-input-wrapper').classes()).not.toContain('vxp-input')
  })

  it('after slot', async () => {
    const wrapper = mount(() => (
      <Input after={TEXT}>
        {{
          after: () => <span class={'after'}></span>
        }}
      </Input>
    ))

    expect(wrapper.find('.vxp-input__after').exists()).toBe(true)
    expect(wrapper.find('.vxp-input__after').text()).toEqual('')
    expect(wrapper.find('.vxp-input-wrapper').classes()).not.toContain('vxp-input')
  })

  it('max length', async () => {
    const wrapper = mount(() => <Input max-length={2}></Input>)
    const input = wrapper.find('input').element

    expect(wrapper.find('.vxp-input__count').exists()).toBe(true)

    emitChange(input, TEXT)
    await nextTick()
    expect(getValue(wrapper.find('input'))).toEqual(TEXT.slice(0, 2))
  })

  it('password', () => {
    const wrapper = mount(() => <Input type={'password'}></Input>)

    expect(wrapper.find('.vxp-input').classes()).toContain('vxp-input--password')
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('plain password', async () => {
    const wrapper = mount(() => <Input type={'password'} plain-password></Input>)

    expect(wrapper.find('.vxp-input__password').exists()).toBe(true)
    expect(wrapper.findComponent(EyeSlashR).exists()).toBe(true)

    await wrapper.find('.vxp-input__password').trigger('click')
    expect(wrapper.find('input[type="password"]').exists()).toBe(false)
    expect(wrapper.findComponent(EyeR).exists()).toBe(true)
  })

  it('formatter', async () => {
    const wrapper = mount(Input, {
      props: {
        formatter: (v: string) => `${v}1`
      }
    })

    await wrapper.setProps({ value: TEXT })
    expect(getValue(wrapper.find('input'))).toEqual(`${TEXT}1`)
  })

  it('control class', () => {
    const wrapper = mount(() => <Input control-class={'test'}></Input>)

    expect(wrapper.find('input').classes()).toContain('test')
  })

  it('sync', async () => {
    const wrapper = mount(Input, {
      props: { sync: true }
    })
    const input = wrapper.find('input').element

    emitInput(input, TEXT)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.emitted()).toHaveProperty('update:value')
    expect(wrapper.emitted()['update:value'][0]).toEqual([TEXT])
  })
})
