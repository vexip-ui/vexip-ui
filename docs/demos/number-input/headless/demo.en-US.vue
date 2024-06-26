<template>
  <div ref="wrapper" v-bind="wrapperProps" style="display: inline-flex">
    <input ref="control" v-bind="controlProps" />
    <button v-bind="plusButtonProps">
      +
    </button>
    <button v-bind="minusButtonProps">
      -
    </button>
    <button v-if="showClear" v-bind="clearButtonProps">
      x
    </button>
  </div>
  <p>Number Input Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useNumberInput } from 'vexip-ui'

const value = ref<number>()

const {
  showClear,

  wrapper,
  control,

  wrapperProps,
  controlProps,
  clearButtonProps,
  plusButtonProps,
  minusButtonProps
} = useNumberInput({
  value,
  clearable: true,
  onUpdateValue: newValue => (value.value = newValue)
})
</script>
