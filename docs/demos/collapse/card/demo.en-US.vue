<template>
  <Collapse v-model:expanded="expanded" card>
    <CollapsePane title="Panel 1">
      <p>Some content to fill</p>
      <p>Some content to fill</p>
    </CollapsePane>
    <CollapsePane title="Panel 2">
      <p>Some content to fill</p>
      <p>Some content to fill</p>
    </CollapsePane>
    <CollapsePane title="Panel 3">
      <p>Some content to fill</p>
      <p>Some content to fill</p>
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
