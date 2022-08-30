<template>
  <CheckboxGroup v-model:value="values" control :options="items"></CheckboxGroup>
  <br />
  values: {{ values }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

const values = ref<string[]>([])
const items = ['北京', '上海', '广州', '深圳']
</script>
