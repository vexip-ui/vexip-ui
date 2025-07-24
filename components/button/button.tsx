import { Badge } from '@/components/badge'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { FIELD_OPTIONS } from '@/components/form/symbol'
import { Renderer } from '@/components/renderer'

import { computed, defineComponent, inject, onBeforeUnmount, reactive, ref, renderSlot } from 'vue'

import {
  createIconProp,
  createSizeProp,
  emitEvent,
  useIcons,
  useNameHelper,
  useProps,
} from '@vexip-ui/config'
import { adjustAlpha, isClient, mixColor, parseColorToRgba } from '@vexip-ui/utils'
import { buttonProps } from './props'
import { GROUP_STATE, buttonTypes } from './symbol'

export default defineComponent({
  name: 'Button',
  props: buttonProps,
  emits: [],
  setup(_props, { slots }) {
    const fieldActions = inject(FIELD_OPTIONS, null)

    const props = useProps('button', _props, {
      size: createSizeProp(fieldActions ? fieldActions.size : undefined),
      type: {
        default: null,
        validator: value => buttonTypes.includes(value),
      },
      dashed: false,
      text: false,
      simple: false,
      ghost: false,
      disabled: () => (fieldActions ? fieldActions.disabled.value : false),
      loading: () => (fieldActions ? fieldActions.loading.value : false),
      circle: false,
      loadingIcon: createIconProp(),
      loadingEffect: null,
      icon: createIconProp(),
      color: null,
      buttonType: {
        default: 'button',
        validator: value => ['button', 'submit', 'reset'].includes(value),
      },
      block: false,
      tag: 'button',
      noPulse: false,
      badge: null,
      slots: () => ({}),
    })

    const groupState = inject(GROUP_STATE, null)

    const nh = useNameHelper('button')
    const icons = useIcons()
    const pulsing = ref(false)
    const index = ref(0)
    const isLast = ref(false)

    const isIconOnly = computed(() => {
      return !slots.default && !props.slots.default
    })
    const type = computed(() => {
      return props.type ?? groupState?.type ?? 'default'
    })
    const size = computed(() => {
      return groupState?.size ?? props.size
    })
    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm(type.value)]: type.value !== 'default',
        [nh.bm('simple')]: !props.ghost && props.simple,
        [nh.bm('ghost')]: props.ghost,
        [nh.bm('text')]: props.text,
        [nh.bm('dashed')]: props.dashed,
        [nh.bm('disabled')]: props.disabled,
        [nh.bm('loading')]: props.loading,
        [nh.bm('circle')]: props.circle,
        [nh.bm('icon-only')]: isIconOnly.value,
        [nh.bm(size.value)]: size.value !== 'default',
        [nh.bm('pulsing')]: pulsing.value,
        [nh.bm('first')]: index.value === 1,
        [nh.bm('last')]: isLast.value,
        [nh.bm('block')]: props.block,
      }
    })
    const colorMap = computed(() => {
      if (!props.color) return null

      const rootStyle = isClient ? getComputedStyle(document.documentElement) : null
      const black = parseColorToRgba(rootStyle?.getPropertyValue(nh.nv('color-black')) || '#000')
      const white = parseColorToRgba(rootStyle?.getPropertyValue(nh.nv('color-white')) || '#fff')
      const baseColor = parseColorToRgba(props.color)

      return {
        base: baseColor.toString(),
        light2: mixColor(white, baseColor, 0.2).toString(),
        dark1: mixColor(black, baseColor, 0.1).toString(),
        opacity1: adjustAlpha(baseColor, 0.9).toString(),
        opacity3: adjustAlpha(baseColor, 0.7).toString(),
        opacity4: adjustAlpha(baseColor, 0.6).toString(),
        opacity7: adjustAlpha(baseColor, 0.3).toString(),
        opacity8: adjustAlpha(baseColor, 0.2).toString(),
        white8: adjustAlpha(white, 0.2).toString(),
        white9: adjustAlpha(white, 0.1).toString(),
      }
    })
    const style = computed<Record<string, string>>(() => {
      if (!colorMap.value) return {}

      const {
        base,
        light2,
        dark1,
        opacity1,
        opacity3,
        opacity4,
        opacity7,
        opacity8,
        white8,
        white9,
      } = colorMap.value
      const { cvm, gnv } = nh

      if (props.ghost) {
        return cvm({
          color: base,
          'color-hover': base,
          'color-focus': base,
          'color-active': base,
          'color-disabled': base,
          'bg-color': 'transparent',
          'bg-color-hover': white9,
          'bg-color-focus': white9,
          'bg-color-active': white8,
          'bg-color-disabled': 'transparent',
          'b-color': base,
          'b-color-hover': light2,
          'b-color-focus': light2,
          'b-color-active': dark1,
          'b-color-disabled': gnv('content-color-disabled'),
          'pulse-s-color': dark1,
        })
      }

      if (props.simple) {
        return cvm({
          color: base,
          'color-hover': base,
          'color-focus': gnv('color-white'),
          'color-active': gnv('color-white'),
          'color-disabled': gnv('content-color-disabled'),
          'bg-color': opacity8,
          'bg-color-hover': opacity7,
          'bg-color-focus': opacity1,
          'bg-color-active': opacity1,
          'bg-color-disabled': gnv('fill-color-background'),
          'b-color': opacity4,
          'b-color-hover': opacity4,
          'b-color-focus': opacity3,
          'b-color-active': opacity3,
          'b-color-disabled': gnv('border-color-light-1'),
          'pulse-s-color': dark1,
        })
      }

      if (props.text || props.dashed) {
        return cvm({
          ...(props.dashed
            ? {
              'b-color': base,
              'b-color-hover': light2,
              'b-color-focus': light2,
              'b-color-active': dark1,
              'pulse-s-color': dark1,
            }
            : {}),
          color: base,
          'color-hover': light2,
          'color-focus': light2,
          'color-active': dark1,
          'color-disabled': opacity4,
        })
      }

      return cvm({
        color: gnv('color-white'),
        'color-hover': gnv('color-white'),
        'color-focus': gnv('color-white'),
        'color-active': gnv('color-white'),
        'color-disabled': gnv('content-color-disabled'),
        'bg-color': base,
        'bg-color-hover': light2,
        'bg-color-focus': light2,
        'bg-color-active': dark1,
        'bg-color-disabled': gnv('fill-color-background'),
        'b-color': base,
        'b-color-hover': light2,
        'b-color-focus': light2,
        'b-color-active': dark1,
        'b-color-disabled': gnv('border-color-light-1'),
        'pulse-s-color': dark1,
      })
    })

    if (groupState) {
      const state = reactive({ index, isLast })

      groupState.increaseItem(state)

      onBeforeUnmount(() => {
        groupState.decreaseItem(state)
      })
    }

    function handleClick(event: MouseEvent) {
      if (props.disabled || props.loading || event.button) return

      if (!props.noPulse) {
        pulsing.value = false
        requestAnimationFrame(() => {
          pulsing.value = true
        })
      }

      emitEvent(props.onClick, event)
    }

    function handleAnimationEnd() {
      pulsing.value = false
    }

    function renderLoadingIcon() {
      return (
        <div class={[nh.be('icon'), nh.bem('icon', 'loading')]}>
          {renderSlot(slots, 'loading', undefined, () => [
            <Renderer renderer={props.slots.loading}>
              <Icon
                {...icons.value.loading}
                effect={props.loadingEffect || icons.value.loading.effect}
                icon={props.loadingIcon || icons.value.loading.icon}
                label={'loading'}
              ></Icon>
            </Renderer>,
          ])}
        </div>
      )
    }

    function renderSingleIcon() {
      return props.loading ? (
        renderLoadingIcon()
      ) : (
        <div class={nh.be('icon')}>
          {renderSlot(slots, 'icon', undefined, () => [
            <Renderer renderer={props.slots.icon}>
              {props.icon ? <Icon icon={props.icon}></Icon> : null}
            </Renderer>,
          ])}
        </div>
      )
    }

    function renderCollapseIcon() {
      if (props.icon || slots.icon || props.slots.icon) {
        return props.loading ? (
          renderLoadingIcon()
        ) : (
          <div class={nh.be('icon')}>
            {renderSlot(slots, 'icon', undefined, () => [
              <Renderer renderer={props.slots.icon}>
                <Icon icon={props.icon}></Icon>
              </Renderer>,
            ])}
          </div>
        )
      }

      return (
        <CollapseTransition appear horizontal fade-effect>
          {props.loading && renderLoadingIcon()}
        </CollapseTransition>
      )
    }

    function renderBadge() {
      const badgeType = props.disabled
        ? 'disabled'
        : props.type === 'default'
          ? 'error'
          : props.type

      return (
        <Badge
          inherit
          class={[nh.be('badge'), nh.bem('badge', badgeType)]}
          content={props.badge}
          type={badgeType}
        ></Badge>
      )
    }

    return () => {
      const Button = (props.tag || 'button') as any

      return (
        <Button
          type={props.buttonType}
          class={className.value}
          role={'button'}
          style={style.value}
          disabled={props.disabled}
          onClick={handleClick}
          onAnimationend={handleAnimationEnd}
        >
          {isIconOnly.value ? renderSingleIcon() : renderCollapseIcon()}
          {!isIconOnly.value &&
            renderSlot(slots, 'default', undefined, () => [
              <Renderer renderer={props.slots.default}></Renderer>,
            ])}
          {!isIconOnly.value && (props.badge || props.badge === 0) ? renderBadge() : null}
        </Button>
      )
    }
  },
})
