<template>
  <div>
    <Alert closable>
      警告提示的内容
      <template #close>
        点击关闭
      </template>
    </Alert>
    <Alert type="warning" closable>
      警告提示的内容
      <template #close>
        我知道了
      </template>
    </Alert>
  </div>
</template>

<style scoped>
.vxp-alert {
  max-width: 600px;
}
</style>
