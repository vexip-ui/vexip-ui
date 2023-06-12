<template>
  <div :class="className" role="tablist">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  toRef,
  watchEffect
} from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { removeArrayItem } from '@vexip-ui/utils'
import { collapseProps } from './props'
import { COLLAPSE_STATE } from './symbol'

import type { CollapseArrowType, PanelState } from './symbol'

export default defineComponent({
  name: 'Collapse',
  props: collapseProps,
  emits: ['update:expanded'],
  setup(_props, { emit }) {
    const props = useProps('collapse', _props, {
      expanded: {
        default: null,
        static: true
      },
      card: false,
      accordion: false,
      arrowType: {
        default: 'right' as CollapseArrowType,
        validator: (value: CollapseArrowType) => ['right', 'left', 'none'].includes(value)
      },
      ghost: false
    })

    const nh = useNameHelper('collapse')
    const panelExpandedMap = new Map<string | number, PanelState>()
    const currentExpanded = ref<(string | number)[]>([])

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(`arrow-${props.arrowType}`),
        {
          [nh.bm('inherit')]: props.inherit,
          [nh.bm('card')]: props.card,
          [nh.bm('ghost')]: !props.card && props.ghost
        }
      ]
    })

    provide(
      COLLAPSE_STATE,
      reactive({
        arrowType: toRef(props, 'arrowType'),
        registerPanel,
        unregisterPanel,
        expandPanel
      })
    )

    watchEffect(() => {
      const rawExpanded = props.expanded
      const expanded =
        props.accordion && Array.isArray(rawExpanded)
          ? rawExpanded[0]
          : rawExpanded || rawExpanded === 0
            ? rawExpanded
            : []

      currentExpanded.value = Array.isArray(expanded) ? Array.from(expanded) : [expanded]
    })

    onMounted(() => {
      nextTick(updateItemExpanded)
    })

    function registerPanel(label: string | number, panel: PanelState) {
      panelExpandedMap.set(label, panel)

      if (currentExpanded.value.includes(label)) {
        panel.expanded.value = true
      } else if (panel.expanded.value) {
        expandPanel(label, true)
      }
    }

    function unregisterPanel(label: string | number) {
      panelExpandedMap.delete(label)
      expandPanel(label, false)
    }

    function expandPanel(label: string | number, expanded: boolean) {
      if (!label && label !== 0) return

      if (props.accordion) {
        currentExpanded.value = expanded ? [label] : []
      } else {
        if (expanded) {
          currentExpanded.value.push(label)
        } else {
          removeArrayItem(currentExpanded.value, label)
        }
      }

      emitChangeEvent()
      updateItemExpanded()
    }

    function emitChangeEvent() {
      emit('update:expanded', currentExpanded.value)
      emitEvent(props.onChange, currentExpanded.value)
    }

    function updateItemExpanded() {
      panelExpandedMap.forEach((panel, label) => {
        panel.setExpanded(currentExpanded.value.includes(label))
      })
    }

    return {
      className
    }
  }
})
</script>
