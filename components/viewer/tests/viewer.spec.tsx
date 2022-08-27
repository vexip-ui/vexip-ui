import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { Viewer } from '..'
import { GithubB } from '@vexip-ui/icons'

vi.useFakeTimers()

async function toggleMove(el: HTMLElement, value = 40) {
  const downEvent = new CustomEvent('pointerdown') as any
  downEvent.button = 0
  downEvent.clientX = 0
  downEvent.clientY = 0
  el.dispatchEvent(downEvent)
  await nextTick()

  const moveEvent = new CustomEvent('pointermove') as any
  moveEvent.clientX = value
  moveEvent.clientY = value
  document.dispatchEvent(moveEvent)
  vi.runAllTimers()
  await nextTick()

  const upEvent = new CustomEvent('pointerup') as any
  document.dispatchEvent(upEvent)
}

function emitWheel(el: HTMLElement, type: 'top' | 'bottom', shift = false) {
  const event = new CustomEvent('wheel') as any
  event.deltaY = type === 'top' ? -1 : 1
  event.shiftKey = shift

  el.dispatchEvent(event)
  return nextTick()
}

describe('Viewer', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Viewer>
        <div class={'content'}>{'content'}</div>
      </Viewer>
    ))

    expect(wrapper.find('.vxp-viewer').classes()).toContain('vxp-viewer-vars')
    expect(wrapper.find('.vxp-viewer__container').exists()).toBe(true)
    expect(wrapper.find('.vxp-viewer__toolbar').exists()).toBe(true)
    expect(wrapper.find('.content').exists()).toBe(true)
  })

  it('toolbar placement', () => {
    (
      [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end'
      ] as const
    ).forEach(placement => {
      const wrapper = mount(() => <Viewer toolbar-placement={placement}></Viewer>)

      expect(wrapper.find('.vxp-viewer__toolbar').classes()).toContain(
        `vxp-viewer__toolbar--${placement}`
      )

      if (placement.startsWith('left') || placement.startsWith('right')) {
        expect(wrapper.find('.vxp-viewer__toolbar').classes()).toContain(
          'vxp-viewer__toolbar--vertical'
        )
      }
    })
  })

  it('move', async () => {
    const wrapper = mount(() => (
      <Viewer>
        <div class={'content'}>{'content'}</div>
      </Viewer>
    ))
    const container = wrapper.find('.vxp-viewer__container').element as HTMLElement

    await nextTick()
    await toggleMove(container)
    expect(wrapper.find('.vxp-viewer__content').attributes('style')).toContain(
      'translate3d(40px, 40px, 0)'
    )
  })

  it('zoom', async () => {
    const wrapper = mount(() => (
      <Viewer>
        <div class={'content'}>{'content'}</div>
      </Viewer>
    ))
    const container = wrapper.find('.vxp-viewer__container').element as HTMLElement

    await nextTick()
    await emitWheel(container, 'top')
    expect(wrapper.find('.vxp-viewer__transition').attributes('style')).toContain('scale(1.15)')

    await emitWheel(container, 'bottom')
    expect(wrapper.find('.vxp-viewer__transition').attributes('style')).toContain('scale(1)')
  })

  it('custom actions', async () => {
    const process = vi.fn()
    const actions = [
      {
        name: 'test',
        title: 'Title',
        icon: GithubB,
        process
      }
    ]
    const wrapper = mount(() => (
      <Viewer actions={actions}>
        <div class={'content'}>{'content'}</div>
      </Viewer>
    ))
    const toolbar = wrapper.find('.vxp-viewer__toolbar')

    expect(toolbar.find('button[title="Title"]').exists()).toBe(true)
    expect(toolbar.findComponent(GithubB).exists()).toBe(true)

    toolbar.find('button[title="Title"]').trigger('click')
    expect(process).toHaveBeenCalled()
  })
})
