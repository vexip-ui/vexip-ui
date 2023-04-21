<script setup lang="ts">
import { ref, watchEffect, nextTick } from 'vue'
import { useRoute, useRouter } from 'vitepress'
import { useI18n } from 'vue-i18n'
import { MagnifyingGlass } from '@vexip-ui/icons'
import { toKebabCase } from '@vexip-ui/utils'
import { getComponentConfig } from '../../config/component'

const { t, locale } = useI18n({ useScope: 'global' })

const router = useRouter()
const route = useRoute()

const rawOptions: string[] = []

for (const group of getComponentConfig()) {
  rawOptions.push(
    ...group.components.map(
      ({ name }) => t(`component.${name}`) + (locale.value !== 'en-US' ? ` ${name}` : '')
    )
  )
}

const searchOptions = ref(rawOptions)
const placeholder = ref('')
const currentSearch = ref('')

watchEffect(() => {
  placeholder.value = route.path.startsWith(`/${locale.value}/component/`)
    ? route.data.title
    : t('common.searchComponent')
})

function toComponentDoc(fullName: string) {
  if (!route.path.startsWith(`/${locale.value}/component/${fullName}`)) {
    router.go(`/${locale.value}/component/${toKebabCase(fullName.split(' ').at(-1)!)}`)
  }

  nextTick(() => {
    currentSearch.value = ''
  })
}
</script>

<template>
  <div class="doc-search">
    <AutoComplete
      v-model:value="currentSearch"
      filter
      ignore-case
      :transfer="false"
      class="search-input"
      :prefix="MagnifyingGlass"
      :placeholder="placeholder"
      :options="searchOptions"
      @change="toComponentDoc"
    ></AutoComplete>
  </div>
</template>

<style lang="scss">
.doc-search {
  flex: auto;
  padding-left: 14px;
  margin-left: -1px;
  border-left: var(--vxp-border-light-2);
  transition: var(--vxp-transition-border);

  .search-input {
    max-width: 300px;

    .vxp-select__selector {
      background-color: transparent;
      border: 0;
      box-shadow: none;
    }

    .vxp-icon {
      color: var(--vxp-content-color-placeholder);
    }
  }
}
</style>
