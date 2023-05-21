import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Card } from '..'

const TEXT = 'Text'

describe('Card', () => {
  it('render', () => {
    const wrapper = mount(Card, {
      slots: {
        default: () => <span>{TEXT}</span>
      }
    })

    expect(wrapper.classes()).toContain('vxp-card-vars')
    expect(wrapper.find('.vxp-card__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-card__content').text()).toEqual(TEXT)
  })

  it('title', async () => {
    const wrapper = mount(Card)

    expect(wrapper.find('.vxp-card__title').exists()).toBe(false)

    await wrapper.setProps({ title: TEXT })
    expect(wrapper.find('.vxp-card__title').exists()).toBe(true)
    expect(wrapper.find('.vxp-card__title').text()).toEqual(TEXT)
  })

  it('shadow', async () => {
    const wrapper = mount(Card)

    expect(wrapper.classes()).toContain('vxp-card--shadow-always')

    await wrapper.setProps({ shadow: 'hover' })
    expect(wrapper.classes()).toContain('vxp-card--shadow-hover')
  })

  it('title slot', () => {
    const wrapper = mount(() => (
      <Card title={TEXT}>
        {{
          title: () => <span class={'title'}></span>
        }}
      </Card>
    ))

    expect(wrapper.find('.vxp-card__title').exists()).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(true)
    expect(wrapper.find('.title').text()).toEqual('')
  })

  it('extra', () => {
    const wrapper = mount(() => (
      <Card title={TEXT}>
        {{
          extra: () => <span>{TEXT}</span>
        }}
      </Card>
    ))

    expect(wrapper.find('.vxp-card__extra').exists()).toBe(true)
    expect(wrapper.find('.vxp-card__extra').text()).toEqual(TEXT)
  })

  it('header', () => {
    const wrapper = mount(() => (
      <Card title={TEXT}>
        {{
          header: () => <span>{TEXT}</span>
        }}
      </Card>
    ))

    expect(wrapper.find('.vxp-card__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-card__title').exists()).toBe(false)
    expect(wrapper.find('.vxp-card__header').text()).toEqual(TEXT)
  })
})
