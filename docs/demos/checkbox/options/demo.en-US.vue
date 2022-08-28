<template>
  <CheckboxGroup v-model:value="values" control :options="items"></CheckboxGroup>
  <br />
  values: {{ values }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

const values = ref<string[]>([])
const items = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
