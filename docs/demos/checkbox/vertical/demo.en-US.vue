<template>
  <CheckboxGroup v-model:values="values" vertical>
    <Checkbox
      v-for="item in items"
      :key="item"
      :label="item"
      :value="item"
    ></Checkbox>
  </CheckboxGroup>
  <br />
  values: {{ values }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

const values = ref<string[]>([])
const items = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
