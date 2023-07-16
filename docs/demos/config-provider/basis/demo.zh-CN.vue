<template>
  <ConfigProvider :props="provideProps" :locale="locale">
    <Tag type="primary">
      标签
    </Tag>
    <Tag type="warning" size="small">
      标签
    </Tag>
    <br />
    <br />
    <Input style="max-width: 400px"></Input>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const provideProps = ref({
  tag: {
    size: 'large',
    simple: true,
    closable: true
  }
})

const locale = ref({
  input: {
    placeholder: '随便输入点什么'
  }
})
</script>
