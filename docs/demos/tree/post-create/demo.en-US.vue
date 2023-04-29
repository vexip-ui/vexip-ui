<template>
  <Tree checkbox :data="data" :post-create="postCreate"></Tree>
</template>

<script setup lang="ts">
import type { TreeNodeProps } from 'vexip-ui'

const checkedIds = new Set([4, 6])
const data = [
  {
    id: 1,
    label: '动物',
    parent: 0,
    expanded: true
  },
  {
    id: 2,
    label: '鸟类',
    parent: 5
  },
  {
    id: 3,
    label: '无脊椎动物',
    parent: 1
  },
  {
    id: 4,
    label: '哺乳动物',
    parent: 5
  },
  {
    id: 5,
    label: '脊椎动物',
    parent: 1,
    expanded: true
  },
  {
    id: 6,
    label: '喜鹊',
    parent: 2
  },
  {
    id: 7,
    label: '蚯蚓',
    parent: 3
  }
]

function postCreate(node: TreeNodeProps) {
  node.checked = checkedIds.has(node.id as number)
}
</script>
