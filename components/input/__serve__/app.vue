<template>
  <Input
    v-model:value="value"
    clearable
    suffix="user"
    @on-clear="clear"
    @on-focus="focus"
  ></Input>
  <p>Input Value: {{ value }}</p>
  <br />
  <!-- <Input>
    <template #before>
      http://
    </template>
    <template #after>
      .com
    </template>
  </Input> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Input } from '..'

import '@/common/icons/user'

export default defineComponent({
  name: 'App',
  components: {
    Input
  },
  setup() {
    const value = ref('1')

    function clear() {
      console.log('clear')
    }

    function focus() {
      console.log('focus')
    }

    return {
      value,
      clear,
      focus
    }
  }
})
</script>

<style lang="scss">
.vxp-input-wrapper {
  width: 300px;
}
</style>
