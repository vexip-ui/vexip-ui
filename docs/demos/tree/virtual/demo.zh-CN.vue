<template>
  <p>
    <Button type="success" @click="toggleAllExpanded(true)">
      展开全部
    </Button>
    <Button type="warning" @click="toggleAllExpanded(false)">
      收起全部
    </Button>
  </p>
  <Input v-model:value="filter" clearable></Input>
  <p>
    连接线：
    <Switch v-model:value="linkLine"></Switch>
  </p>
  <p>
    过渡效果：
    <Switch v-model:value="transition"></Switch>
  </p>
  <Tree
    ref="tree"
    :data="data"
    no-build-tree
    virtual
    use-y-bar
    :filter="filter"
    :link-line="linkLine && 'dashed'"
    :no-transition="!transition"
    style="height: 300px"
  ></Tree>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TreeExposed } from 'vexip-ui'

interface Node {
  label: string,
  children: Node[]
}

const tree = ref<TreeExposed>()

const filter = ref('')
const linkLine = ref(false)
const transition = ref(true)

const data = mockTreeData()

function mockTreeData(maxDepth = 3): Node[] {
  if (maxDepth <= 0) return []

  return Array.from({ length: Math.round(20 / maxDepth) }, (_, index) => {
    return {
      label: `节点 ${maxDepth}-${index + 1}`,
      expanded: maxDepth > 2,
      children: mockTreeData(maxDepth - 1)
    }
  })
}

function toggleAllExpanded(expanded: boolean) {
  tree.value?.toggleAllExpanded(expanded)
}
</script>

<style scoped>
.vxp-input {
  max-width: 400px;
}
</style>
