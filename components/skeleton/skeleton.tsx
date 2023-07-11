import { Icon } from '@/components/icon'

import { computed, defineComponent, h, inject, renderSlot } from 'vue'

import { useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { skeletonProps } from './props'
import { GROUP_STATE } from './symbol'

export default defineComponent({
  name: 'Skeleton',
  inheritAttrs: false,
  props: skeletonProps,
  setup(_props, { attrs, slots }) {
    const props = useProps('skeleton', _props, {
      size: null,
      width: null,
      height: null,
      repeat: {
        default: 1,
        validator: (value: number) => value > 0
      },
      tag: 'div',
      activated: null,
      image: false,
      imageIcon: null,
      iconScale: 4,
      round: null,
      circle: null,
      block: null,
      spread: 0,
      loading: null
    })

    const groupState = inject(GROUP_STATE, {} as any)

    const nh = useNameHelper('skeleton')
    const icons = useIcons()

    const activated = computed(() => {
      return props.activated ?? groupState.activated ?? false
    })
    const round = computed(() => {
      return props.round ?? groupState.round ?? false
    })
    const circle = computed(() => {
      return props.circle ?? groupState.circle ?? false
    })
    const block = computed(() => {
      return props.block ?? groupState.block ?? false
    })
    const loading = computed(() => {
      return props.loading ?? groupState.loading ?? true
    })
    const tag = computed(() => {
      return props.tag || groupState.itemTag || 'div'
    })
    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: Object.keys(groupState).length || props.inherit,
        [nh.bm(props.size)]: props.size ?? groupState?.size,
        [nh.bm('block')]: block.value,
        [nh.bm('image')]: props.image,
        [nh.bm('round')]: round.value && !circle.value,
        [nh.bm('circle')]: circle.value,
        [nh.bm('activated')]: activated.value
      }
    })
    const style = computed(() => {
      const style: Record<string, string> = {}

      if (props.width !== null) {
        style[nh.cv('width')] = parseSize(props.width)
      }

      if (props.height !== null) {
        style[nh.cv('height')] = parseSize(props.height)
      }

      if (props.spread) {
        style[nh.cv('spread')] = parseSize(props.spread)
      }

      return style
    })

    function parseSize(value: string | number) {
      if (typeof value === 'number') {
        return `${value}px`
      }

      value = value.trim()

      if (/\d$/.test(value)) {
        return `${value}px`
      }

      return value
    }

    function renderSkeleton() {
      if (!loading.value) {
        return renderSlot(slots, 'default')
      }

      return h(
        tag.value || 'div',
        {
          ...attrs,
          class: [className.value, attrs.class],
          style: [style.value, attrs.style]
        },
        props.image
          ? [
            <Icon
              key={1}
              {...icons.value.image}
              icon={props.imageIcon || icons.value.image.icon}
              scale={props.iconScale}
            ></Icon>
            ]
          : []
      )
    }

    return () => {
      if (props.repeat > 1) {
        return Array.from({ length: props.repeat }, () => renderSkeleton())
      }

      return renderSkeleton()
    }
  }
})
