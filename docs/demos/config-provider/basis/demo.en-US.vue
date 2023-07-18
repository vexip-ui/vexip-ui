<template>
  <ConfigProvider :props="provideProps" :locale="locale">
    <Tag type="primary">
      Tag
    </Tag>
    <Tag type="warning" size="small">
      Tag
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
    placeholder: 'Input something...'
  }
})
</script>
