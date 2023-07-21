<template>
  <li :class="nh.be('item')">
    <a
      :class="nh.be('label')"
      tabindex="0"
      @click="handleClick"
      @keydown.enter="handleClick"
    >
      <slot>{{ label }}</slot>
    </a>
    <span :class="nh.be('separator')" role="separator" @click="handleSeparatorClick">
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
    </span>
  </li>
</template>

<script lang="ts">
import { Renderer } from '@/components/renderer'

import { defineComponent, inject, onBeforeUnmount, reactive, ref, watch } from 'vue'

import { emitEvent, useNameHelper } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'
import { breadcrumbItemProps } from './props'
import { BREADCRUMB_STATE } from './symbol'

import type { BreadcrumbItemState, SelectEvent, SeparatorRenderFn } from './symbol'

export default defineComponent({
  name: 'BreadcrumbItem',
  components: {
    Renderer
  },
  props: breadcrumbItemProps,
  emits: [],
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
      const state: BreadcrumbItemState = reactive({
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
      emitEvent(props.onSelect! as SelectEvent, currentLabel.value)
      breadcrumbState?.handleSelect(currentLabel.value)
    }

    function handleSeparatorClick() {
      emitEvent(props.onSeparatorClick! as SelectEvent, currentLabel.value)
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
