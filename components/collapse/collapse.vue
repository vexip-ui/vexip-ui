<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  toRef,
  watch,
  watchEffect,
} from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { useModifier } from '@vexip-ui/hooks'
import { debounceMinor, isNull, removeArrayItem } from '@vexip-ui/utils'
import { collapseProps } from './props'
import { COLLAPSE_STATE } from './symbol'

import type { CollapseArrowType, PanelState } from './symbol'

defineOptions({ name: 'Collapse' })

const _props = defineProps(collapseProps)
const props = useProps('collapse', _props, {
  expanded: {
    default: null,
    static: true,
  },
  card: false,
  accordion: false,
  arrowType: {
    default: 'right' as CollapseArrowType,
    validator: (value: CollapseArrowType) => ['right', 'left', 'none'].includes(value),
  },
  ghost: false,
  alive: false,
})

const emit = defineEmits(['update:expanded'])

const nh = useNameHelper('collapse')
const panelStates = reactive(new Set<PanelState>())
const currentExpanded = ref<(string | number)[]>([])

const { target: wrapper } = useModifier({
  passive: false,
  onKeyDown: (event, modifier) => {
    if (modifier.left || modifier.right) {
      if (!wrapper.value || ![...panelStates].find(({ tab }) => tab === event.target)) return

      const tabs = Array.from(wrapper.value.querySelectorAll(nh.cbe('header'))) as HTMLElement[]

      if (tabs.length < 1) return

      event.preventDefault()
      event.stopPropagation()

      const index = document.activeElement
        ? tabs.findIndex(panel => panel === document.activeElement)
        : -1

      if (~index) {
        const target = tabs[(index + (modifier.left ? -1 : 1) + tabs.length) % tabs.length]

        target?.focus()
      }
    } else if (modifier.escape) {
      event.preventDefault()
      event.stopPropagation()

      clearExpanded()
    }
  },
})

const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    nh.bm(`arrow-${props.arrowType}`),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('card')]: props.card,
      [nh.bm('ghost')]: !props.card && props.ghost,
    },
  ]
})

const refreshLabels = debounceMinor(() => {
  Array.from(panelStates.values()).forEach((item, index) => {
    if (isNull(item.label)) {
      item.label = index + 1
    }
  })

  if (panelStates.size) {
    for (const panel of panelStates) {
      if (currentExpanded.value.includes(panel.label)) {
        panel.expanded = true
      } else if (panel.expanded) {
        expandPanel(panel.label, true)
      }
    }
  }
})

provide(
  COLLAPSE_STATE,
  reactive({
    arrowType: toRef(props, 'arrowType'),
    alive: toRef(props, 'alive'),
    registerPanel,
    unregisterPanel,
    expandPanel,
    refreshLabels,
  }),
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

  watch(currentExpanded, (prev, next) => {
    if (!isSameExpanded(prev, next)) {
      updateItemExpanded()
    }
  })
})

defineExpose({ currentExpanded, wrapper })

function registerPanel(panel: PanelState) {
  panelStates.add(panel)

  refreshLabels()
}

function unregisterPanel(panel: PanelState) {
  panelStates.delete(panel)
  expandPanel(panel.label, false)
  refreshLabels()
}

function isSameExpanded(prev: (string | number)[], next: (string | number)[]) {
  const prevSet = new Set(prev)

  if (prevSet.size !== new Set(next).size) return false

  return next.every(item => prevSet.has(item))
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

function clearExpanded() {
  if (!currentExpanded.value.length) return

  currentExpanded.value = []

  emitChangeEvent()
  updateItemExpanded()
}

function emitChangeEvent() {
  emit('update:expanded', currentExpanded.value)
  emitEvent(props.onChange, currentExpanded.value)
}

function updateItemExpanded() {
  panelStates.forEach(panel => {
    panel.setExpanded(currentExpanded.value.includes(panel.label))
  })
}
</script>

<template>
  <div
    ref="wrapper"
    :class="className"
    role="tablist"
    tabindex="-1"
  >
    <slot></slot>
  </div>
</template>
