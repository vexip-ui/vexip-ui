<template>
  <NumberInput v-model:value="value" clearable suffix="flag"></NumberInput>
  <p>Number Input Value: {{ value }}</p>
  <template v-for="state in states" :key="state">
    <NumberInput clearable :state="state"></NumberInput>
    <br />
    <br />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NumberInput from '../number-input.vue'

import '@/common/icons/flag'

const value = ref<number | null>(null)

const states = ['default', 'success', 'error', 'warning'] as const
</script>

<style lang="scss">
.vxp-number-input {
  width: 300px;
}
</style>
