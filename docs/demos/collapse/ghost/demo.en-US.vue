<template>
  <Collapse v-model:expanded="expanded" ghost>
    <CollapsePane title="面板一">
      <p>Some content to fill</p>
      <p>Some content to fill</p>
    </CollapsePane>
    <CollapsePane title="面板二">
      <p>Some content to fill</p>
      <p>Some content to fill</p>
    </CollapsePane>
    <CollapsePane title="面板三">
      <p>Some content to fill</p>
      <p>Some content to fill</p>
    </CollapsePane>
  </Collapse>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const expanded = ref(0)

    return { expanded }
  }
})
</script>
