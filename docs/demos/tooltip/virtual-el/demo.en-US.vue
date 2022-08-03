<template>
  <Button ref="button">
    External Element
  </Button>
  <Tooltip :virtual="button">
    Some tip content
  </Tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const button = ref<HTMLElement | null>(null)
</script>
