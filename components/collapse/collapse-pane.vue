<template>
  <section :class="className">
    <div :class="`${prefix}__header`" @click="handleToggle">
      <div :class="`${prefix}__arrow`">
        <Icon><ChevronRight></ChevronRight></Icon>
      </div>
      <slot name="title">
        <div v-if="props.icon" :class="`${prefix}__icon`">
          <Icon :icon="props.icon"></Icon>
        </div>
        {{ props.title }}
      </slot>
    </div>
    <CollapseTransition>
      <div v-if="currentExpanded" :class="`${prefix}__body`">
        <div :class="`${prefix}__content`" :style="props.contentStyle">
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
import { useProps, booleanProp } from '@vexip-ui/config'
import { randomString } from '@vexip-ui/utils'
import { ChevronRight } from '@vexip-ui/icons'
import { COLLAPSE_STATE } from './symbol'

import type { PropType } from 'vue'
import type { CollapseArrowType } from './symbol'

export default defineComponent({
  name: 'CollapsePane',
  components: {
    CollapseTransition,
    Icon,
    ChevronRight
  },
  props: {
    label: [String, Number],
    title: String,
    disabled: booleanProp,
    contentStyle: Object,
    expanded: booleanProp,
    card: booleanProp,
    arrowType: String as PropType<CollapseArrowType>,
    icon: Object,
    ghost: booleanProp
  },
  emits: ['toggle', 'update:expanded'],
  setup(_props, { emit }) {
    const props = useProps('collapsePane', _props, {
      label: {
        default: null,
        static: true
      },
      title: '',
      disabled: false,
      contentStyle: null,
      expanded: false,
      card: false,
      arrowType: {
        default: 'right' as CollapseArrowType,
        validator: (value: CollapseArrowType) => ['right', 'left', 'none'].includes(value)
      },
      icon: null,
      ghost: false
    })

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
      emit('toggle', value)
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
      props,
      prefix,
      currentExpanded,

      className,

      handleToggle
    }
  }
})
</script>
