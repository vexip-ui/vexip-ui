import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Blockquote, OL, Text, Title, UL } from '..'

const TEXT = 'Text'
const TYPES = ['primary', 'info', 'success', 'warning', 'error'] as const

describe('Typography', () => {
  it('render text', () => {
    const wrapper = mount(() => <Text>{TEXT}</Text>)

    expect(wrapper.find('.vxp-text').classes()).toContain('vxp-text-vars')
    expect(wrapper.find('.vxp-text').text()).toEqual(TEXT)
  })

  it('text types', () => {
    TYPES.forEach(type => {
      const wrapper = mount(() => <Text type={type}></Text>)

      expect(wrapper.find('.vxp-text').classes()).toContain(`vxp-text--${type}`)
    })
  })

  it('text tag', () => {
    const wrapper = mount(() => <Text tag={'p'}></Text>)

    expect(wrapper.find('.vxp-text').element.tagName).toEqual('P')
  })

  it('text code', () => {
    const wrapper = mount(() => <Text code></Text>)

    expect(wrapper.find('.vxp-text').element.tagName).toEqual('CODE')
    expect(wrapper.find('.vxp-text').classes()).toContain('vxp-text--code')
  })

  it('text delete', () => {
    const wrapper = mount(() => <Text delete></Text>)

    expect(wrapper.find('.vxp-text').element.tagName).toEqual('DEL')
    expect(wrapper.find('.vxp-text').classes()).toContain('vxp-text--delete')
  })

  it('text code with del', () => {
    const wrapper = mount(() => <Text delete code></Text>)

    expect(wrapper.find('.vxp-text').element.tagName).toEqual('CODE')
    expect(wrapper.find('del').exists()).toBe(true)
  })

  it('text style props', () => {
    const wrapper = mount(() => (
      <Text strong italic underline mark disabled keyboard thin reversed></Text>
    ))

    expect(wrapper.find('.vxp-text').classes()).toContain('vxp-text--strong')
    expect(wrapper.find('.vxp-text').classes()).toContain('vxp-text--italic')
    expect(wrapper.find('.vxp-text').classes()).toContain('vxp-text--underline')
    expect(wrapper.find('.vxp-text').classes()).toContain('vxp-text--mark')
    expect(wrapper.find('.vxp-text').classes()).toContain('vxp-text--disabled')
    expect(wrapper.find('.vxp-text').classes()).toContain('vxp-text--keyboard')
    expect(wrapper.find('.vxp-text').classes()).toContain('vxp-text--thin')
    expect(wrapper.find('.vxp-text').classes()).toContain('vxp-text--reversed')
  })

  it('render title', () => {
    const wrapper = mount(() => <Title>{TEXT}</Title>)

    expect(wrapper.find('.vxp-title').classes()).toContain('vxp-title-vars')
    expect(wrapper.find('.vxp-title').text()).toEqual(TEXT)
  })

  it('title level', () => {
    ([1, 2, 3, 4, 5, 6] as const).forEach(level => {
      const wrapper = mount(() => <Title level={level}></Title>)

      expect(wrapper.find('.vxp-title').element.tagName).toEqual(`H${level}`)
    })
  })

  it('title types', () => {
    TYPES.forEach(type => {
      const wrapper = mount(() => <Title type={type}></Title>)

      expect(wrapper.find('.vxp-title').classes()).toContain(`vxp-title--${type}`)
    })
  })

  it('title props', () => {
    const wrapper = mount(() => <Title marker aligned thin></Title>)

    expect(wrapper.find('.vxp-title').classes()).toContain('vxp-title--marker')
    expect(wrapper.find('.vxp-title').classes()).toContain('vxp-title--aligned')
    expect(wrapper.find('.vxp-title').classes()).toContain('vxp-title--thin')
  })

  it('title marker color', () => {
    const wrapper = mount(() => <Title marker marker-type={'pink'}></Title>)

    expect(wrapper.find('.vxp-title').attributes('style')).toContain(
      '--vxp-title-marker-color: pink;'
    )
  })

  it('render blockquote', () => {
    const wrapper = mount(() => <Blockquote>{TEXT}</Blockquote>)

    expect(wrapper.find('.vxp-blockquote').classes()).toContain('vxp-blockquote-vars')
    expect(wrapper.find('.vxp-blockquote').text()).toEqual(TEXT)
  })

  it('render ol', () => {
    const wrapper = mount(() => <OL>{TEXT}</OL>)

    expect(wrapper.find('.vxp-ol').exists()).toBe(true)
    expect(wrapper.find('.vxp-ol').attributes('type')).toEqual('1')
    expect(wrapper.find('.vxp-ol').text()).toEqual(TEXT)
  })

  it('render ul', () => {
    const wrapper = mount(() => <UL>{TEXT}</UL>)

    expect(wrapper.find('.vxp-ul').exists()).toBe(true)
    expect(wrapper.find('.vxp-ul').attributes('style')).toEqual('list-style-type: circle;')
    expect(wrapper.find('.vxp-ul').text()).toEqual(TEXT)
  })

  it('ul no marker', () => {
    const wrapper = mount(() => <UL list-style={'none'}></UL>)

    expect(wrapper.find('.vxp-ul').classes()).toContain('vxp-ul--no-marker')
  })
})
