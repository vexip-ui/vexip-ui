<template>
  <Tree :data="nodeData" floor-select :on-async-load="loadData"></Tree>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface NodeData {
  id: number,
  label: string,
  parent: number,
  expanded?: boolean,
  isLeaf?: boolean,
  loaded?: boolean,
}

const nodeData = reactive<NodeData[]>([
  {
    id: 1,
    label: 'Animal',
    parent: 0,
    expanded: true,
  },
  {
    id: 3,
    label: 'Invertebrate',
    parent: 1,
  },
  {
    id: 5,
    label: 'Vertebrate',
    parent: 1,
  },
])

function loadData(data: NodeData) {
  return new Promise<boolean>(resolve => {
    setTimeout(() => {
      if (data.id === 3) {
        nodeData.push(
          {
            id: 7,
            label: 'Earthworm',
            parent: 3,
            isLeaf: true,
          },
          {
            id: 8,
            label: 'Jellyfish',
            parent: 3,
            loaded: true,
          },
        )
      } else if (data.id === 5) {
        nodeData.push(
          {
            id: 2,
            label: 'Bird',
            parent: 5,
          },
          {
            id: 4,
            label: 'Mammal',
            parent: 5,
          },
        )
      } else if (data.id === 2) {
        nodeData.push(
          {
            id: 6,
            label: 'Magpie',
            parent: 2,
            isLeaf: true,
          },
          {
            id: 10,
            label: 'Kestrel',
            parent: 2,
            loaded: true,
          },
        )
      } else if (data.id === 4) {
        // nodeData.push({
        //   id: 9,
        //   label: 'Pangolin',
        //   parent: 4,
        //   loaded: true
        // })
        resolve(false)
        return
      }

      resolve(true)
    }, 1000)
  })
}
</script>

<style scoped>
:deep(.vxp-tree__node--load-fail) {
  color: var(--vxp-color-error-base);
}
</style>
