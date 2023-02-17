<template>
  <Calendar v-model:value="value"></Calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<Date>()
</script>
