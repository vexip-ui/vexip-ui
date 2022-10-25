<template>
  <TabNav v-model:active="active">
    <TabNavItem v-for="(tab, index) in tabs" :key="index" :label="tab.label">
      {{ tab.name }}
      <Icon v-if="!tab.static" class="close-btn" @click.stop="removeTab(tab.label)">
        <Xmark></Xmark>
      </Icon>
    </TabNavItem>
    <template #suffix>
      <Button size="small" :icon="Plus" @click="addTab"></Button>
    </template>
  </TabNav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Xmark, Plus } from '@vexip-ui/icons'

let labelCount = 4

const active = ref(1)
const tabs = ref([
  { label: 1, name: '标签页1', static: true },
  { label: 2, name: '标签页2' },
  { label: 3, name: '标签页3' }
])

function addTab() {
  tabs.value.push({ label: labelCount, name: `标签页${labelCount++}` })
}

function removeTab(label: number) {
  const index = tabs.value.findIndex(tab => tab.label === label)

  if (index > -1) {
    if (active.value === label) {
      active.value = index ? index - 1 : index + 1
    }

    tabs.value.splice(index, 1)
  }
}
</script>

<style scoped>
.close-btn {
  position: relative;
  left: 6px;
  margin-left: 3px;
}
</style>
