import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Space } from '..'

const TEXT = 'Text'

describe('Space', () => {
  it('render', () => {
    const wrapper = mount(Space, {
      slots: {
        default: () => TEXT
      }
    })

    expect(wrapper.classes()).toContain('vxp-space-vars')
    expect(wrapper.find('.vxp-space__item').exists()).toBe(true)
  })

  it('render empty', () => {
    const wrapper = mount(Space)

    expect(wrapper.find('.vxp-space').exists()).toBe(true)
    expect(wrapper.find('.vxp-space__item').exists()).toBe(false)
  })

  it('vertical', () => {
    const wrapper = mount(() => <Space vertical>{TEXT}</Space>)

    expect(wrapper.find('.vxp-space').classes()).toContain('vxp-space--vertical')
  })

  it('size', () => {
    const wrapper = mount(() => <Space size={'large'}>{TEXT}</Space>)

    expect(wrapper.find('.vxp-space').classes()).toContain('vxp-space--large')
  })

  it('justify', () => {
    (['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'] as const).forEach(
      justify => {
        const wrapper = mount(() => <Space justify={justify}>{TEXT}</Space>)

        if (justify === 'start' || justify === 'end') {
          expect(wrapper.find('.vxp-space').attributes('style')).toContain(
            `justify-content: flex-${justify};`
          )
        } else {
          expect(wrapper.find('.vxp-space').attributes('style')).toContain(
            `justify-content: ${justify};`
          )
        }
      }
    )
  })

  it('justify', () => {
    (['start', 'end', 'center', 'baseline', 'stretch'] as const).forEach(align => {
      const wrapper = mount(() => <Space align={align}>{TEXT}</Space>)

      if (align === 'start' || align === 'end') {
        expect(wrapper.find('.vxp-space').attributes('style')).toContain(
          `align-items: flex-${align};`
        )
      } else {
        expect(wrapper.find('.vxp-space').attributes('style')).toContain(`align-items: ${align};`)
      }
    })
  })

  it('number (array) size', async () => {
    const wrapper = mount(Space, {
      props: { size: 16 },
      slots: {
        default: () => TEXT
      }
    })

    expect(wrapper.find('.vxp-space').attributes('style')).toContain('--vxp-space-h-gap: 16px;')
    expect(wrapper.find('.vxp-space').attributes('style')).toContain('--vxp-space-v-gap: 16px;')

    await wrapper.setProps({ size: [12, 20] })

    expect(wrapper.find('.vxp-space').attributes('style')).toContain('--vxp-space-h-gap: 12px;')
    expect(wrapper.find('.vxp-space').attributes('style')).toContain('--vxp-space-v-gap: 20px;')
  })

  it('no wrap', async () => {
    const wrapper = mount(Space, {
      slots: {
        default: () => TEXT
      }
    })

    expect(wrapper.classes()).not.toContain('vxp-space--no-wrap')

    await wrapper.setProps({ vertical: true })
    expect(wrapper.classes()).toContain('vxp-space--no-wrap')

    await wrapper.setProps({ vertical: false, noWrap: true })
    expect(wrapper.classes()).toContain('vxp-space--no-wrap')
  })

  it('inline', () => {
    const wrapper = mount(() => <Space inline>{TEXT}</Space>)

    expect(wrapper.find('.vxp-space').classes()).toContain('vxp-space--inline')
  })

  it('flat fragment', () => {
    const wrapper = mount(() => (
      <Space>
        <>
          666<span>{TEXT}</span>
          23333
        </>
      </Space>
    ))
    const items = wrapper.findAll('.vxp-space__item')

    expect(items.length).toEqual(3)
    expect(items[0].text()).toEqual('666')
    expect(items[1].text()).toEqual(TEXT)
    expect(items[2].text()).toEqual('23333')
  })

  it('item style', () => {
    const wrapper = mount(() => <Space item-style={'color: red;'}>{TEXT}</Space>)

    expect(wrapper.find('.vxp-space__item').attributes('style')).toContain('color: red;')
  })

  it('tag', () => {
    const wrapper = mount(() => <Space tag={'section'}>{TEXT}</Space>)

    expect(wrapper.find('.vxp-space').element.tagName).toEqual('SECTION')
  })
})
