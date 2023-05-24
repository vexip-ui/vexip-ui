<script setup lang="ts">
import IconLoading from './icon-loading.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

const icons = {
  loading: IconLoading
}
</script>

<template>
  <Icon :scale="2">
    <IconLoading></IconLoading>
  </Icon>
  <ConfigProvider :icons="icons" :locale="{ locale: locale as string }">
    <Space vertical>
      <Button type="primary" loading>
        Loading
      </Button>
      <Input loading style="max-width: 300px"></Input>
    </Space>
  </ConfigProvider>
</template>
