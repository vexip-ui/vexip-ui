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
  <Button type="primary" @on-click="doFocus">
    Focus
  </Button>
  <br />
  <br />
  <Input>
    <template #before>
      http://
    </template>
    <template #after>
      .com
    </template>
  </Input>
  <br />
  <br />
  <template v-for="state in states" :key="state">
    <Input :state="state"></Input>
    <br />
    <br />
  </template>
  <template v-for="state in states" :key="state">
    <Input :state="state" disabled></Input>
    <br />
    <br />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/button'
import { Input } from '..'

import '@/common/icons/user'

const value = ref('1')
const input = ref<InstanceType<typeof Input> | null>(null)
const states = ['default', 'success', 'error', 'warning'] as const

function clear() {
  console.log('clear')
}

function focus() {
  console.log('focus')
}

function doFocus() {
  input.value?.focus()
}
</script>

<style lang="scss">
.vxp-input-wrapper {
  width: 300px;
}
</style>
