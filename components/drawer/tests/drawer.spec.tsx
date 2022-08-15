import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { Drawer } from '..'

vi.useFakeTimers()

const TEXT = 'Text'

describe('Drawer', () => {
  it('render', () => {
    const wrapper = mount(() => <Drawer>{TEXT}</Drawer>)

    expect(wrapper.find('.vxp-drawer').classes()).toContain('vxp-drawer-vars')
    expect(wrapper.find('.vxp-drawer__wrapper').exists()).toBe(true)
    expect(wrapper.find('.vxp-drawer__header').exists()).toBe(false)
    expect(wrapper.find('.vxp-drawer__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-drawer__content').text()).toEqual(TEXT)
  })

  it('title slot', () => {
    const wrapper = mount(() => (
      <Drawer title={TEXT}>
        {{
          title: () => <span class={'title'}></span>
        }}
      </Drawer>
    ))

    expect(wrapper.find('.vxp-drawer__header').exists()).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(true)
    expect(wrapper.find('.vxp-drawer__close').exists()).toBe(true)
  })

  it('close', () => {
    const wrapper = mount(() => (
      <Drawer title={TEXT}>
        {{
          close: () => <span class={'close'}></span>
        }}
      </Drawer>
    ))

    expect(wrapper.find('.vxp-drawer__header').exists()).toBe(true)
    expect(wrapper.find('.close').exists()).toBe(true)
  })

  it('inner', () => {
    const wrapper = mount(() => <Drawer inner></Drawer>)

    expect(wrapper.find('.vxp-drawer').classes()).toContain('vxp-drawer--inner')
  })

  it('drawer class', () => {
    const wrapper = mount(() => <Drawer drawer-class={'test'}></Drawer>)

    expect(wrapper.find('.vxp-drawer__wrapper').classes()).toContain('test')
  })

  it('hide mask', async () => {
    const wrapper = mount(() => <Drawer hide-mask></Drawer>)
    await nextTick()

    expect(wrapper.find('.vxp-masker__mask').exists()).toBe(false)
  })

  it('closable', async () => {
    const onClose = vi.fn()
    const wrapper = mount(Drawer, {
      props: {
        active: true,
        onClose
      }
    })
    const mask = wrapper.find('.vxp-masker__mask')

    await mask.trigger('click')
    expect(onClose).toHaveBeenCalled()
  })

  it('transfer', async () => {
    mount(() => <Drawer transfer></Drawer>)

    await nextTick()
    await nextTick()
    expect(document.querySelector('.vxp-drawer')).not.toBeNull()
  })

  it('placement', () => {
    (['top', 'right', 'bottom', 'left'] as const).forEach(placement => {
      const wrapper = mount(() => <Drawer placement={placement}></Drawer>)

      expect(wrapper.find('.vxp-drawer__wrapper').classes()).toContain(
        `vxp-drawer__wrapper--${placement}`
      )
    })
  })
})
