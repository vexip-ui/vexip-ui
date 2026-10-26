<template>
  <Radio v-model:value="value" label="radio">
    Radio
  </Radio>
  <br />
  <p style="margin: 10px 0">
    value: {{ value }}
  </p>
  <Button type="primary" size="small" @click="value = value ? '' : 'radio'">
    {{ value ? 'Cancel' : 'Select' }}
  </Button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
