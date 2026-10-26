<template>
  <div>
    <Alert title="警告标题">
      警告提示的内容
    </Alert>
    <Alert type="info" title="警告标题">
      警告提示的内容
    </Alert>
    <Alert type="success" title="警告标题">
      警告提示的内容
    </Alert>
    <Alert type="warning">
      <template #title>
        警告标题
      </template>
      警告提示的内容
    </Alert>
    <Alert type="error">
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
