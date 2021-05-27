<template>
  <NumberInput v-model:value="value"></NumberInput>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NumberInput from '../number-input.vue'

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
