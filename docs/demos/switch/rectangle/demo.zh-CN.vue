<template>
  <Switch v-model:value="checked" rectangle></Switch>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>
