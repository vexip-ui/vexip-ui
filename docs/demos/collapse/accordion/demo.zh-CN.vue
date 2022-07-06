<template>
  <Collapse v-model:expanded="expanded" accordion>
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

<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(0)
</script>

<style scoped>
.vxp-collapse {
  max-width: 500px;
}
</style>
