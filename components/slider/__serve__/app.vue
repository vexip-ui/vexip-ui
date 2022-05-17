<template>
  <div style="width: 400px; padding-top: 60px;">
    <Slider
      v-model:value="value"
      :step="5"
      :max="100"
      :min="-50"
      disabled
    ></Slider>
    <p>
      Slider Value:
      <br />
      {{ value }}
    </p>
    <template v-for="state in states" :key="state">
      <Slider :state="state" :value="20 + Math.random() * 40"></Slider>
      <br />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '..'

const value = ref(20)
const states = ['default', 'success', 'error', 'warning'] as const
</script>
