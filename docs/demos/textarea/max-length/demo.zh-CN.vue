<template>
  <Textarea :max-length="10"></Textarea>
  <br />
  <br />
  <Textarea value="快要放不下了" :max-length="10">
    <template #count="{ value }">
      <span :style="{ color: value.length > 5 ? 'var(--vxp-color-warning-base)' : undefined }">
        {{ `${value.length}/10` }}
      </span>
    </template>
  </Textarea>
</template>

<style scoped>
.vxp-textarea {
  max-width: 300px;
}
</style>
