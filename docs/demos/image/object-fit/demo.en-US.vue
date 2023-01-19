<template>
  <Space>
    <span v-for="fit in objectFits" :key="fit">
      <p style="text-align: center;">
        {{ fit }}
      </p>
      <Image
        src="/picture-1.jpg"
        width="100"
        height="100"
        :fit="fit"
        style="background-color: var(--vxp-fill-color-hover);"
      ></Image>
    </span>
  </Space>
</template>

<script setup lang="ts">
const objectFits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
</script>
