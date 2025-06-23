<template>
  <Tree :data="data" @node-contextmenu="handleNodeContextmenu"></Tree>
</template>

<script setup lang="ts">
import { Contextmenu } from 'vexip-ui'

interface Data {
  id: number,
  label: string,
  parent: number,
  expanded?: boolean
}

const data: Data[] = [
  {
    id: 1,
    label: '动物',
    parent: 0,
    expanded: true,
  },
  {
    id: 2,
    label: '鸟类',
    parent: 5,
  },
  {
    id: 3,
    label: '无脊椎动物',
    parent: 1,
  },
  {
    id: 4,
    label: '哺乳动物',
    parent: 5,
  },
  {
    id: 5,
    label: '脊椎动物',
    parent: 1,
  },
  {
    id: 6,
    label: '喜鹊',
    parent: 2,
  },
  {
    id: 7,
    label: '蚯蚓',
    parent: 3,
  },
  {
    id: 8,
    label: '水母',
    parent: 3,
  },
  {
    id: 9,
    label: '穿山甲',
    parent: 4,
  },
  {
    id: 10,
    label: '红隼',
    parent: 2,
  },
]

async function handleNodeContextmenu(event: MouseEvent, data: Data) {
  event.preventDefault()

  const selectedKeys = await Contextmenu.open({
    clientX: event.clientX,
    clientY: event.clientY,
    appear: true,
    configs: [
      { key: '1', label: `${data.label} 1` },
      { key: '2', label: `${data.label} 2` },
      { key: '3', label: `${data.label} 3` },
    ],
  })

  console.info(selectedKeys)
}
</script>
