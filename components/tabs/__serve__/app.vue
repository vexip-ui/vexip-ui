<template>
  <div style="width: 500px;">
    <Tabs v-model:active="active">
      <TabPane label="标签页1">
        <p>标签页一的内容。</p>
      </TabPane>
      <TabPane label="标签页2">
        <p>标签页二的内容。</p>
      </TabPane>
      <TabPane label="标签页3">
        <p>标签页三的内容。</p>
      </TabPane>
    </Tabs>
    <p>
      Current Tab:
      <br />
      {{ active }}
    </p>
    <Tabs card>
      <TabPane label="标签页1">
        <p>标签页一的内容。</p>
      </TabPane>
      <TabPane label="标签页2">
        <p>标签页二的内容。</p>
      </TabPane>
      <TabPane label="标签页3">
        <p>标签页三的内容。</p>
      </TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tabs from '../tabs.vue'
import TabPane from '../tab-pane.vue'

export default defineComponent({
  name: 'App',
  components: {
    Tabs,
    TabPane
  },
  data() {
    return {
      active: '标签页1'
    }
  }
})
</script>

<style lang="scss"></style>
