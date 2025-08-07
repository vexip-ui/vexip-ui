<template>
  <Tree :data="data" @node-contextmenu="handleNodeContextmenu"></Tree>
</template>

<script setup lang="ts">
import { Contextmenu } from 'vexip-ui'

interface Data {
  id: number,
  label: string,
  parent: number,
  expanded?: boolean,
}

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
