<template>
  <Textarea
    v-model:value="value"
    placeholder="Basis usage"
    style="width: 220px;"
  ></Textarea>
  <p>
    Textarea Value: {{ value }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
