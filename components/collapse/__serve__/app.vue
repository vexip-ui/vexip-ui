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
  <br />
  <Collapse card>
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
import { Collapse } from '..'
import { CollapsePane } from '@/components/collapse-pane'

const expanded = ref(0)
</script>

<style lang="scss">
.vxp-collapse {
  width: 500px;
}
</style>
