<template>
  <p style="display: flex; align-items: center">
    <span style="margin-right: 10px">alive:</span>
    <RadioGroup v-model:value="alive">
      <Radio v-for="aliveType in aliveTypes" :key="aliveType" :label="aliveType">
        {{ aliveType }}
      </Radio>
    </RadioGroup>
  </p>
  <Collapse v-model:expanded="expanded" :alive="alive">
    <CollapsePanel title="Panel 1">
      <p>Some content to fill</p>
      <p>Some content to fill</p>
    </CollapsePanel>
    <CollapsePanel title="Panel 2">
      <p>Some content to fill</p>
      <p>Some content to fill</p>
    </CollapsePanel>
    <CollapsePanel title="Panel 3" :alive="true">
      <p>Some content to fill</p>
      <p>Some content to fill</p>
    </CollapsePanel>
  </Collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { CollapseAliveType } from 'vexip-ui'

const aliveTypes: CollapseAliveType[] = ['always', 'mounted', 'never']

const expanded = ref(1)
const alive = ref<CollapseAliveType>('mounted')
</script>

<style scoped>
.vxp-collapse {
  max-width: 500px;
}
</style>
