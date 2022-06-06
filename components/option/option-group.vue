<template>
  <li
    :class="{
      [prefix]: true,
      'vxp-option-vars': true,
      [`${prefix}--divided`]: divided
    }"
  >
    <div :class="`${prefix}__label`">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <ul :class="`${prefix}__list`">
      <slot></slot>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OptionGroup',
  props: {
    label: {
      type: String,
      default: ''
    },
    divided: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: 'vxp-option-group'
    }
  }
})
</script>
