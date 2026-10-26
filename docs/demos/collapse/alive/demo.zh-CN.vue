<template>
  <p style="display: flex; align-items: center">
    <span style="margin-right: 10px">alive:</span>
    <RadioGroup v-model:value="alive">
      <Radio v-for="aliveType in aliveTypes" :key="aliveType" :label="aliveType">
        {{ aliveType }}
      </Radio>
    </RadioGroup>
  </p>
  <br />
  <Collapse v-model:expanded="expanded" :alive="alive">
    <CollapsePanel title="面板一">
      <p>一些内容一些内容一些内容</p>
      <p>一些内容一些内容一些内容</p>
    </CollapsePanel>
    <CollapsePanel title="面板二">
      <p>一些内容一些内容一些内容</p>
      <p>一些内容一些内容一些内容</p>
    </CollapsePanel>
    <CollapsePanel title="面板三" :alive="true">
      <p>一些内容一些内容一些内容</p>
      <p>一些内容一些内容一些内容</p>
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
