<template>
  <RadioGroup
    v-model:value="linkLine"
    :options="options"
    button
    style="margin-bottom: 10px"
  ></RadioGroup>
  <Tree :data="data" :link-line="linkLine"></Tree>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TreeLinkLine } from 'vexip-ui'

const linkLine = ref<TreeLinkLine>('dashed')
const options: TreeLinkLine[] = ['none', 'dashed', 'solid', 'dotted']

const data = [
  { id: 1, label: 'Node 1', parent: 0, expanded: true },
  { id: 2, label: 'Node 2', parent: 1 },
  { id: 3, label: 'Node 3', parent: 1 },
  { id: 4, label: 'Node 4', parent: 1 },
  { id: 5, label: 'Node 5', parent: 4 },
  { id: 6, label: 'Node 6', parent: 5 },
  { id: 7, label: 'Node 7', parent: 6 },
  { id: 14, label: 'Node 14', parent: 7 },
  { id: 8, label: 'Node 8', parent: 7 },
  { id: 9, label: 'Node 9', parent: 8 },
  { id: 10, label: 'Node 10', parent: 5 },
  { id: 11, label: 'Node 11', parent: 8 },
  { id: 12, label: 'Node 12', parent: 5 },
  { id: 13, label: 'Node 13', parent: 7 },
  { id: 15, label: 'Node 15', parent: 4 },
]

for (const item of data) {
  item.expanded = true
}
</script>
