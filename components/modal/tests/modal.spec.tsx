import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { Modal } from '..'

const TEXT = 'Text'

describe('Modal', () => {
  it('render', () => {
    const wrapper = mount(() => <Modal>{TEXT}</Modal>)

    expect(wrapper.find('.vxp-modal').classes()).toContain('vxp-modal-vars')
    expect(wrapper.find('.vxp-modal__wrapper').exists()).toBe(true)
    expect(wrapper.find('.vxp-modal__header').exists()).toBe(false)
    expect(wrapper.find('.vxp-modal__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-modal__content').text()).toEqual(TEXT)
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

  it('footer slot', () => {
    const wrapper = mount(() => (
      <Modal>
        {{
          footer: () => <span class={'footer'}></span>
        }}
      </Modal>
    ))

    expect(wrapper.find('.vxp-modal__footer').exists()).toBe(true)
    expect(wrapper.find('.footer').exists()).toBe(true)
    expect(wrapper.findAllComponents('.vxp-button').length).toEqual(0)
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

  it('closable', async () => {
    const onClose = vi.fn()
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    const wrapper = mount(Modal, {
      props: {
        active: true,
        onClose,
        onConfirm,
        onCancel
      }
    })
    const buttons = wrapper.findAllComponents('.vxp-button')

    ;(buttons[0].element as HTMLButtonElement).click()
    await nextTick()
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onCancel).toHaveBeenCalled()

    wrapper.vm.currentActive = true
    ;(buttons[1].element as HTMLButtonElement).click()
    await nextTick()
    expect(onClose).toHaveBeenCalledTimes(2)
    expect(onConfirm).toHaveBeenCalled()
  })

  it('confirm/cancel text', () => {
    const wrapper = mount(() => <Modal confirm-text={TEXT} cancel-text={TEXT}></Modal>)
    const buttons = wrapper.findAllComponents('.vxp-button')

    expect(buttons[0].text()).toEqual(TEXT)
    expect(buttons[1].text()).toEqual(TEXT)
  })

  it('hide mask', async () => {
    const wrapper = mount(() => <Modal hide-mask></Modal>)
    await nextTick()

    expect(wrapper.find('.vxp-masker__mask').exists()).toBe(false)
  })
})
