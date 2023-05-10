<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useI18n } from 'vue-i18n'
import { PenToSquareR } from '@vexip-ui/icons'

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
</script>

<template>
  <div v-if="hasEditLink" class="edit-link">
    <Linker type="primary" :to="editLink.link" :icon="PenToSquareR">
      {{ t(editLink.i18n) }}
    </Linker>
  </div>
</template>

<style lang="scss">
.edit-link {
  display: flex;
  align-items: center;
  height: 72px;
  padding: 16px 0;

  .vxp-linker {
    height: 100%;
  }
}
</style>
