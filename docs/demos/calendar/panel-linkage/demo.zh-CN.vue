<template>
  <CalendarPanel v-model:value="value" select-row></CalendarPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<Date>()
</script>
