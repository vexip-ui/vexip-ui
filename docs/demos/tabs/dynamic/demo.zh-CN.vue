<template>
  <Tabs
    v-model:active="active"
    card
    show-add
    @add="addTab"
    @close="removeTab"
  >
    <TabPanel
      v-for="(tab, index) in tabs"
      :key="index"
      :label="tab.label"
      :name="tab.name"
      :closable="!tab.static"
    >
      <span>
        {{ tab.content }}
      </span>
    </TabPanel>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let labelCount = 4

const active = ref(1)
const tabs = ref([
  { label: 1, name: '标签 1', content: '标签页 1 的内容。', static: true },
  { label: 2, name: '标签 2', content: '标签页 2 的内容。' },
  { label: 3, name: '标签 3', content: '标签页 3 的内容。' }
])

function addTab() {
  tabs.value.push({
    label: labelCount,
    name: `标签 ${labelCount}`,
    content: `标签页 ${labelCount++} 的内容。`
  })
}

function removeTab(label: number) {
  const index = tabs.value.findIndex(tab => tab.label === label)

  if (index > -1) {
    if (active.value === label) {
      active.value = tabs.value[index ? index - 1 : index + 1].label
    }

    tabs.value.splice(index, 1)
  }
}
</script>

<style scoped>
.vxp-tabs {
  max-width: 1000px;
}
</style>
