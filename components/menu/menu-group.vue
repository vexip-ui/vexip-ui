<template>
  <li :class="prefix">
    <div :class="`${prefix}__title`">
      <span :class="`${prefix}__label`" :style="labelStyle">
        <slot name="label">
          {{ label }}
        </slot>
      </span>
    </div>
    <ul :class="`${prefix}__list`">
      <slot></slot>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from 'vue'
import { baseIndentWidth, MENU_ITEM_STATE } from './symbol'

import type { MenuItemState } from './symbol'

export default defineComponent({
  name: 'MenuGroup',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  setup() {
    const parentItemState = inject<MenuItemState | null>(MENU_ITEM_STATE, null)

    const indent = ref(1)

    if (parentItemState) {
      indent.value = parentItemState.indent + 1
    }

    const labelStyle = computed(() => {
      return {
        paddingLeft: parentItemState?.isUsePopper ? null : `${indent.value * baseIndentWidth}px`
      }
    })

    return {
      prefix: 'vxp-menu-group',
      indent,

      labelStyle
    }
  }
})
</script>
