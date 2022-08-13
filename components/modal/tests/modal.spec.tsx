import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { Modal } from '..'

const TEXT = 'Text'

describe('Modal', () => {
  it('render', () => {
    const wrapper = mount(() => <Modal></Modal>)

    expect(wrapper.find('.vxp-modal').classes()).toContain('vxp-modal-vars')
    expect(wrapper.find('.vxp-modal__wrapper').exists()).toBe(true)
    expect(wrapper.find('.vxp-modal__header').exists()).toBe(false)
    expect(wrapper.find('.vxp-modal__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-modal__footer').exists()).toBe(true)
    expect(wrapper.findAllComponents('.vxp-button').length).toEqual(2)
  })

  it('title', () => {
    const wrapper = mount(() => <Modal title={TEXT}></Modal>)

    expect(wrapper.find('.vxp-modal__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-modal__header').text()).toEqual(TEXT)
    expect(wrapper.find('.vxp-modal__close').exists()).toBe(true)
  })

  it('title slot', () => {
    const wrapper = mount(() => (
      <Modal title={TEXT}>
        {{
          title: () => <span class={'title'}></span>
        }}
      </Modal>
    ))

    expect(wrapper.find('.vxp-modal__header').exists()).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(true)
    expect(wrapper.find('.vxp-modal__close').exists()).toBe(true)
  })

  it('close', () => {
    const wrapper = mount(() => (
      <Modal title={TEXT}>
        {{
          close: () => <span class={'close'}></span>
        }}
      </Modal>
    ))

    expect(wrapper.find('.vxp-modal__header').exists()).toBe(true)
    expect(wrapper.find('.close').exists()).toBe(true)
  })

  it('header', () => {
    const wrapper = mount(() => (
      <Modal title={TEXT}>
        {{
          header: () => <span class={'header'}></span>
        }}
      </Modal>
    ))

    expect(wrapper.find('.vxp-modal__header').exists()).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(false)
    expect(wrapper.find('.close').exists()).toBe(false)
  })

  it('no footer', () => {
    const wrapper = mount(() => <Modal no-footer></Modal>)

    expect(wrapper.find('.vxp-modal__footer').exists()).toBe(false)
  })

  it('inner', () => {
    const wrapper = mount(() => <Modal inner></Modal>)

    expect(wrapper.find('.vxp-modal').classes()).toContain('vxp-modal--inner')
  })

  it('modal class', () => {
    const wrapper = mount(() => <Modal modal-class={'test'}></Modal>)

    expect(wrapper.find('.vxp-modal__wrapper').classes()).toContain('test')
  })

  it('loading', () => {
    const wrapper = mount(() => <Modal loading></Modal>)

    expect(wrapper.findAllComponents('.vxp-button')[1].classes()).toContain('vxp-button--loading')
  })
})
