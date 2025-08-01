import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'

import { computed, defineComponent, renderSlot } from 'vue'

import { createSizeProp, emitEvent, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { adjustAlpha, isClient, mixColor, parseColorToRgba } from '@vexip-ui/utils'
import { tagProps } from './props'

import type { TagType } from './symbol'

const tagTypes = Object.freeze<TagType[]>([
  'default',
  'primary',
  'info',
  'success',
  'error',
  'warning',
  'lime',
  'pink',
  'magenta',
  'tomato',
  'orange',
  'cyan',
  'navy',
  'gold',
  'purple',
])

export default defineComponent({
  name: 'Tag',
  components: {
    Icon,
  },
  props: tagProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('tag', _props, {
      size: createSizeProp(),
      type: {
        default: 'default',
        validator: (value: TagType) => tagTypes.includes(value),
      },
      border: false,
      closable: false,
      color: null,
      simple: false,
      circle: false,
      prefix: '',
      prefixBg: '',
      prefixColor: '',
      suffix: '',
      suffixBg: '',
      suffixColor: '',
      disabled: false,
      slots: () => ({}),
    })

    const nh = useNameHelper('tag')
    const icons = useIcons()

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm(props.size)]: props.size !== 'default',
        [nh.bm(props.type)]: props.type !== 'default',
        [nh.bm('border')]: props.border,
        [nh.bm('simple')]: props.simple,
        [nh.bm('circle')]: props.circle,
        [nh.bm('closable')]: props.closable,
        [nh.bm('disabled')]: props.disabled,
      }
    })
    const style = computed(() => {
      if (!props.color) return undefined

      const rootStyle = isClient ? getComputedStyle(document.documentElement) : null
      const white = parseColorToRgba(rootStyle?.getPropertyValue(nh.nv('color-white')) || '#fff')
      const baseColor = parseColorToRgba(props.color)
      const base = baseColor.toString()

      return nh.cvm({
        color: 'var(--vxp-color-white)',
        'bg-color': base,
        'b-color': base,
        'close-color': 'var(--vxp-color-white)',
        'd-color': mixColor(white, baseColor, 0.3).toString(),
        ...(props.simple || props.border
          ? {
            color: base,
            'close-color': base,
          }
          : {}),
        ...(props.simple
          ? {
            'bg-color': adjustAlpha(baseColor, 0.2).toString(),
          }
          : {}),
      })
    })

    function handleClose(event: MouseEvent) {
      if (!props.closable || props.disabled || event.button > 0) {
        return false
      }

      event.stopPropagation()
      emitEvent(props.onClose)
    }

    function renderClose() {
      if (!props.closable) return null

      return (
        <button type={'button'} class={nh.be('close')} onClick={handleClose}>
          <Icon {...icons.value.close} label={'close'}></Icon>
        </button>
      )
    }

    return () => {
      const hasPrefix = !!(props.prefix === 0 || props.prefix || slots.prefix || props.slots.prefix)
      const hasSuffix = !!(props.suffix === 0 || props.suffix || slots.suffix || props.slots.suffix)

      return (
        <div class={className.value} style={style.value}>
          {hasPrefix ? (
            <span
              class={[nh.be('unit'), nh.be('prefix')]}
              style={{
                color: props.prefixColor,
                backgroundColor: props.prefixBg,
                borderColor: props.prefixBg,
              }}
            >
              {renderSlot(slots, 'prefix', undefined, () => [
                <Renderer renderer={props.slots.prefix}>{props.prefix}</Renderer>,
              ])}
            </span>
          ) : null}
          <span class={[nh.be('unit'), nh.be('content')]}>
            {renderSlot(slots, 'default', undefined, () => [
              <Renderer renderer={props.slots.default}></Renderer>,
            ])}
            {!hasSuffix && renderClose()}
          </span>
          {hasSuffix ? (
            <span
              class={[nh.be('unit'), nh.be('suffix')]}
              style={{
                color: props.suffixColor,
                backgroundColor: props.suffixBg,
                borderColor: props.suffixBg,
              }}
            >
              {renderSlot(slots, 'suffix', undefined, () => [
                <Renderer renderer={props.slots.suffix}>{props.suffix}</Renderer>,
              ])}
              {renderClose()}
            </span>
          ) : null}
        </div>
      )
    }
  },
})
