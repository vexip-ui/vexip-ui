<template>
  <Tree :data="data" no-build-tree></Tree>
</template>

<script setup lang="ts">
const data = [
  {
    label: '动物',
    expanded: true,
    children: [
      {
        label: '无脊椎动物',
        children: [{ label: '蚯蚓' }, { label: '水母' }]
      },
      {
        label: '脊椎动物',
        children: [
          {
            label: '鸟类',
            children: [{ label: '喜鹊' }, { label: '红隼' }]
          },
          {
            label: '哺乳动物',
            children: [{ label: '穿山甲' }]
          }
        ]
      }
    ]
  }
]
</script>
