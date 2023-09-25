<template>
  <Collapse v-model:expanded="expanded" ghost>
    <CollapsePanel title="面板一">
      <p>一些内容一些内容一些内容</p>
      <p>一些内容一些内容一些内容</p>
    </CollapsePanel>
    <CollapsePanel title="面板二">
      <p>一些内容一些内容一些内容</p>
      <p>一些内容一些内容一些内容</p>
    </CollapsePanel>
    <CollapsePanel title="面板三">
      <p>一些内容一些内容一些内容</p>
      <p>一些内容一些内容一些内容</p>
    </CollapsePanel>
  </Collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(1)
</script>

<style scoped>
.vxp-collapse {
  max-width: 500px;
}
</style>
