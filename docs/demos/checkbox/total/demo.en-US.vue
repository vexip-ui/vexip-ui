<template>
  <CheckboxGroup v-model:value="values">
    <Checkbox control>
      All
    </Checkbox>
    <Checkbox v-for="item in items" :key="item" :label="item"></Checkbox>
  </CheckboxGroup>
  <br />
  values: {{ values }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

const values = ref<string[]>([])
const items = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
