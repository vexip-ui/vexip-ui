<template>
  <Space vertical>
    <Textarea :max-length="10"></Textarea>
    <Textarea value="隐藏计数" :max-length="5" hide-count></Textarea>
    <Textarea value="只计数" :max-length="Infinity"></Textarea>
    <Textarea value="快要放不下了" :max-length="10">
      <template #count="{ value }">
        <span :style="{ color: value.length > 5 ? 'var(--vxp-color-warning-base)' : undefined }">
          {{ `${value.length}/10` }}
        </span>
      </template>
    </Textarea>
  </Space>
</template>

<style scoped>
.vxp-textarea {
  max-width: 300px;
}
</style>
