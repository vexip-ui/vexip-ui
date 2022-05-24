<template>
  <Collapse v-model:expanded="expanded">
    <CollapsePane title="面板一">
      <p>一些内容一些内容一些内容</p>
      <p>一些内容一些内容一些内容</p>
    </CollapsePane>
    <CollapsePane title="面板二">
      <p>一些内容一些内容一些内容</p>
      <p>一些内容一些内容一些内容</p>
    </CollapsePane>
    <CollapsePane title="面板三">
      <p>一些内容一些内容一些内容</p>
      <p>一些内容一些内容一些内容</p>
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
