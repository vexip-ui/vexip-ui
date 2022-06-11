<template>
  <div>
    <Alert closable>
      Some content to alert
      <template #close>
        点击关闭
      </template>
    </Alert>
    <Alert type="warning" closable>
      Some content to alert
      <template #close>
        我知道了
      </template>
    </Alert>
  </div>
</template>
