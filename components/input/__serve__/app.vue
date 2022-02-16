<template>
  <Input
    ref="input"
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
  <Button type="primary" @on-click="doFocus">
    Focus
  </Button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Button } from '@/components/button'
import { Input } from '..'

import '@/common/icons/user'

export default defineComponent({
  name: 'App',
  components: {
    Button,
    Input
  },
  setup() {
    const value = ref('1')
    const input = ref<InstanceType<typeof Input> | null>(null)

    function clear() {
      console.log('clear')
    }

    function focus() {
      console.log('focus')
    }

    function doFocus() {
      input.value?.focus()
    }

    return {
      value,
      input,
      clear,
      focus,
      doFocus
    }
  }
})
</script>

<style lang="scss">
.vxp-input-wrapper {
  width: 300px;
}
</style>
