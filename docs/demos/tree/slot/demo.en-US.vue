<template>
  <Tree :data="mockData">
    <template #node="{ data, node, depth, toggleExpand }">
      <span
        :style="{
          paddingLeft: `${depth * 20}px`,
          color: node.expanded ? '#fa5252' : '#228be6',
          cursor: 'pointer'
        }"
        @click="node.children.length && toggleExpand()"
      >
        {{ data.label }}
      </span>
    </template>
  </Tree>
</template>

<script setup lang="ts">
const mockData = [
  {
    id: 1,
    label: 'Animal',
    parent: 0,
    expanded: true
  },
  {
    id: 2,
    label: 'Bird',
    parent: 5
  },
  {
    id: 3,
    label: 'Invertebrate',
    parent: 1
  },
  {
    id: 4,
    label: 'Mammal',
    parent: 5
  },
  {
    id: 5,
    label: 'Vertebrate',
    parent: 1
  },
  {
    id: 6,
    label: 'Magpie',
    parent: 2
  },
  {
    id: 7,
    label: 'Earthworm',
    parent: 3
  },
  {
    id: 8,
    label: 'Jellyfish',
    parent: 3
  },
  {
    id: 9,
    label: 'Pangolin',
    parent: 5
  },
  {
    id: 10,
    label: 'Kestrel',
    parent: 2
  }
]
</script>
