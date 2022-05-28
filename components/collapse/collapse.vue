<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRef,
  computed,
  watch,
  watchEffect,
  provide,
  onMounted,
  nextTick
} from 'vue'
import { useConfiguredProps } from '@vexip-ui/config'
import { removeArrayItem } from '@vexip-ui/utils'
import { COLLAPSE_STATE } from './symbol'

import type { PropType, Ref } from 'vue'
import type { CollapseArrowType } from './symbol'

const props = useConfiguredProps('collapse', {
  expanded: {
    type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
    default: null
  },
  card: {
    type: Boolean,
    default: false
  },
  accordion: {
    type: Boolean,
    default: false
  },
  arrowType: {
    default: 'right' as CollapseArrowType,
    validator: (value: CollapseArrowType) => {
      return ['right', 'left', 'none'].includes(value)
    }
  },
  ghost: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Collapse',
  props,
  emits: ['change', 'update:expanded'],
  setup(props, { emit }) {
    const prefix = 'vxp-collapse'
    const paneExpandedMap = new Map<string | number, Ref<boolean>>()
    const currentExpanded = ref<(string | number)[]>([])

    const className = computed(() => {
      return [
        prefix,
        `${prefix}-vars`,
        `${prefix}--arrow-${props.arrowType}`,
        {
          [`${prefix}--card`]: props.card,
          [`${prefix}--ghost`]: !props.card && props.ghost
        }
      ]
    })

    provide(
      COLLAPSE_STATE,
      reactive({
        arrowType: toRef(props, 'arrowType'),
        registerPane,
        unregisterPane,
        expandPane
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

    watch(currentExpanded, value => {
      updateItemExpanded()
      emit('change', value)
      emit('update:expanded', value)
    })

    onMounted(() => {
      nextTick(updateItemExpanded)
    })

    function registerPane(label: string | number, paneExpanded: Ref<boolean>) {
      paneExpandedMap.set(label, paneExpanded)

      if (currentExpanded.value.includes(label)) {
        paneExpanded.value = true
      } else if (paneExpanded.value) {
        expandPane(label, true)
      }
    }

    function unregisterPane(label: string | number) {
      paneExpandedMap.delete(label)
      expandPane(label, false)
    }

    function expandPane(label: string | number, expanded: boolean) {
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

      updateItemExpanded()
    }

    function updateItemExpanded() {
      paneExpandedMap.forEach((expanded, label) => {
        expanded.value = currentExpanded.value.includes(label)
      })
    }

    return {
      className
    }
  }
})
</script>
