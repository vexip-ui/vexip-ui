import { onMounted, onBeforeUnmount } from 'vue'
import { css } from '@vexip-ui/css-render'
import { useClassHelper } from '@vexip-ui/config'
import { basisStyle } from '../style'

import type { NameHelper } from '@vexip-ui/config'
import type { CSSProperties } from '@vexip-ui/css-render'

let mountedCount = 0
let unmount: () => void

export function useStyle(nh: NameHelper) {
  const ch = useClassHelper(nh)
  const { b, bm, be, bs, cv, cvm, gv, gcv } = ch

  const config = [
    basisStyle(b(), ch),
    {
      [bs('vars')]: cvm({
        'bg-color': gv('fill-color-background'),
        'b-color': gv('border-color-base'),
        radius: gv('radius-base'),
        'icon-color': gv('content-color-primary'),
        'text-color': gv('content-color-base'),
        'title-font-size': gv('font-size-primary'),
        'title-color': gv('content-color-primary'),
        'close-color': gv('content-color-placeholder'),
        'close-color-hover': gv('content-color-base'),
        'icon-width': '40px'
      }),
      [b()]: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '8px 14px',
        marginBottom: '14px',
        backgroundColor: gcv('bg-color'),
        border: `${gv('border-shape')} ${gcv('b-color')}`,
        borderRadius: gcv('radius')
      },
      [bm('has-title')]: {
        padding: '10px 14px'
      },
      [bm('has-icon')]: {
        paddingLeft: gcv('icon-width')
      },
      [`${bm('has-icon')}${bm('has-title')}`]: {
        [cv('icon-width')]: '56px'
      },
      [bm('no-border')]: {
        border: '0'
      },
      [bm('banner')]: {
        margin: '0',
        border: '0',
        borderRadius: '0'
      },
      [bm('colorful-text')]: {
        color: gcv('text-color')
      },
      [be('wrapper')]: {
        display: 'flex',
        flex: 'auto',
        flexDirection: 'column',
        justifyContent: 'center'
      },
      [be('title')]: {
        marginBottom: '4px',
        fontSize: gcv('title-font-size'),
        color: gcv('title-color')
      },
      [be('icon')]: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: gcv('icon-width'),
        color: gcv('icon-color')
      },
      [`${bm('has-title')} ${be('icon')}`]: {
        alignItems: 'start',
        paddingTop: '16px'
      },
      [be('close')]: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 0',
        marginLeft: '6px',
        color: gcv('close-color'),
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: '0',
        outline: '0',
        transition: gv('transition-color')
      },
      [`${be('close:hover')},${be('close:focus')}`]: {
        color: gcv('close-color-hover')
      },
      [`${bm('has-title')} ${be('close')}`]: {
        alignSelf: 'start'
      },
      ...['info', 'success', 'warning', 'error'].reduce((config, type) => {
        const color = type === 'info' ? 'primary' : type

        return {
          ...config,
          [bm(type)]: cvm({
            'bg-color': gv(`color-${color}-opacity-8`),
            'b-color': gv(`color-${color}-opacity-5`),
            'icon-color': gv(`color-${color}-dark-2`),
            'text-color': gv(`color-${color}-dark-2`)
          })
        }
      }, {} as CSSProperties)
    }
  ]

  onMounted(() => {
    if (!mountedCount) {
      unmount = css('alert', config)
    }

    ++mountedCount
  })

  onBeforeUnmount(() => {
    --mountedCount

    if (!mountedCount && unmount) {
      unmount()
    }
  })
}
