<template>
  激活状态：<Switch v-model:value="activated"></Switch>
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
