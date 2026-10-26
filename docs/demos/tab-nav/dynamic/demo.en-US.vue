<template>
  <TabNav
    v-model:active="active"
    card
    show-add
    @add="addTab"
    @close="removeTab"
  >
    <TabNavItem
      v-for="(tab, index) in tabs"
      :key="index"
      :label="tab.label"
      :closable="!tab.static"
    >
      {{ tab.name }}
    </TabNavItem>
  </TabNav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let labelCount = 4

const active = ref(1)
const tabs = ref([
  { label: 1, name: 'Tab 1', static: true },
  { label: 2, name: 'Tab 2' },
  { label: 3, name: 'Tab 3' },
])

function addTab() {
  tabs.value.push({ label: labelCount, name: `Tab ${labelCount++}` })
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
