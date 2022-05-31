<template>
  <div>
    <CheckboxGroup v-model:values="values">
      <Checkbox
        v-for="item in items"
        :key="item"
        :label="item"
        :value="item"
      ></Checkbox>
    </CheckboxGroup>
    <br />
    values: {{ values }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const values = ref<string[]>([])

    return {
      values,
      items: ['北京', '上海', '广州', '深圳']
    }
  }
})
</script>
