<template>
  <p style="display: flex; align-items: center">
    <span style="margin-right: 10px">alive:</span>
    <RadioGroup v-model:value="alive">
      <Radio :label="false">
        false
      </Radio>
      <Radio :label="true">
        true
      </Radio>
      <Radio label="always">
        always
      </Radio>
      <Radio label="after-loading">
        after-loading
      </Radio>
    </RadioGroup>
  </p>
  <Collapse v-model:expanded="expanded" :alive="alive">
    <CollapsePanel title="Panel 1">
      <Input></Input>
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

const expanded = ref(1)
const alive = ref(false)
</script>

<style scoped>
.vxp-collapse {
  max-width: 500px;
}
</style>
