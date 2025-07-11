<template>
  <Space vertical>
    <Input value="A" :max-length="5" clearable></Input>
    <Input
      value="Hide Count"
      :max-length="10"
      hide-count
      clearable
    ></Input>
    <Input value="Count Only" :max-length="Infinity" clearable></Input>
    <Input value="Almost" :max-length="10">
      <template #count="{ value }">
        <span :style="{ color: value.length > 5 ? 'var(--vxp-color-warning-base)' : undefined }">
          {{ `${value.length}/10` }}
        </span>
      </template>
    </Input>
  </Space>
</template>

<style scoped>
.vxp-input {
  max-width: 300px;
}
</style>
