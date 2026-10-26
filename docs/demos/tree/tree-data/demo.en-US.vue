<template>
  <Tree :data="data" no-build-tree></Tree>
</template>

<script setup lang="ts">
const data = [
  {
    label: 'Animal',
    expanded: true,
    children: [
      {
        label: 'Invertebrate',
        children: [{ label: 'Earthworm' }, { label: 'Jellyfish' }],
      },
      {
        label: 'Vertebrate',
        children: [
          {
            label: 'Bird',
            children: [{ label: 'Magpie' }, { label: 'Kestrel' }],
          },
          {
            label: 'Mammal',
            children: [{ label: 'Pangolin' }],
          },
        ],
      },
    ],
  },
]
</script>
