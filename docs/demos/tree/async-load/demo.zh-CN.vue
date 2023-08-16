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
  loaded?: boolean
}

const nodeData = reactive<NodeData[]>([
  {
    id: 1,
    label: '动物',
    parent: 0,
    expanded: true
  },
  {
    id: 3,
    label: '无脊椎动物',
    parent: 1
  },
  {
    id: 5,
    label: '脊椎动物',
    parent: 1
  }
])

function loadData(data: NodeData) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      if (data.id === 3) {
        nodeData.push(
          {
            id: 7,
            label: '蚯蚓',
            parent: 3,
            loaded: true
          },
          {
            id: 8,
            label: '水母',
            parent: 3,
            loaded: true
          }
        )
      } else if (data.id === 5) {
        nodeData.push(
          {
            id: 2,
            label: '鸟类',
            parent: 5
          },
          {
            id: 4,
            label: '哺乳动物',
            parent: 5,
            loaded: true
          }
        )
      } else if (data.id === 2) {
        nodeData.push(
          {
            id: 6,
            label: '喜鹊',
            parent: 2,
            loaded: true
          },
          {
            id: 10,
            label: '红隼',
            parent: 2,
            loaded: true
          }
        )
      } else if (data.id === 4) {
        nodeData.push({
          id: 9,
          label: '穿山甲',
          parent: 4,
          loaded: true
        })
      }

      resolve()
    }, 1000)
  })
}
</script>
