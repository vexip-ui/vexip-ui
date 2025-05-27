import { FormItem } from '@/components/form-item'
import { Input } from '@/components/input'

import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Form } from '..'

vi.useFakeTimers()

describe('Form', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Form>
        <FormItem label={'input'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))

    expect(wrapper.find('.vxp-form').classes()).toContain('vxp-form-vars')
    expect(wrapper.find('.vxp-form__item').exists()).toBe(true)
    expect(wrapper.find('.vxp-form__label').text()).toEqual('input')
    expect(wrapper.findComponent(Input).exists()).toBe(true)
  })

  it('inline', () => {
    const wrapper = mount(() => (
      <Form inline>
        <FormItem label={'input'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))

    expect(wrapper.find('.vxp-form').classes()).toContain('vxp-form--inline')
  })

  it('item required prop', () => {
    const wrapper = mount(() => (
      <Form>
        <FormItem required label={'input'} prop={'input'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))

    expect(wrapper.find('.vxp-form__item').classes()).toContain('vxp-form__item--required')
  })

  it('form rule required', () => {
    const rules = {
      input: { required: true },
    }
    const wrapper = mount(() => (
      <Form rules={rules}>
        <FormItem label={'input'} prop={'input'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))

    expect(wrapper.find('.vxp-form__item').classes()).toContain('vxp-form__item--required')
  })

  it('item rule required', () => {
    const wrapper = mount(() => (
      <Form>
        <FormItem label={'input'} prop={'input'} rules={{ required: true }}>
          <Input></Input>
        </FormItem>
      </Form>
    ))

    expect(wrapper.find('.vxp-form__item').classes()).toContain('vxp-form__item--required')
  })

  it('all required', () => {
    const wrapper = mount(() => (
      <Form all-required>
        <FormItem label={'input1'} prop={'input1'}>
          <Input></Input>
        </FormItem>
        <FormItem label={'input2'} prop={'input2'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))

    wrapper.findAll('.vxp-form__item').forEach(item => {
      expect(item.classes()).toContain('vxp-form__item--required')
    })
  })

  it('hide asterisk', () => {
    const wrapper = mount(() => (
      <Form hide-asterisk>
        <FormItem required label={'input'} prop={'input'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))

    expect(wrapper.find('.vxp-form__item').classes()).not.toContain('vxp-form__item--required')
  })

  it('hide label', () => {
    const wrapper = mount(() => (
      <Form hide-label>
        <FormItem label={'input'} prop={'input'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))

    expect(wrapper.find('.vxp-form__label').exists()).toBe(false)
  })

  it('item hide label', () => {
    const wrapper = mount(() => (
      <Form>
        <FormItem hide-label label={'input'} prop={'input'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))

    expect(wrapper.find('.vxp-form__label').exists()).toBe(false)
  })

  it('label align', () => {
    ;(['right', 'top', 'left'] as const).forEach(align => {
      const wrapper = mount(() => (
        <Form label-align={align}>
          <FormItem label={'input'} prop={'input'}>
            <Input></Input>
          </FormItem>
        </Form>
      ))

      expect(wrapper.find('.vxp-form').classes()).toContain(`vxp-form--label-${align}`)
    })
  })

  it('native form', () => {
    const wrapper = mount(() => (
      <Form action={'action'}>
        <FormItem label={'input'} prop={'input'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))

    expect(wrapper.find('.vxp-form').attributes('action')).toEqual('action')
    expect(wrapper.find('.vxp-form').attributes('method')).toEqual('post')
  })

  it('item label for', () => {
    const wrapper = mount(() => (
      <Form>
        <FormItem label={'input'} prop={'input'} html-for={'input'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))

    expect(wrapper.find('.vxp-form__label').attributes('for')).toEqual('input')
  })

  it('error tip', async () => {
    const wrapper = mount(() => (
      <Form>
        <FormItem required label={'input'} prop={'input'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))
    const form = wrapper.findComponent(Form).vm
    const item = wrapper.find('.vxp-form__item')

    expect(item.find('.vxp-form__error-tip').exists()).toBe(false)

    await form.validate()
    expect(item.find('.vxp-form__error-tip').exists()).toBe(true)

    form.clearError()
    await nextTick()
    expect(item.find('.vxp-form__error-tip').exists()).toBe(false)
  })

  it('hide error tip', async () => {
    const wrapper = mount(() => (
      <Form>
        <FormItem required hide-error-tip label={'input'} prop={'input'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))
    const form = wrapper.findComponent(Form).vm
    const item = wrapper.find('.vxp-form__item')

    expect(item.find('.vxp-form__error-tip').exists()).toBe(false)

    await form.validate()
    expect(item.find('.vxp-form__error-tip').exists()).toBe(false)
  })

  it('help tip', async () => {
    const wrapper = mount(() => (
      <Form>
        <FormItem required label={'input'} prop={'input'} help={'help'}>
          <Input></Input>
        </FormItem>
      </Form>
    ))
    const item = wrapper.find('.vxp-form__item')
    const helpIcon = item.find('.vxp-form__label .vxp-form__help')

    expect(helpIcon.exists()).toBe(true)

    await helpIcon.trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    await nextTick()
    vi.runOnlyPendingTimers()
    await nextTick()
    await nextTick()
    vi.runAllTimers()
    await nextTick()

    expect(document.querySelector('.vxp-form__help-tip')).toBeTruthy()
    expect(document.querySelector('.vxp-form__help-tip')!.textContent).toEqual('help')
  })

  it('help tip slot', async () => {
    const wrapper = mount(() => (
      <Form>
        <FormItem required label={'input'} prop={'input'}>
          {{
            default: () => <Input></Input>,
            help: () => <span class={'help'}>{'help'}</span>,
          }}
        </FormItem>
      </Form>
    ))
    const item = wrapper.find('.vxp-form__item')
    const helpIcon = item.find('.vxp-form__label .vxp-form__help')

    expect(helpIcon.exists()).toBe(true)

    await helpIcon.trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    await nextTick()
    vi.runOnlyPendingTimers()
    await nextTick()
    await nextTick()
    vi.runAllTimers()
    await nextTick()

    expect(document.querySelector('.help')).toBeTruthy()
    expect(document.querySelector('.help')!.textContent).toEqual('help')
  })
})
