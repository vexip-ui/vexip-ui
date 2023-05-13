<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useI18n } from 'vue-i18n'
import { PenToSquareR } from '@vexip-ui/icons'
import { format } from '@vexip-ui/utils'

import Contributors from './contributors.vue'
import PageLinks from './page-links.vue'

import type { ThemeConfig } from '../types'

const { theme, page, frontmatter } = useData<ThemeConfig>()
const { t } = useI18n()

const editLink = computed(() => {
  const { i18n = 'common.editPage', pattern = '' } = theme.value.editLink || {}
  const path = page.value.relativePath

  return {
    i18n,
    link: typeof pattern === 'function' ? pattern(path) : pattern.replace(/:path/g, path)
  }
})
const hasEditLink = computed(() => {
  return !!editLink.value.link && frontmatter.value.editLink !== false
})

const lastUpdated = computed(() => {
  const { lastUpdated = '' } = page.value || {}

  return format(lastUpdated)
})
</script>

<template>
  <div class="page-footer">
    <Contributors></Contributors>
    <div class="page-footer__edit-info">
      <Linker
        v-if="hasEditLink"
        class="edit-link"
        type="primary"
        :to="editLink.link"
        :icon="PenToSquareR"
      >
        {{ t(editLink.i18n) }}
      </Linker>
      <span role="none" style="flex: auto"></span>
      <div v-if="lastUpdated" class="last-updated">
        {{ t('common.lastUpdated') }}: {{ lastUpdated }}
      </div>
    </div>
    <Divider style="--vxp-divider-v-margin: 6px"></Divider>
    <PageLinks></PageLinks>
  </div>
</template>

<style lang="scss">
.page-footer {
  &__edit-info {
    display: flex;
    align-items: center;
    height: 72px;
    padding: 16px 0;
    margin-top: 20px;
  }

  .vxp-linker {
    height: 100%;
  }
}
</style>
