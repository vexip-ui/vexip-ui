import { describe, it, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { FullScreen } from '..'

describe('FullScreen', () => {
  it('should keep exited state when init', () => {
    const wrapper = mount(() => <FullScreen></FullScreen>)

    expect(wrapper.classes()).toStrictEqual(['vxp-full-screen', 'vxp-full-screen-vars'])
  })

  it('should work', async () => {
    const wrapper = mount(() => (
      <FullScreen>
        {{
          default: ({ enter, exit }: any) => {
            return (
              <>
                <button className={'enter'} onClick={() => enter()}></button>
                <button className={'exit'} onClick={() => exit()}></button>
              </>
            )
          }
        }}
      </FullScreen>
    ))

    await wrapper.find('.enter').trigger('click')
    expect(wrapper.classes()).toContain('vxp-full-screen--full')

    await wrapper.find('.exit').trigger('click')
    expect(wrapper.classes()).not.toContain('vxp-full-screen--full')
  })

  it('should work via exposed methods', async () => {
    const wrapper = mount(() => <FullScreen></FullScreen>)

    const { enter, exit } = wrapper.findComponent(FullScreen).vm

    await enter()
    expect(wrapper.classes()).toContain('vxp-full-screen--full')
    await exit()
    expect(wrapper.classes()).not.toContain('vxp-full-screen--full')

    await enter('browser')
    expect(wrapper.classes()).toContain('vxp-full-screen--full')
    await exit()
    expect(wrapper.classes()).not.toContain('vxp-full-screen--full')
  })

  it('should work via toggle', async () => {
    const wrapper = mount(() => <FullScreen></FullScreen>)

    const { toggle } = wrapper.findComponent(FullScreen).vm

    await toggle()
    expect(wrapper.classes()).toContain('vxp-full-screen--full')
    await toggle()
    expect(wrapper.classes()).not.toContain('vxp-full-screen--full')
  })

  test('zIndex should valid', async () => {
    const wrapper = mount(() => <FullScreen></FullScreen>)

    const { enter } = wrapper.findComponent(FullScreen).vm

    expect(wrapper.find('div').attributes().style).eq('z-index: 2147483584;')
    await enter('window', 1)
    expect(wrapper.find('div').attributes().style).eq('z-index: 1;')
  })

  test('should switch to another enterted state when current state is enterted.', async () => {
    const wrapper = mount(() => <FullScreen></FullScreen>)

    const { toggle } = wrapper.findComponent(FullScreen).vm

    await toggle()
    expect(wrapper.classes()).toContain('vxp-full-screen--full')
    await toggle('browser')
    expect(wrapper.classes()).toContain('vxp-full-screen--full')
  })
})
