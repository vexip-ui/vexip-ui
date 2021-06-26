<template>
  <NumberInput v-model:value="value" clearable suffix="flag"></NumberInput>
  <p>Number Input Value: {{ value }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NumberInput from '../number-input.vue'

import '@/common/icons/flag'

export default defineComponent({
  name: 'App',
  components: {
    NumberInput
  },
  data() {
    return {
      value: null
    }
  }
})
</script>

<style lang="scss">
.vxp-number-input {
  width: 300px;
}
</style>
