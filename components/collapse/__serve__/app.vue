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
import { defineComponent } from 'vue'
import Collapse from '../collapse.vue'
import CollapsePane from '../collapse-pane.vue'

export default defineComponent({
  name: 'App',
  components: {
    Collapse,
    CollapsePane
  },
  data() {
    return {
      expanded: 0
    }
  }
})
</script>

<style lang="scss"></style>
