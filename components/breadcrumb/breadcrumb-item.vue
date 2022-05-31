<template>
  <div :class="`${prefix}__item`">
    <div :class="`${prefix}__label`" @click="handleClick">
      <slot>{{ label }}</slot>
    </div>
    <div :class="`${prefix}__separator`" @click="handleSeparatorClick">
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
import { isFunction } from '@vexip-ui/utils'
import { BREADCRUMB_STATE } from './symbol'

import type { SeparatorRenderFn, ItemState } from './symbol'

const props = {
  label: {
    type: [String, Number],
    default: null
  }
}

export default defineComponent({
  name: 'BreadcrumbItem',
  components: {
    Renderer
  },
  props,
  emits: ['select', 'separator-click'],
  setup(props, { emit }) {
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
      emit('select', currentLabel.value)
      breadcrumbState?.handleSelect(currentLabel.value)
    }

    function handleSeparatorClick() {
      emit('separator-click', currentLabel.value)
      breadcrumbState?.handleSeparatorClick(currentLabel.value)
    }

    return {
      prefix: 'vxp-breadcrumb',
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
