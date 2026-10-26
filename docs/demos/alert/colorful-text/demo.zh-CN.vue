<template>
  <div>
    <Alert colorful-text>
      警告提示的内容
    </Alert>
    <Alert type="info" icon colorful-text>
      警告提示的内容
    </Alert>
    <Alert type="success" title="警告标题" colorful-text>
      警告提示的内容
    </Alert>
    <Alert type="warning" icon colorful-text>
      警告提示的内容
    </Alert>
    <Alert
      type="error"
      title="警告标题"
      icon
      colorful-text
    >
      警告提示的内容
    </Alert>
  </div>
</template>

<style scoped>
.vxp-alert {
  max-width: 600px;
}
</style>
