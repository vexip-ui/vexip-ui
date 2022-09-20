<template>
  <div>
    <Alert closable>
      Some content to alert
    </Alert>
    <Alert type="success" closable>
      <template #title>
        Alert Title
      </template>
      Some content to alert
    </Alert>
  </div>
</template>

<style scoped>
.vxp-alert {
  max-width: 600px;
}
</style>
