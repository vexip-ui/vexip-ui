<template>
  <CheckboxGroup v-model:values="values">
    <Row>
      <Column>
        <Checkbox control>
          全选
        </Checkbox>
      </Column>
      <Divider></Divider>
      <Column v-for="item in rangeItems" :key="item" :span="6">
        <Checkbox :label="item.toString()">
          {{ `选项 - ${item}` }}
        </Checkbox>
      </Column>
    </Row>
  </CheckboxGroup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  data() {
    const values = ref<string[]>([])
    const rangeItems = Array.from({ length: 12 }, (_, index) => index + 1)

    return { values, rangeItems }
  }
})
</script>
