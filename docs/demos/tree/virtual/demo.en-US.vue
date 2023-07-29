<template>
  <Tree
    :data="data"
    no-build-tree
    virtual
    style="height: 300px; border: 1px solid red"
  ></Tree>
</template>

<script setup lang="ts">
interface Node {
  label: string,
  children: Node[]
}

const data = mockTreeData()

function mockTreeData(maxDepth = 3): Node[] {
  if (maxDepth <= 0) return []

  return Array.from({ length: Math.round(20 / maxDepth) }, (_, index) => {
    return {
      label: `Node ${maxDepth}-${index + 1}`,
      expanded: maxDepth > 1,
      children: mockTreeData(maxDepth - 1)
    }
  })
}
</script>
