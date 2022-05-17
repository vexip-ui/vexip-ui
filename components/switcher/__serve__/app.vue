<template>
  <Switcher v-model:value="checked"></Switcher>
  <p>
    Switcher Value:
    <br />
    {{ checked }}
  </p>
  <template v-for="state in states" :key="state">
    <Switcher :state="state"></Switcher>
  </template>
  <br />
  <br />
  <template v-for="state in states" :key="state">
    <Switcher :state="state" open-text="打开" close-text="关闭"></Switcher>
  </template>
  <br />
  <br />
  <template v-for="state in states" :key="state">
    <Switcher :state="state" disabled></Switcher>
  </template>
  <br />
  <br />
  <template v-for="state in states" :key="state">
    <Switcher
      :state="state"
      disabled
      open-text="打开"
      close-text="关闭"
    ></Switcher>
  </template>
  <br />
  <br />
  <template v-for="size in sizes" :key="size">
    <Switcher :size="size"></Switcher>
  </template>
  <br />
  <br />
  <template v-for="size in sizes" :key="size">
    <Switcher :size="size" open-text="打开" close-text="关闭"></Switcher>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switcher } from '..'

const checked = ref(false)

const states = ['default', 'success', 'error', 'warning'] as const
const sizes = ['small', 'default', 'large'] as const
</script>
