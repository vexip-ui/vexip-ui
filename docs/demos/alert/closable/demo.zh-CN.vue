<template>
  <div>
    <Alert closable>
      警告提示的内容
    </Alert>
    <Alert type="success" closable>
      <template #title>
        警告标题
      </template>
      警告提示的内容
    </Alert>
  </div>
</template>

<style scoped>
.vxp-alert {
  max-width: 600px;
}
</style>
