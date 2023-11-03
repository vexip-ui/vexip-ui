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
        <Icon v-bind="icons.arrowRight"></Icon>
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

<script lang="ts">
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'

import { computed, defineComponent, inject, onBeforeUnmount, reactive, ref, watch } from 'vue'

import { emitEvent, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { collapsePanelProps } from './props'
import { COLLAPSE_STATE } from './symbol'

import type { CollapseArrowType, PanelState } from './symbol'

let idCount = 0

export default defineComponent({
  name: 'CollapsePanel',
  components: {
    CollapseTransition,
    Icon
  },
  props: collapsePanelProps,
  emits: ['update:expanded'],
  setup(_props, { emit }) {
    const props = useProps('collapsePanel', _props, {
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
    const icons = useIcons()
    const currentExpanded = ref(props.expanded)
    const currentLabel = ref(props.label)

    const tab = ref<HTMLElement>()

    const id = idCount++

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
          [nh.bem('panel', 'disabled')]: props.disabled
        }
      ]
    })

    if (collapseState) {
      const state: PanelState = reactive({
        tab,
        label: currentLabel,
        expanded: currentExpanded,
        setExpanded
      })

      watch(
        () => props.label,
        value => {
          const prevValue = currentLabel.value
          currentLabel.value = value || value === 0 ? value : prevValue
        }
      )

      // if (props.label || props.label === 0) {
      //   currentLabel.value = props.label
      // } else {
      //   currentLabel.value = randomString()
      // }

      collapseState.registerPanel(state)

      onBeforeUnmount(() => {
        collapseState.unregisterPanel(state)
      })
    } else {
      watch(
        () => props.expanded,
        value => {
          currentExpanded.value = value
        }
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

    return {
      props,
      nh,
      icons,
      currentExpanded,

      tab,

      tabId,
      bodyId,
      className,

      handleToggle
    }
  }
})
</script>
