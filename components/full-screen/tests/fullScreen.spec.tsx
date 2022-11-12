import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { FullScreen } from '..'

describe('FullScreen', () => {
  it('should keep exited state when init', () => {
    const wrapper = mount(() => <FullScreen></FullScreen>)

    expect(wrapper.classes()).toStrictEqual([])
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
    expect(wrapper.classes()).toContain('vxp-full-screen')

    await wrapper.find('.exit').trigger('click')
    expect(wrapper.classes()).not.toContain('vxp-full-screen')
  })

  it('should work via exposed methods', async () => {
    const wrapper = mount(() => <FullScreen></FullScreen>)

    const { enter, exit } = wrapper.findComponent(FullScreen).vm

    await enter()
    expect(wrapper.classes()).toContain('vxp-full-screen')
    await exit()
    expect(wrapper.classes()).not.toContain('vxp-full-screen')
  })
})
