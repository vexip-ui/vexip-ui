<template>
  <Tabs v-model:active="active">
    <TabPane label="1">
      <template #label>
        标签一
      </template>
      <p>标签页一的内容。</p>
    </TabPane>
    <TabPane label="2">
      <template #label>
        标签二
      </template>
      <p>标签页二的内容。</p>
    </TabPane>
    <TabPane label="3">
      <template #label>
        标签三
      </template>
      <p>标签页三的内容。</p>
    </TabPane>
  </Tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref('标签页1')

    return { active }
  }
})
</script>
