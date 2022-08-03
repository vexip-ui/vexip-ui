import { defineComponent, computed, inject, h, renderSlot } from 'vue'
import { ImageR } from '@vexip-ui/icons'
import { Icon } from '@/components/icon'
import { useNameHelper, useProps, booleanProp, sizeProp } from '@vexip-ui/config'
import { GROUP_STATE } from './symbol'

export default defineComponent({
  name: 'Skeleton',
  inheritAttrs: false,
  props: {
    size: sizeProp,
    width: [Number, String],
    height: [Number, String],
    repeat: Number,
    tag: String,
    activated: booleanProp,
    image: booleanProp,
    imageIcon: Object,
    iconScale: Number,
    round: booleanProp,
    circle: booleanProp,
    block: booleanProp,
    spread: Number,
    loading: booleanProp
  },
  setup(_props, { slots }) {
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
          class: className.value,
          style: style.value
        },
        props.image ? [<Icon icon={props.imageIcon || ImageR} scale={props.iconScale}></Icon>] : []
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
