<template>
  <ButtonGroup type="primary">
    <Button @click="select">
      选择节点
    </Button>
    <Button @click="expand">
      展开节点
    </Button>
    <Button @click="check">
      勾选节点
    </Button>
  </ButtonGroup>
  <Tree ref="tree" checkbox :data="data"></Tree>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { Tree } from 'vexip-ui'

const tree = ref<InstanceType<typeof Tree>>()
const data = ref([
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
    parent: 1
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
])

function select() {
  tree.value?.selectNodeByData(data.value[1])
}

function expand() {
  tree.value?.expandNodeByData(data.value[1], undefined, true)
}

function check() {
  tree.value?.checkNodeByData(data.value[1])
}
</script>
