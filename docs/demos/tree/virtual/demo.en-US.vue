<template>
  <p>
    <Button type="success" @click="toggleAllExpanded(true)">
      Expand All
    </Button>
    <Button type="warning" @click="toggleAllExpanded(false)">
      Collapse All
    </Button>
  </p>
  <Input v-model:value="filter" clearable></Input>
  <p>
    Link line:
    <Switch v-model:value="linkLine"></Switch>
  </p>
  <p>
    Transition:
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
  children: Node[],
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
      label: `Node ${maxDepth}-${index + 1}`,
      expanded: maxDepth > 2,
      children: mockTreeData(maxDepth - 1),
    }
  })
}

function toggleAllExpanded(expanded: boolean) {
  tree.value?.toggleAllExpanded(expanded)
}
</script>
