<template>
  <Tabs v-model:active="active" card>
    <TabPane label="标签页1">
      <p>标签页一的内容。</p>
    </TabPane>
    <TabPane label="标签页2">
      <p>标签页二的内容。</p>
    </TabPane>
    <TabPane label="标签页3">
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
