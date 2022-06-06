<template>
  <slot v-if="onlyShowSlot"></slot>
  <li v-else :class="prefix">
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
import { defineComponent, ref, reactive, computed, inject, provide } from 'vue'
import { baseIndentWidth, MENU_STATE, MENU_ITEM_STATE, MENU_GROUP_STATE } from './symbol'

export default defineComponent({
  name: 'MenuGroup',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  setup() {
    const menuState = inject(MENU_STATE, null)
    const parentItemState = inject(MENU_ITEM_STATE, null)

    const indent = ref(1)

    if (parentItemState) {
      indent.value = parentItemState.indent + 1
    }

    const labelStyle = computed(() => {
      return {
        paddingLeft: parentItemState?.isUsePopper
          ? undefined
          : `${indent.value * baseIndentWidth}px`
      }
    })
    const onlyShowSlot = computed(() => {
      return menuState?.horizontal && !parentItemState
    })

    provide(MENU_GROUP_STATE, reactive({ indent }))

    return {
      prefix: 'vxp-menu-group',
      indent,

      labelStyle,
      onlyShowSlot
    }
  }
})
</script>
