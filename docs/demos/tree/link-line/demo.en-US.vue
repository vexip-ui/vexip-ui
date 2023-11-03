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
  {
    id: 1,
    label: 'Animal',
    parent: 0,
    expanded: true
  },
  {
    id: 2,
    label: 'Bird',
    parent: 5
  },
  {
    id: 3,
    label: 'Invertebrate',
    parent: 1
  },
  {
    id: 4,
    label: 'Mammal',
    parent: 5
  },
  {
    id: 5,
    label: 'Vertebrate',
    parent: 1
  },
  {
    id: 6,
    label: 'Magpie',
    parent: 2
  },
  {
    id: 7,
    label: 'Earthworm',
    parent: 3
  },
  {
    id: 8,
    label: 'Jellyfish',
    parent: 3
  },
  {
    id: 9,
    label: 'Pangolin',
    parent: 5
  },
  {
    id: 10,
    label: 'Kestrel',
    parent: 2
  }
]

for (const item of data) {
  item.expanded = true
}
</script>
