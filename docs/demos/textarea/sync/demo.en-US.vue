<template>
  <Textarea v-model:value="value" sync style="max-width: 300px;"></Textarea>
  <p>Textarea Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
