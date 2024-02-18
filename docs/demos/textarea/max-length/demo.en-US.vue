<template>
  <Space vertical>
    <Textarea :max-length="10"></Textarea>
    <Textarea value="Count Only" :max-length="Infinity"></Textarea>
    <Textarea value="Almost" :max-length="10">
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
