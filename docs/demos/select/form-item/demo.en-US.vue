<template>
  <Form :model="formModel">
    <FormItem label="Select" prop="values">
      <Select
        multiple
        clearable
        option-check
        :options="options"
      ></Select>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formModel = reactive({
  values: [5, 6]
})

const options = Array.from({ length: 12 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: i + 1
}))
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
