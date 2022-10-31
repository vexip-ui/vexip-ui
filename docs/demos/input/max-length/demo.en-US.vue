<template>
  <Input value="A" :max-length="5" clearable></Input>
  <br />
  <br />
  <Input value="Almost" :max-length="10">
    <template #count="{ value }">
      <span :style="{ color: value.length > 5 ? 'var(--vxp-color-warning-base)' : undefined }">
        {{ `${value.length}/10` }}
      </span>
    </template>
  </Input>
</template>

<style scoped>
.vxp-input {
  max-width: 300px;
}
</style>
