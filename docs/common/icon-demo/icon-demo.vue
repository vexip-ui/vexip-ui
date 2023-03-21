<template>
  <Icon :scale="2">
    <IconLoading></IconLoading>
  </Icon>
  <ConfigProvider :icons="icons" :locale="{ locale: language }">
    <Space vertical>
      <Button type="primary" loading>
        Loading
      </Button>
      <Input loading style="max-width: 300px"></Input>
    </Space>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconLoading from './icon-loading.vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n({ useScope: 'global' })
const language = computed(() => i18n.locale.value as string)

const icons = {
  loading: IconLoading
}
</script>
