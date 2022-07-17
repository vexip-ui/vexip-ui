<template>
  <div :class="nh.be('item')">
    <div :class="nh.be('label')" @click="handleClick">
      <slot>{{ label }}</slot>
    </div>
    <div :class="nh.be('separator')" @click="handleSeparatorClick">
      <slot name="separator">
        <Renderer
          v-if="isFunction(separatorRenderer)"
          :renderer="separatorRenderer"
          :data="{ label: currentLabel }"
        ></Renderer>
        <template v-else>
          {{ separator }}
        </template>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, inject, onBeforeUnmount } from 'vue'
import { Renderer } from '@/components/renderer'
import { useNameHelper } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'
import { BREADCRUMB_STATE } from './symbol'

import type { PropType } from 'vue'
import type { SeparatorRenderFn, ItemState } from './symbol'

export default defineComponent({
  name: 'BreadcrumbItem',
  components: {
    Renderer
  },
  props: {
    label: {
      type: [String, Number],
      default: null
    },
    onSelect: Function as PropType<(label: string | number) => void>,
    onSeparatorClick: Function as PropType<(label: string | number) => void>
  },
  setup(props) {
    const breadcrumbState = inject(BREADCRUMB_STATE, null)

    const currentLabel = ref(props.label)
    const separator = ref('/')
    const separatorRenderer = ref<SeparatorRenderFn | null>(null)

    watch(
      () => props.label,
      value => {
        currentLabel.value = value
        breadcrumbState?.refreshLabels()
      }
    )

    if (breadcrumbState) {
      const state: ItemState = reactive({
        label: currentLabel
      })

      watch(
        () => breadcrumbState.separator,
        value => {
          separator.value = value
        },
        { immediate: true }
      )
      watch(
        () => breadcrumbState.separatorRenderer,
        value => {
          separatorRenderer.value = value
        },
        { immediate: true }
      )

      breadcrumbState.increaseItem(state)

      onBeforeUnmount(() => {
        breadcrumbState.decreaseItem(state)
      })
    }

    function handleClick() {
      props.onSelect?.(currentLabel.value)
      breadcrumbState?.handleSelect(currentLabel.value)
    }

    function handleSeparatorClick() {
      props.onSeparatorClick?.(currentLabel.value)
      breadcrumbState?.handleSeparatorClick(currentLabel.value)
    }

    return {
      nh: useNameHelper('breadcrumb'),
      currentLabel,
      separator,
      separatorRenderer,

      isFunction,
      handleClick,
      handleSeparatorClick
    }
  }
})
</script>
