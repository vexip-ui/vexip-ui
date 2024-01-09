<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import IconLoadingSvg from './icon-loading-svg.vue'

const { locale } = useI18n({ useScope: 'global' })

const icons = {
  loading: IconLoadingSvg
}
</script>

<template>
  <div class="icon-demo">
    <Icon :scale="2">
      <IconLoadingSvg></IconLoadingSvg>
    </Icon>
    <ConfigProvider :icons="icons" :locale="{ locale: locale as string }">
      <Space vertical>
        <Button type="primary" loading>
          Loading
        </Button>
        <Input loading style="max-width: 300px"></Input>
      </Space>
    </ConfigProvider>
  </div>
</template>
