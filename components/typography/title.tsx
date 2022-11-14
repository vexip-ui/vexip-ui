import { defineComponent, computed } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { boundRange, isColor } from '@vexip-ui/utils'
import { titleProps } from './props'

export default defineComponent({
  name: 'Title',
  props: titleProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('title', _props, {
      type: 'default',
      level: 5,
      top: false,
      marker: false,
      aligned: false,
      thin: false,
      markerType: null
    })

    const nh = useNameHelper('title')

    const coloredMarker = computed(() => isColor(props.markerType))
    const markerType = computed(() => props.markerType || props.type)
    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm(props.type)]: props.type !== 'default',
        [nh.bm('top')]: props.top,
        [nh.bm('marker')]: props.marker,
        [nh.bm('aligned')]: props.aligned,
        [nh.bm('thin')]: props.thin,
        [nh.bm(`marker-${markerType.value}`)]:
          !coloredMarker.value && markerType.value !== 'default'
      }
    })
    const level = computed(() => boundRange(Math.round(props.level), 1, 6) || 5)
    const style = computed(() => {
      return coloredMarker.value
        ? {
            [nh.cv('marker-color')]: props.markerType
          }
        : null
    })

    return () => {
      const CustomTag = `h${level.value}` as any

      return (
        <CustomTag class={className.value} style={style.value}>
          {slots.default?.()}
        </CustomTag>
      )
    }
  }
})
