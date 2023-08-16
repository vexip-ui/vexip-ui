<template>
  <Tree :data="data" checkbox></Tree>
</template>

<script setup lang="ts">
const data = [
  {
    id: 1,
    label: 'Animal',
    parent: 0,
    expanded: true
  },
  {
    id: 2,
    label: 'Bird',
    parent: 5,
    expanded: true,
    expandDisabled: true
  },
  {
    id: 3,
    label: 'Invertebrate',
    parent: 1,
    expanded: true,
    disabled: true
  },
  {
    id: 4,
    label: 'Mammal',
    parent: 5,
    checkDisabled: true
  },
  {
    id: 5,
    label: 'Vertebrate',
    parent: 1,
    expanded: true,
    checkDisabled: true
  },
  {
    id: 6,
    label: 'Magpie',
    parent: 2,
    selectDisabled: true
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
