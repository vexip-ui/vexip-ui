import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Row } from '..'
import { Column } from '@/components/column'

describe('Row', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Row>
        <Column></Column>
        <Column span={8}></Column>
        <Column span={16}></Column>
      </Row>
    ))

    expect(wrapper.find('.vxp-column').exists()).toBe(true)
    expect(wrapper.find('.vxp-column--24').exists()).toBe(true)
    expect(wrapper.find('.vxp-column--8').exists()).toBe(true)
    expect(wrapper.find('.vxp-column--16').exists()).toBe(true)
  })

  it('gap', async () => {
    const wrapper = mount(Row, {
      props: { gap: 8 },
      slots: {
        default: () => <Column></Column>
      }
    })

    expect(wrapper.attributes('style')).toContain('margin-right: -4px;')
    expect(wrapper.attributes('style')).toContain('margin-left: -4px;')
    expect(wrapper.find('.vxp-column').attributes('style')).toContain('padding-left: 4px;')
    expect(wrapper.find('.vxp-column').attributes('style')).toContain('padding-right: 4px;')

    await wrapper.setProps({ gap: [16, 24] })
    expect(wrapper.attributes('style')).toContain('margin: -12px -8px 12px;')
    expect(wrapper.find('.vxp-column').attributes('style')).toContain('padding: 12px 8px;')
  })

  it('justify', () => {
    (['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'] as const).forEach(
      justify => {
        const wrapper = mount(() => <Row justify={justify}></Row>)

        expect(wrapper.find('.vxp-row').classes()).toContain(`vxp-row--${justify}`)
      }
    )
  })

  it('align', () => {
    (['top', 'middle', 'bottom', 'stretch'] as const).forEach(align => {
      const wrapper = mount(() => <Row align={align}></Row>)

      expect(wrapper.find('.vxp-row').classes()).toContain(`vxp-row--${align}`)
    })
  })

  it('column offset', () => {
    const wrapper = mount(() => (
      <Row>
        <Column span={12} offset={8}></Column>
      </Row>
    ))

    expect(wrapper.find('.vxp-column').classes()).toContain('vxp-column--offset-8')
  })

  it('push pull', () => {
    const wrapper = mount(() => (
      <Row>
        <Column span={16} push={8}></Column>
        <Column span={8} pull={16}></Column>
      </Row>
    ))

    expect(wrapper.find('.vxp-column--16').classes()).toContain('vxp-column--push-8')
    expect(wrapper.find('.vxp-column--8').classes()).toContain('vxp-column--pull-16')
  })

  it('tag', () => {
    const wrapper = mount(() => (
      <Row tag={'ul'}>
        <Column tag={'li'}></Column>
      </Row>
    ))

    expect(wrapper.find('.vxp-row').element.tagName).toEqual('UL')
    expect(wrapper.find('.vxp-column').element.tagName).toEqual('LI')
  })

  it('column use flex', () => {
    const wrapper = mount(() => (
      <Row>
        <Column use-flex></Column>
      </Row>
    ))

    expect(wrapper.find('.vxp-column').classes()).toContain('vxp-column--flex')
    expect(wrapper.find('.vxp-column').classes()).toContain('vxp-column--start')
    expect(wrapper.find('.vxp-column').classes()).toContain('vxp-column--top')
  })

  it('row column flex', () => {
    const wrapper = mount(() => (
      <Row column-flex>
        <Column></Column>
      </Row>
    ))

    expect(wrapper.find('.vxp-column').classes()).toContain('vxp-column--flex')
    expect(wrapper.find('.vxp-column').classes()).toContain('vxp-column--start')
    expect(wrapper.find('.vxp-column').classes()).toContain('vxp-column--top')
  })
})
