<script setup lang="ts">
import { computed, nextTick, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRoute, useRouter } from 'vitepress'
import { MagnifyingGlass } from '@vexip-ui/icons'
import { getComponentConfig } from '../../config/component'
import { useListener } from '@vexip-ui/hooks'
import { isClient, toKebabCase } from '@vexip-ui/utils'

import type { AutoCompleteExposed } from 'vexip-ui'

const { t, locale } = useI18n({ useScope: 'global' })

const router = useRouter()
const route = useRoute()

const isMacPlatform = isClient && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
const suffix = isMacPlatform ? '⌘ K' : 'Ctrl K'

const searchValue = ref('')
const visible = ref(false)
const placeholder = ref('')

const search = ref<AutoCompleteExposed>()

const searchOptions = computed(() => {
  const rawOptions: string[] = []

  for (const group of getComponentConfig()) {
    rawOptions.push(
      ...group.components.map(
        ({ name }) => t(`component.${name}`) + (locale.value !== 'en-US' ? ` ${name}` : '')
      )
    )
  }

  return rawOptions
})

watchEffect(() => {
  placeholder.value = route.path.startsWith(`/${locale.value}/component/`)
    ? route.data.title
    : t('common.searchComponent')
})

isClient &&
  useListener(window, 'keydown', (event: KeyboardEvent) => {
    if ((isMacPlatform ? event.metaKey : event.ctrlKey) && event.code === 'KeyK') {
      event.preventDefault()
      visible.value = true
      search.value?.focus()
    }
  })

function toComponentDoc(fullName: string) {
  if (!route.path.startsWith(`/${locale.value}/component/${fullName}`)) {
    router.go(`/${locale.value}/component/${toKebabCase(fullName.split(' ').at(-1)!)}`)
  }

  nextTick(() => {
    searchValue.value = ''
    visible.value = false
  })
}
</script>

<template>
  <div class="doc-search">
    <Select
      ref="search"
      v-model:value="searchValue"
      v-model:visible="visible"
      filter
      ignore-case
      :transfer="false"
      class="search-input"
      :prefix="MagnifyingGlass"
      :placeholder="placeholder"
      :options="searchOptions"
      @change="toComponentDoc"
    >
      <template #suffix>
        <kbd class="search-input__shortcut">
          {{ suffix }}
        </kbd>
      </template>
    </Select>
  </div>
</template>

<style lang="scss">
@use '../style/mixins.scss' as *;

.doc-search {
  flex: auto;
  padding-inline-start: 14px;
  margin-inline-start: -1px;
  border-inline-start: var(--vxp-border-light-2);
  transition: var(--vxp-transition-border);

  .search-input {
    max-width: 300px;

    &__shortcut {
      padding: 3px 5px 4px;
      font-family: var(--vxp-font-family-base);
      font-size: 10px;
      line-height: 1;
      color: var(--vxp-content-color-disabled);
      background-color: var(--vxp-fill-color-background);
      border: var(--vxp-border-light-1);
      border-radius: var(--vxp-radius-base);

      @include query-media('xs') {
        display: none;
      }
    }

    .vxp-select {
      &__selector {
        background-color: transparent;
        border: 0;
        box-shadow: none;
      }

      &__prefix {
        padding-top: 1px;
      }
    }

    .vxp-icon {
      color: var(--vxp-content-color-placeholder);
    }
  }
}
</style>
