import { describe, it, expect } from 'vitest'
import { TimelineItem } from '@/components/timeline-item'
import { GithubB } from '@vexip-ui/icons'
import { mount } from '@vue/test-utils'
import { Timeline } from '..'

describe('Timeline', () => {
  it('render', () => {
    const wrapper = mount(Timeline)

    expect(wrapper.classes()).toContain('vxp-timeline-vars')
  })

  it('render items', () => {
    const wrapper = mount(() => (
      <Timeline>
        <TimelineItem>{'item1'}</TimelineItem>
        <TimelineItem>{'item2'}</TimelineItem>
      </Timeline>
    ))
    const items = wrapper.findAll('.vxp-timeline__item')

    expect(items.length).toEqual(2)
    expect(items[0].find('.vxp-timeline__signal').exists()).toBe(true)
    expect(items[0].find('.vxp-timeline__line').exists()).toBe(true)
    expect(items[0].text()).toEqual('item1')
    expect(items[1].text()).toEqual('item2')
  })

  it('pending', () => {
    const wrapper = mount(() => <Timeline pending></Timeline>)

    expect(wrapper.find('.vxp-timeline').classes()).toContain('vxp-timeline--pending')
  })

  it('both sides', () => {
    const wrapper = mount(() => <Timeline both-sides></Timeline>)

    expect(wrapper.find('.vxp-timeline').classes()).toContain('vxp-timeline--both-sides')
  })

  it('flip', () => {
    const wrapper = mount(() => <Timeline flip></Timeline>)

    expect(wrapper.find('.vxp-timeline').classes()).toContain('vxp-timeline--flip')
  })

  it('horizontal', () => {
    const wrapper = mount(() => <Timeline horizontal></Timeline>)

    expect(wrapper.find('.vxp-timeline').classes()).toContain('vxp-timeline--horizontal')
  })

  it('item type', () => {
    (['default', 'success', 'error', 'warning', 'disabled'] as const).forEach(type => {
      const wrapper = mount(() => (
        <Timeline>
          <TimelineItem type={type}></TimelineItem>
        </Timeline>
      ))

      if (type !== 'default') {
        expect(wrapper.find('.vxp-timeline__item').classes()).toContain(
          `vxp-timeline__item--${type}`
        )
      } else {
        expect(wrapper.find('.vxp-timeline__item').classes()).not.toContain(
          `vxp-timeline__item--${type}`
        )
      }
    })
  })

  it('item color', () => {
    const wrapper = mount(() => (
      <Timeline>
        <TimelineItem color={'red'}></TimelineItem>
      </Timeline>
    ))

    expect(wrapper.find('.vxp-timeline__item').attributes('style')).toContain(
      '--vxp-timeline-pointer-color: red;'
    )
    expect(wrapper.find('.vxp-timeline__item').attributes('style')).toContain(
      '--vxp-timeline-pointer-b-color: red;'
    )
  })

  it('item spacing', () => {
    const wrapper = mount(() => (
      <Timeline spacing={'12px'}>
        <TimelineItem></TimelineItem>
        <TimelineItem spacing={10}></TimelineItem>
      </Timeline>
    ))
    const items = wrapper.findAll('.vxp-timeline__item')

    expect(items[0].attributes('style')).toContain('--vxp-timeline-item-span: 12px;')
    expect(items[1].attributes('style')).toContain('--vxp-timeline-item-span: 10px;')
  })

  it('item line color', () => {
    const wrapper = mount(() => (
      <Timeline line-color={'yellow'}>
        <TimelineItem></TimelineItem>
        <TimelineItem line-color={'red'}></TimelineItem>
      </Timeline>
    ))
    const items = wrapper.findAll('.vxp-timeline__item')

    expect(items[0].find('.vxp-timeline__line').attributes('style')).toContain(
      'border-left-color: yellow;'
    )
    expect(items[1].find('.vxp-timeline__line').attributes('style')).toContain(
      'border-left-color: red;'
    )
  })

  it('item line dashed', () => {
    const wrapper = mount(() => (
      <Timeline dashed>
        <TimelineItem></TimelineItem>
        <TimelineItem dashed={false}></TimelineItem>
        <TimelineItem dashed></TimelineItem>
      </Timeline>
    ))
    const items = wrapper.findAll('.vxp-timeline__item')

    expect(items[0].find('.vxp-timeline__line').attributes('style')).toContain(
      'border-left-style: dashed;'
    )
    expect(items[1].find('.vxp-timeline__line').attributes('style')).toBeUndefined()
    expect(items[2].find('.vxp-timeline__line').attributes('style')).toContain(
      'border-left-style: dashed;'
    )
  })

  it('item signal slot', () => {
    const wrapper = mount(() => (
      <Timeline line-color={'yellow'}>
        <TimelineItem>
          {{
            signal: () => <GithubB></GithubB>
          }}
        </TimelineItem>
      </Timeline>
    ))

    expect(wrapper.find('.vxp-timeline__item').findComponent(GithubB).exists()).toBe(true)
  })
})
