import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Loader2 } from 'lucide-vue-next'
import { Textarea } from '..'

import type { DOMWrapper } from '@vue/test-utils'

vi.useFakeTimers()

const TEXT = 'Text'

function getValue(wrapper: DOMWrapper<Element>) {
  return (wrapper.element as HTMLTextAreaElement).value
}

function emitInput(textarea: HTMLTextAreaElement, value: string) {
  textarea.value = value
  textarea.dispatchEvent(new Event('input'))
}

function emitChange(textarea: HTMLTextAreaElement, value: string) {
  textarea.value = value
  textarea.dispatchEvent(new Event('change'))
}

describe('Textarea', () => {
  it('render', () => {
    const wrapper = mount(() => <Textarea placeholder={TEXT}></Textarea>)

    expect(wrapper.find('.vxp-textarea').classes()).toContain('vxp-textarea-vars')
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('textarea').attributes('placeholder')).toEqual(TEXT)
  })

  it('value', async () => {
    const wrapper = mount(Textarea, {
      props: { value: TEXT }
    })

    expect(getValue(wrapper.find('textarea'))).toEqual(TEXT)

    await wrapper.setProps({ value: '' })
    expect(getValue(wrapper.find('textarea'))).toEqual('')
  })

  it('disabled', async () => {
    const wrapper = mount(Textarea)
    const textarea = wrapper.find('textarea').element

    expect(wrapper.classes()).not.toContain('vxp-textarea--disabled')
    expect(textarea.disabled).toBe(false)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('vxp-textarea--disabled')
    expect(textarea.disabled).toBe(true)
  })

  it('state', () => {
    ;(['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <Textarea state={state}></Textarea>)

      expect(wrapper.find('.vxp-textarea').classes()).toContain(`vxp-textarea--${state}`)
    })
  })

  it('loading', async () => {
    const wrapper = mount(Textarea)

    expect(wrapper.find('.vxp-textarea__loading').exists()).toBe(false)
    expect(wrapper.findComponent(Loader2).exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.vxp-textarea__loading').exists()).toBe(true)
    expect(wrapper.findComponent(Loader2).exists()).toBe(true)
  })

  it('loading lock', async () => {
    const wrapper = mount(Textarea)

    expect(wrapper.classes()).not.toContain('vxp-textarea--loading')

    await wrapper.setProps({ loading: true, loadingLock: true })
    expect(wrapper.classes()).toContain('vxp-textarea--loading')
  })

  it('change event', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Textarea, {
      props: { onChange }
    })
    const textarea = wrapper.find('textarea').element

    emitChange(textarea, TEXT)
    await nextTick()
    expect(onChange).toHaveBeenCalled()
    expect(wrapper.emitted()).toHaveProperty('update:value')
  })

  it('input event', async () => {
    const onInput = vi.fn()
    const wrapper = mount(Textarea, {
      props: { onInput }
    })
    const textarea = wrapper.find('textarea').element

    emitInput(textarea, TEXT)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onInput).toHaveBeenCalled()
  })

  it('input throttle', async () => {
    const onInput = vi.fn()
    const wrapper = mount(Textarea, {
      props: { onInput }
    })
    const textarea = wrapper.find('textarea').element

    emitInput(textarea, TEXT)
    emitInput(textarea, TEXT)
    emitInput(textarea, TEXT)
    emitInput(textarea, TEXT)
    emitInput(textarea, TEXT)
    expect(onInput).toHaveBeenCalledTimes(1)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onInput).toHaveBeenCalledTimes(2)
  })

  it('focus/blur event', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const wrapper = mount(Textarea, {
      props: { onFocus, onBlur }
    })
    const textarea = wrapper.find('textarea')

    expect(wrapper.classes()).not.toContain('vxp-textarea--focused')

    await textarea.trigger('focus')
    expect(wrapper.classes()).toContain('vxp-textarea--focused')
    expect(onFocus).toHaveBeenCalled()

    await textarea.trigger('blur')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-textarea--focused')
    expect(onBlur).toHaveBeenCalled()
  })

  it('enter event', async () => {
    const onEnter = vi.fn()
    const wrapper = mount(() => <Textarea onEnter={onEnter}></Textarea>)

    await wrapper.find('textarea').trigger('keyup', { key: 'Enter' })
    expect(onEnter).toHaveBeenCalled()
  })

  it('max length', async () => {
    const wrapper = mount(Textarea, {
      props: { maxLength: 2 }
    })
    const textarea = wrapper.find('textarea').element

    expect(wrapper.find('.vxp-textarea__count').exists()).toBe(true)
    expect(wrapper.find('.vxp-textarea__count').text()).toEqual('0/2')

    emitChange(textarea, TEXT)
    await nextTick()
    expect(getValue(wrapper.find('textarea'))).toEqual(TEXT.slice(0, 2))
    expect(wrapper.find('.vxp-textarea__count').text()).toEqual('2/2')

    await wrapper.setProps({ maxLength: Infinity })
    expect(wrapper.find('.vxp-textarea__count').text()).toEqual('2')
  })

  it('rows', () => {
    const wrapper = mount(() => <Textarea rows={3}></Textarea>)

    expect(wrapper.find('textarea').element.rows).toEqual('3')
  })

  it('no resize', async () => {
    const wrapper = mount(Textarea)

    expect(wrapper.classes()).not.toContain('vxp-textarea--no-resize')

    await wrapper.setProps({ noResize: true })
    expect(wrapper.classes()).toContain('vxp-textarea--no-resize')
  })

  it('sync', async () => {
    const wrapper = mount(Textarea, {
      props: { sync: true }
    })
    const textarea = wrapper.find('textarea').element

    emitInput(textarea, TEXT)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.emitted()).toHaveProperty('update:value')
    expect(wrapper.emitted()['update:value'][0]).toEqual([TEXT])
  })
})
