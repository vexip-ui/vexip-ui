<template>
  <Input v-model:value="filter" clearable></Input>
  <p>
    仅过滤叶子节点：
    <Switch v-model:value="filterLeaf"></Switch>
  </p>
  <Button style="margin-bottom: 10px" @click="getData">
    获取数据
  </Button>
  <Tree
    ref="tree"
    :data="data"
    :filter="filter"
    :filter-leaf="filterLeaf"
  ></Tree>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TreeExposed } from 'vexip-ui'

const tree = ref<TreeExposed>()

const filter = ref('')
const filterLeaf = ref(false)
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
  },
  {
    id: 8,
    label: '水母',
    parent: 3
  },
  {
    id: 9,
    label: '穿山甲',
    parent: 4
  },
  {
    id: 10,
    label: '红隼',
    parent: 2
  }
]

function getData() {
  console.info(tree.value?.getTreeData(true))
}
</script>

<style scoped>
.vxp-input {
  max-width: 400px;
}
</style>
