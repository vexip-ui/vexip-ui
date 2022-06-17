<template>
  Activated: <Switcher v-model:value="activated"></Switcher>
  <br />
  <br />
  <Skeleton :activated="activated" width="33%" :spread="14"></Skeleton>
  <Skeleton :activated="activated" :repeat="4"></Skeleton>
  <Skeleton :activated="activated" width="67%"></Skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activated = ref(true)
</script>
