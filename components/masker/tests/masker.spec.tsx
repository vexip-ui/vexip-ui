import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Masker } from '..'

describe('Masker', () => {
  it('render', () => {
    const wrapper = mount(Masker)

    expect(wrapper.find('.vxp-masker').classes()).toContain('vxp-masker-vars')
    expect(wrapper.find({ ref: 'topTrap' }).exists()).toBe(true)
    expect(wrapper.find({ ref: 'bottomTrap' }).exists()).toBe(true)
  })

  it('active', async () => {
    const wrapper = mount(Masker, {
      slots: {
        default: (payload: { show: boolean }) => (
          <span class={'content'} data-show={payload.show}></span>
        )
      }
    })

    expect(wrapper.find('.vxp-masker__mask').attributes('style')).toContain('display: none;')
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('.content').attributes('data-show')).toEqual('false')

    await wrapper.setProps({ active: true })
    expect(wrapper.find('.vxp-masker__mask').attributes('style')).toBeUndefined()
    expect(wrapper.find('.content').attributes('data-show')).toEqual('true')
  })

  it('closable', async () => {
    const onToggle = vi.fn()
    const onClose = vi.fn()
    const wrapper = mount(Masker, {
      props: {
        active: true,
        closable: true,
        onToggle,
        onClose
      }
    })

    await wrapper.find('.vxp-masker__mask').trigger('click')
    await nextTick()
    expect(wrapper.find('.vxp-masker__mask').attributes('style')).toContain('display: none;')
    expect(onToggle).toHaveBeenCalled()
    expect(onToggle).toHaveBeenLastCalledWith(false)
    expect(onClose).toHaveBeenCalled()
    expect(wrapper.emitted()).toHaveProperty('update:active')
    expect(wrapper.emitted()['update:active'][0]).toEqual([false])

    wrapper.vm.currentActive = true
    await nextTick()
    await wrapper.find('.vxp-masker').trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(wrapper.find('.vxp-masker__mask').attributes('style')).toContain('display: none;')
  })

  it('transfer', async () => {
    mount(() => <Masker transfer></Masker>)

    await nextTick()
    await nextTick()
    expect(document.querySelector('.vxp-masker')).not.toBeNull()
  })

  it('before close', async () => {
    const onBeforeClose = vi.fn()
    const wrapper = mount(Masker, {
      props: { closable: true, onBeforeClose }
    })

    const openAndClose = async () => {
      wrapper.vm.currentActive = true
      await nextTick()
      await wrapper.find('.vxp-masker__mask').trigger('click')
      await nextTick()
    }

    await openAndClose()
    expect(wrapper.find('.vxp-masker__mask').attributes('style')).toContain('display: none;')
    expect(onBeforeClose).toHaveBeenCalled()

    onBeforeClose.mockReturnValue(false)
    await openAndClose()
    expect(wrapper.find('.vxp-masker__mask').attributes('style')).toBeUndefined()

    onBeforeClose.mockImplementation(
      () =>
        new Promise(resolve => {
          nextTick(() => resolve(true))
        })
    )
    await openAndClose()
    expect(wrapper.find('.vxp-masker__mask').attributes('style')).toBeUndefined()
    await nextTick()
    expect(wrapper.find('.vxp-masker__mask').attributes('style')).toContain('display: none;')
  })

  it('inner', () => {
    const wrapper = mount(() => <Masker inner></Masker>)

    expect(wrapper.find('.vxp-masker').classes()).toContain('vxp-masker--inner')
  })

  it('disabled', () => {
    const wrapper = mount(() => <Masker disabled></Masker>)

    expect(wrapper.find('.vxp-masker').classes()).toContain('vxp-masker--disabled')
    expect(wrapper.find('.vxp-masker__mask').exists()).toBe(false)
  })

  it('auto remove', async () => {
    const wrapper = mount(Masker, {
      props: { active: true, autoRemove: true }
    })

    await wrapper.find('.vxp-masker__mask').trigger('click')
    wrapper.vm.wrapShow = false
    await nextTick()

    expect(wrapper.find('.vxp-masker').exists()).toBe(false)
  })
})
