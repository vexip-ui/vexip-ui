<template>
  <div>
    <Alert closable>
      Some content to alert
      <template #close>
        Click to close
      </template>
    </Alert>
    <Alert type="warning" closable>
      Some content to alert
      <template #close>
        I got it
      </template>
    </Alert>
  </div>
</template>

<style scoped>
.vxp-alert {
  max-width: 600px;
}
</style>
