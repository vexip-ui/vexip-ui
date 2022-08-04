<template>
  <CheckboxGroup v-model:value="values">
    <Row>
      <Column>
        <Checkbox control>
          All
        </Checkbox>
      </Column>
      <Divider></Divider>
      <Column v-for="item in rangeItems" :key="item" :span="6">
        <Checkbox :label="item.toString()">
          {{ `Option - ${item}` }}
        </Checkbox>
      </Column>
    </Row>
  </CheckboxGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const values = ref<string[]>([])
const rangeItems = Array.from({ length: 12 }, (_, index) => index + 1)
</script>
