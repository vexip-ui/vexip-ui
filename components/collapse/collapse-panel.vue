<template>
  <section :class="className" :role="inGroup ? 'tab' : undefined" :aria-expanded="currentExpanded">
    <div :class="nh.be('header')" @click="handleToggle">
      <div :class="nh.be('arrow')">
        <Icon><ChevronRight></ChevronRight></Icon>
      </div>
      <slot name="title">
        <div v-if="props.icon" :class="nh.be('icon')">
          <Icon :icon="props.icon"></Icon>
        </div>
        {{ props.title }}
      </slot>
    </div>
    <CollapseTransition>
      <div v-if="currentExpanded" :class="nh.be('body')">
        <div :class="nh.be('content')" :style="props.contentStyle">
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
import {
  useNameHelper,
  useProps,
  booleanProp,
  styleProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { randomString } from '@vexip-ui/utils'
import { ChevronRight } from '@vexip-ui/icons'
import { COLLAPSE_STATE } from './symbol'

import type { PropType } from 'vue'
import type { CollapseArrowType } from './symbol'

export default defineComponent({
  name: 'CollapsePanel',
  components: {
    CollapseTransition,
    Icon,
    ChevronRight
  },
  props: {
    label: [String, Number],
    title: String,
    disabled: booleanProp,
    contentStyle: styleProp,
    expanded: booleanProp,
    card: booleanProp,
    arrowType: String as PropType<CollapseArrowType>,
    icon: Object,
    ghost: booleanProp,
    onToggle: eventProp<(expanded: boolean) => void>()
  },
  emits: ['update:expanded'],
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

    const nh = useNameHelper('collapse')
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
        nh.be('panel'),
        nh.bs('vars'),
        nh.bem('panel', `arrow-${useArrowType.value}`),
        {
          [nh.bem('panel', 'card')]: useCard.value,
          [nh.bem('panel', 'ghost')]: !useCard.value && useGhost.value,
          [nh.bem('panel', 'expanded')]: currentExpanded.value,
          [nh.bem('panel', 'disabled')]: props.disabled
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
      emitEvent(props.onToggle, value)
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
      nh,
      inGroup: !!collapseState,
      currentExpanded,

      className,

      handleToggle
    }
  }
})
</script>
