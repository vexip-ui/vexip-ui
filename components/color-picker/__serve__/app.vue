<template>
  <div style="padding: 0 150px;">
    <ColorPicker
      v-model:value="color"
      alpha
      shortcut
      clearable
    ></ColorPicker>
    <p>
      Color Value:
      <br />
      {{ color }}
    </p>
    <Select></Select>
  </div>
  <template v-for="state in states" :key="state">
    <ColorPicker :state="state"></ColorPicker>
    <br />
    <br />
  </template>
  <template v-for="size in sizes" :key="size">
    <ColorPicker :size="size"></ColorPicker>
    <br />
    <br />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '@/components/select'
import { ColorPicker } from '..'

const color = ref('rgba(51, 154, 240, 0.6)')
const states = ['default', 'success', 'error', 'warning'] as const
const sizes = ['small', 'default', 'large'] as const
</script>
