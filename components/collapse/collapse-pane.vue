<template>
  <section :class="className">
    <div :class="`${prefix}__header`" @click="handleToggle">
      <div :class="`${prefix}__arrow`">
        <Icon><ChevronRight></ChevronRight></Icon>
      </div>
      <slot name="title">
        <div v-if="icon" :class="`${prefix}__icon`">
          <Icon :icon="icon"></Icon>
        </div>
        {{ title }}
      </slot>
    </div>
    <CollapseTransition>
      <div v-if="currentExpanded" :class="`${prefix}__body`">
        <div :class="`${prefix}__content`" :style="contentStyle">
          <slot></slot>
        </div>
      </div>
    </CollapseTransition>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject, watch, onMounted, onBeforeUnmount } from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { useConfiguredProps } from '@vexip-ui/config'
import { randomString } from '@vexip-ui/utils'
import { ChevronRight } from '@vexip-ui/icons'
import { COLLAPSE_STATE } from './symbol'

import type { PropType, CSSProperties } from 'vue'
import type { CollapseArrowType } from './symbol'

const props = useConfiguredProps('collapsePane', {
  label: {
    type: [String, Number],
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  contentStyle: {
    type: Object as PropType<CSSProperties>,
    default: null
  },
  expanded: {
    type: Boolean,
    default: false
  },
  card: {
    type: Boolean,
    default: false
  },
  arrowType: {
    default: 'right' as CollapseArrowType,
    validator: (value: CollapseArrowType) => {
      return ['right', 'left', 'none'].includes(value)
    }
  },
  icon: {
    type: Object,
    default: null
  },
  ghost: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'CollapsePane',
  components: {
    CollapseTransition,
    Icon,
    ChevronRight
  },
  props,
  emits: ['on-toggle', 'update:expanded'],
  setup(props, { emit }) {
    const collapseState = inject(COLLAPSE_STATE, null)

    const prefix = 'vxp-collapse'
    const currentExpanded = ref(props.expanded)
    const currentLabel = ref<string | number>('')

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
        `${prefix}__pane`,
        `${prefix}-vars`,
        `${prefix}__pane--arrow-${useArrowType.value}`,
        {
          [`${prefix}__pane--card`]: useCard.value,
          [`${prefix}__pane--ghost`]: !useCard.value && useGhost.value,
          [`${prefix}__pane--expanded`]: currentExpanded,
          [`${prefix}__pane--disabled`]: props.disabled
        }
      ]
    })

    watch(
      () => props.label,
      value => {
        const prevValue = currentLabel.value
        currentLabel.value = value || value === 0 ? value : prevValue

        if (collapseState && prevValue !== currentLabel.value) {
          collapseState.unregisterPane(prevValue)
          collapseState.registerPane(currentLabel.value, currentExpanded)
        }
      }
    )
    watch(currentExpanded, value => {
      emit('on-toggle', value)
      emit('update:expanded', value)
    })

    if (!collapseState) {
      watch(
        () => props.expanded,
        value => {
          currentExpanded.value = value
        }
      )
    }

    if (collapseState) {
      onMounted(() => {
        if (props.label || props.label === 0) {
          currentLabel.value = props.label
        } else {
          currentLabel.value = randomString()
        }

        collapseState.registerPane(currentLabel.value, currentExpanded)
      })

      onBeforeUnmount(() => {
        collapseState.unregisterPane(currentLabel.value)
      })
    }

    function handleToggle() {
      if (props.disabled) return

      if (collapseState) {
        // 由父级进行管理
        collapseState.expandPane(currentLabel.value, !currentExpanded.value)
      } else {
        currentExpanded.value = !currentExpanded.value
      }
    }

    return {
      prefix,
      currentExpanded,

      className,

      handleToggle
    }
  }
})
</script>
