import {
  defineComponent,
  inject,
  onBeforeUnmount,
  onBeforeUpdate,
  reactive,
  renderSlot,
  watch
} from 'vue'

import { useProps } from '@vexip-ui/config'
import { isNull } from '@vexip-ui/utils'
import { tableSummaryProps } from './props'
import { TABLE_ACTIONS } from './symbol'

import type { SummaryWithKey } from './symbol'

type SummaryPropKey = keyof typeof tableSummaryProps

const propKeys = Object.keys(tableSummaryProps) as SummaryPropKey[]
const aliases: Partial<Record<SummaryPropKey, string>> = {
  idKey: 'key'
}
const deepProps: SummaryPropKey[] = ['class', 'style', 'attrs']

export default defineComponent({
  name: 'TableSummary',
  props: tableSummaryProps,
  setup(_props, { slots }) {
    const props = useProps('tableSummary', _props, {
      idKey: {
        default: null,
        validator: value => !isNull(value),
        static: true
      },
      name: {
        default: '',
        static: true
      },
      class: null,
      style: null,
      attrs: null,
      order: {
        default: 0,
        static: true
      },
      above: {
        default: false,
        static: true
      },
      renderer: {
        default: null,
        isFunc: true,
        static: true
      }
    })

    const tableAction = inject(TABLE_ACTIONS, null)
    const options = reactive({}) as SummaryWithKey

    for (const key of propKeys) {
      if (key === 'renderer') continue

      const aliasKey = (aliases[key] || key) as keyof SummaryWithKey

      ;(options[aliasKey] as any) = props[key]

      watch(
        () => props[key],
        value => {
          (options[aliasKey] as any) = value
        },
        { deep: deepProps.includes(key) }
      )
    }

    watch(() => props.renderer, setRenderer)

    setRenderer()
    tableAction?.increaseSummary(options)

    onBeforeUpdate(() => {
      setRenderer()
    })

    onBeforeUnmount(() => {
      tableAction?.decreaseSummary(options)
    })

    function setRenderer() {
      options.renderer = data => {
        if (typeof slots.default === 'function') {
          return renderSlot(slots, 'default', data)
        }

        if (typeof props.renderer === 'function') {
          return props.renderer(data)
        }

        return ''
      }
    }

    return () => null
  }
})
