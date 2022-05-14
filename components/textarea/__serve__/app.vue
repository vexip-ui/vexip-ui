<template>
  <template v-for="state in states" :key="state">
    <Textarea :state="state" :max-length="100"></Textarea>
    <br />
    <br />
  </template>
  <template v-for="state in states" :key="state">
    <Textarea :state="state" disabled :max-length="100"></Textarea>
    <br />
    <br />
  </template>
</template>

<script setup lang="ts">
import { Textarea } from '..'

const states = ['default', 'success', 'error', 'warning'] as const
</script>

<style lang="scss">
.vxp-textarea {
  width: 300px;
}
</style>
