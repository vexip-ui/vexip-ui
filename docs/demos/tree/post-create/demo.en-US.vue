<template>
  <Tree checkbox :data="data" :post-create="postCreate"></Tree>
</template>

<script setup lang="ts">
import type { TreeNodeProps } from 'vexip-ui'

const checkedIds = new Set([4, 6])
const data = [
  {
    id: 1,
    label: 'Animal',
    parent: 0,
    expanded: true,
  },
  {
    id: 2,
    label: 'Bird',
    parent: 5,
  },
  {
    id: 3,
    label: 'Invertebrate',
    parent: 1,
  },
  {
    id: 4,
    label: 'Mammal',
    parent: 5,
  },
  {
    id: 5,
    label: 'Vertebrate',
    parent: 1,
    expanded: true,
  },
  {
    id: 6,
    label: 'Magpie',
    parent: 2,
  },
  {
    id: 7,
    label: 'Earthworm',
    parent: 3,
  },
  {
    id: 8,
    label: 'Jellyfish',
    parent: 3,
  },
  {
    id: 9,
    label: 'Pangolin',
    parent: 5,
  },
  {
    id: 10,
    label: 'Kestrel',
    parent: 2,
  },
]

function postCreate(node: TreeNodeProps) {
  node.checked = checkedIds.has(node.id as number)
}
</script>
