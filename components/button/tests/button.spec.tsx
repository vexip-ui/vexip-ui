import { ButtonGroup } from '@/components/button-group'

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { User } from 'lucide-vue-next'
import { parseColorToRgba } from '@vexip-ui/utils'
import { Button } from '..'
import { buttonTypes } from '../symbol'

const TEXT = 'Text'

describe('Button', () => {
  it('render', () => {
    const wrapper = mount(() => <Button>{TEXT}</Button>)

    expect(wrapper.find('.vxp-button').classes()).toContain('vxp-button-vars')
    expect(wrapper.find('.vxp-button').text()).toEqual(TEXT)
  })

  it('size', () => {
    const wrapper = mount(() => <Button size={'large'}></Button>)

    expect(wrapper.find('.vxp-button').classes()).toContain('vxp-button--large')
  })

  it('types', () => {
    buttonTypes.forEach(type => {
      const wrapper = mount(() => <Button type={type}></Button>)

      if (type === 'default') {
        expect(wrapper.find('.vxp-button').classes()).not.toContain(`vxp-button--${type}`)
      } else {
        expect(wrapper.find('.vxp-button').classes()).toContain(`vxp-button--${type}`)
      }
    })
  })

  it('ghost', () => {
    const wrapper = mount(() => <Button ghost></Button>)

    expect(wrapper.find('.vxp-button').classes()).toContain('vxp-button--ghost')
  })

  it('simple', async () => {
    const wrapper = mount(Button, {
      props: { simple: true }
    })

    expect(wrapper.find('.vxp-button').classes()).toContain('vxp-button--simple')

    await wrapper.setProps({ ghost: true })
    expect(wrapper.find('.vxp-button').classes()).not.toContain('vxp-button--simple')
  })

  it('text', () => {
    const wrapper = mount(() => <Button text></Button>)

    expect(wrapper.find('.vxp-button').classes()).toContain('vxp-button--text')
  })

  it('dashed', () => {
    const wrapper = mount(() => <Button dashed></Button>)

    expect(wrapper.find('.vxp-button').classes()).toContain('vxp-button--dashed')
  })

  it('circle', () => {
    const wrapper = mount(() => <Button circle></Button>)

    expect(wrapper.find('.vxp-button').classes()).toContain('vxp-button--circle')
  })

  it('disabled', () => {
    const wrapper = mount(() => <Button disabled></Button>)

    expect(wrapper.find('.vxp-button').classes()).toContain('vxp-button--disabled')
  })

  it('loading', () => {
    const wrapper = mount(() => <Button loading></Button>)

    expect(wrapper.find('.vxp-button').classes()).toContain('vxp-button--loading')
    expect(wrapper.find('.vxp-button__icon--loading').exists()).toBe(true)
  })

  it('click', async () => {
    const handleClick = vi.fn()
    const wrapper = mount(Button, {
      props: { onClick: handleClick }
    })

    wrapper.element.dispatchEvent(new MouseEvent('click'))
    expect(handleClick).toBeCalledTimes(1)

    await wrapper.setProps({ disabled: true })
    wrapper.element.dispatchEvent(new MouseEvent('click'))
    expect(handleClick).toBeCalledTimes(1)

    await wrapper.setProps({ disabled: false, loading: true })
    wrapper.element.dispatchEvent(new MouseEvent('click'))
    expect(handleClick).toBeCalledTimes(1)
  })

  it('icon', async () => {
    const wrapper = mount(() => <Button icon={User}>{TEXT}</Button>)

    expect(wrapper.find('.vxp-button__icon').exists()).toBe(true)
    expect(wrapper.findComponent(User).exists()).toBe(true)
  })

  it('icon only', async () => {
    const wrapper = mount(() => <Button icon={User}></Button>)

    expect(wrapper.find('.vxp-button__icon').exists()).toBe(true)
    expect(wrapper.findComponent(User).exists()).toBe(true)
  })

  it('loading icon', () => {
    const wrapper = mount(() => <Button loading loading-icon={User}></Button>)

    expect(wrapper.findComponent(User).exists()).toBe(true)
  })

  it('loading slot', () => {
    const wrapper = mount(() => (
      <Button loading>
        {{
          loading: () => <span class={'loading'}>{TEXT}</span>
        }}
      </Button>
    ))

    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.find('.loading').text()).toEqual(TEXT)
  })

  it('button type', () => {
    const wrapper = mount(() => <Button button-type={'submit'}></Button>)

    expect(wrapper.find('.vxp-button').attributes('type')).toEqual('submit')
  })

  it('tag', () => {
    const wrapper = mount(() => <Button tag={'a'}></Button>)

    expect(wrapper.find('a.vxp-button').exists()).toBe(true)
  })

  it('color', () => {
    const wrapper = mount(() => <Button color={'orange'}></Button>)
    const rgbColor = parseColorToRgba('orange')

    expect(wrapper.find('.vxp-button').attributes('style')).toContain(
      `--vxp-button-bg-color: ${rgbColor};`
    )
    expect(wrapper.find('.vxp-button').attributes('style')).toContain(
      `--vxp-button-b-color: ${rgbColor};`
    )
  })

  it('badge', async () => {
    const wrapper = mount(Button, {
      props: {
        badge: 12
      },
      slots: {
        default: () => TEXT
      }
    })

    expect(wrapper.find('.vxp-button__badge').exists()).toBe(true)

    await wrapper.setProps({ type: 'primary' })
    expect(wrapper.find('.vxp-button__badge').classes()).toContain('vxp-button__badge--primary')

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.vxp-button__badge').classes()).toContain('vxp-button__badge--disabled')
  })

  it('group', () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button></Button>
        <Button></Button>
      </ButtonGroup>
    ))

    expect(wrapper.findAll('.vxp-button').length).toBe(2)
  })

  it('group circle', () => {
    const wrapper = mount(() => <ButtonGroup circle></ButtonGroup>)

    expect(wrapper.find('.vxp-button-group').classes()).toContain('vxp-button-group--circle')
  })

  it('group type', () => {
    const wrapper = mount(() => (
      <ButtonGroup type={'primary'}>
        <Button></Button>
        <Button></Button>
        <Button type={'success'}></Button>
      </ButtonGroup>
    ))

    expect(wrapper.findAll('.vxp-button--primary').length).toBe(2)
    expect(wrapper.findAll('.vxp-button--success').length).toBe(1)
  })

  it('group size', () => {
    const wrapper = mount(() => (
      <ButtonGroup size={'large'}>
        <Button></Button>
        <Button></Button>
        <Button size={'small'}></Button>
      </ButtonGroup>
    ))

    expect(wrapper.findAll('.vxp-button--large').length).toBe(3)
    expect(wrapper.find('.vxp-button--small').exists()).toBe(false)
  })
})
