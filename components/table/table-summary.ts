import { defineComponent, inject, onBeforeUnmount, reactive, renderSlot, watch } from 'vue'

import { useProps } from '@vexip-ui/config'
import { isNull } from '@vexip-ui/utils'
import { tableSummaryProps } from './props'
import { TABLE_ACTIONS } from './symbol'

import type { SummaryWithKey } from './symbol'

type SummaryPropKey = keyof typeof tableSummaryProps

const propKeys = Object.keys(tableSummaryProps) as SummaryPropKey[]
const aliases: Partial<Record<SummaryPropKey, string>> = {
  idKey: 'key',
}
const ignoredProps: SummaryPropKey[] = ['renderer']
const triggerProps: SummaryPropKey[] = ['idKey', 'cellSpan', 'order', 'above']

const funcProp = {
  default: null,
  isFunc: true,
  static: true,
}

export default defineComponent({
  name: 'TableSummary',
  props: tableSummaryProps,
  setup(_props, { slots }) {
    const props = useProps('tableSummary', _props, {
      idKey: {
        default: null,
        validator: value => !isNull(value),
        static: true,
      },
      class: null,
      style: null,
      attrs: null,
      cellSpan: funcProp,
      order: {
        default: 0,
        static: true,
      },
      above: {
        default: false,
        static: true,
      },
      meta: null,
      renderer: funcProp,
    })

    const tableAction = inject(TABLE_ACTIONS, null)
    const options = reactive({}) as SummaryWithKey

    for (const key of propKeys) {
      if (ignoredProps.includes(key)) continue

      const aliasKey = (aliases[key] || key) as keyof SummaryWithKey
      const trigger = triggerProps.includes(key)

      ;(options[aliasKey] as any) = props[key]

      watch(
        () => props[key],
        value => {
          ;(options[aliasKey] as any) = value
          trigger
            ? tableAction?.updateSummaries()
            : tableAction?.setSummaryProp(options.key, key, value)
        },
      )
    }

    watch(() => props.renderer, setRenderer)

    setRenderer()
    tableAction?.increaseSummary(options)

    onBeforeUnmount(() => {
      tableAction?.decreaseSummary(options)
    })

    function setRenderer() {
      options.renderer = data => {
        if (typeof data.column.summaryRenderer === 'function') {
          return data.column.summaryRenderer({
            ...data,
            summary: options,
          })
        }

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
  },
})
