<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  i18n: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  }
})

const { t } = useI18n()
</script>

<template>
  <Alert
    class="docs-alert"
    v-bind="$attrs"
    :type="type === 'info' ? 'primary' : type"
    :title="title ? (i18n ? t(title) : title) : undefined"
  >
    <slot></slot>
  </Alert>
</template>
