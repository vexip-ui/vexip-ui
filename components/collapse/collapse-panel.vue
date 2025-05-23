<script setup lang="ts">
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'

import { computed, inject, onBeforeUnmount, reactive, ref, watch } from 'vue'

import { createIconProp, emitEvent, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { collapsePanelProps } from './props'
import { COLLAPSE_STATE, getIndexId } from './symbol'

import type { CollapseArrowType, PanelState } from './symbol'

defineOptions({ name: 'CollapsePanel' })

const _props = defineProps(collapsePanelProps)
const props = useProps('collapsePanel', _props, {
  label: {
    default: null,
    static: true,
  },
  title: '',
  disabled: false,
  contentStyle: null,
  expanded: false,
  card: false,
  arrowType: {
    default: 'right' as CollapseArrowType,
    validator: (value: CollapseArrowType) => ['right', 'left', 'none'].includes(value),
  },
  icon: createIconProp(),
  ghost: false,
})

const emit = defineEmits(['update:expanded'])

const collapseState = inject(COLLAPSE_STATE, null)

const nh = useNameHelper('collapse')
const icons = useIcons()
const currentExpanded = ref(props.expanded)
const currentLabel = ref(props.label)

const tab = ref<HTMLElement>()

const id = getIndexId()

const tabId = computed(() => `${nh.be('tab')}-${id}`)
const bodyId = computed(() => `${nh.be('body')}-${id}`)
const useCard = computed(() => {
  if (!collapseState) {
    return props.card
  }

  return false
})
const useGhost = computed(() => {
  if (!collapseState) {
    return props.ghost
  }

  return false
})
const useArrowType = computed(() => {
  if (collapseState) {
    return collapseState.arrowType
  }

  return props.arrowType
})
const className = computed(() => {
  return [
    nh.be('panel'),
    nh.bs('vars'),
    nh.bem('panel', `arrow-${useArrowType.value}`),
    {
      [nh.bem('panel', 'inherit')]: collapseState || props.inherit,
      [nh.bem('panel', 'card')]: useCard.value,
      [nh.bem('panel', 'ghost')]: !useCard.value && useGhost.value,
      [nh.bem('panel', 'expanded')]: currentExpanded.value,
      [nh.bem('panel', 'disabled')]: props.disabled,
    },
  ]
})

if (collapseState) {
  const state: PanelState = reactive({
    tab,
    label: currentLabel,
    expanded: currentExpanded,
    setExpanded,
  })

  watch(
    () => props.label,
    value => {
      const prevValue = currentLabel.value
      currentLabel.value = value || value === 0 ? value : prevValue
    },
  )

  collapseState.registerPanel(state)

  onBeforeUnmount(() => {
    collapseState.unregisterPanel(state)
  })
} else {
  watch(
    () => props.expanded,
    value => {
      currentExpanded.value = value
    },
  )
}

function setExpanded(expanded: boolean) {
  currentExpanded.value = expanded

  emit('update:expanded', expanded)
  emitEvent(props.onToggle, expanded)
}

function handleToggle(expanded = !currentExpanded.value) {
  if (props.disabled) return

  if (collapseState) {
    // 由父级进行管理
    collapseState.expandPanel(currentLabel.value, expanded)
  } else {
    setExpanded(expanded)
  }
}

defineExpose({
  currentExpanded,
  tab,
  tabId,
  bodyId,
  handleToggle,
})
</script>

<template>
  <section :class="className">
    <button
      :id="tabId"
      ref="tab"
      :class="nh.be('header')"
      type="button"
      role="tab"
      :aria-expanded="currentExpanded"
      :aria-controls="bodyId"
      :aria-describedby="bodyId"
      @click="handleToggle()"
    >
      <div :class="nh.be('arrow')">
        <Icon v-bind="icons.angleRight"></Icon>
      </div>
      <slot name="title">
        <div v-if="props.icon" :class="nh.be('icon')">
          <Icon :icon="props.icon"></Icon>
        </div>
        {{ props.title }}
      </slot>
    </button>
    <CollapseTransition>
      <div
        v-if="currentExpanded"
        :id="bodyId"
        :class="nh.be('body')"
        role="tabpanel"
        tabindex="0"
        :aria-labelledby="tabId"
      >
        <div :class="nh.be('content')" :style="props.contentStyle">
          <slot></slot>
        </div>
      </div>
    </CollapseTransition>
  </section>
</template>
