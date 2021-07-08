<template>
  <Alert icon>
    警告提示的内容
  </Alert>
  <Alert icon type="success">
    警告提示的内容
  </Alert>
  <Alert icon type="warning">
    警告提示的内容
  </Alert>
  <Alert icon type="error">
    警告提示的内容
  </Alert>
  <Alert icon title="警告标题">
    警告提示的内容
  </Alert>
  <Alert icon type="success" title="警告标题">
    警告提示的内容
  </Alert>
  <Alert icon type="warning" title="警告标题">
    警告提示的内容
  </Alert>
  <Alert icon type="error" title="警告标题">
    警告提示的内容
  </Alert>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Alert } from '..'

export default defineComponent({
  name: 'App',
  components: {
    Alert
  }
})
</script>
