<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { MagnifyingGlass } from '@vexip-ui/icons'
import { toKebabCase } from '@vexip-ui/utils'
import { useData, useRoute, useRouter } from 'vitepress'
import { useI18n } from 'vue-i18n'

import Article from './components/article.vue'
import Homepage from './components/homepage.vue'
import HeaderSign from './components/header-sign.vue'
import HeaderNav from './components/header-nav.vue'
import HeaderSuffix from './components/header-suffix.vue'
import AsideMenu from './components/aside-menu.vue'

const { theme, page } = useData()

const router = useRouter()
const route = useRoute()

const i18n = useI18n({ useScope: 'global' })

const language = computed(() => i18n.locale.value as string)

const outline = computed(() => {
  if (page.value.frontmatter.aside === false) {
    return []
  }

  const config = theme.value.outline
  let path = route.data.relativePath
  path = /^\//.test(path) ? path : `/${path}`

  for (const key of Object.keys(config)) {
    if (path.startsWith(`/${language.value}${key}`)) {
      return config[key]
    }
  }

  return undefined
})

const searchOptions = ref<string[]>([])
const placeholder = ref('')
const currentSearch = ref('')

function toComponentDoc(fullName: string) {
  if (!route.path.startsWith(`/${language.value}/component/${fullName}`)) {
    router.go(`/${language.value}/component/${toKebabCase(fullName.split(' ').at(-1)!)}`)
  }

  nextTick(() => {
    currentSearch.value = ''
  })
}
</script>

<template>
  <Layout
    sign-type="header"
    :no-aside="page.frontmatter.homepage"
    :style="{
      height: '100vh',
      '--vxp-layout-aside-width': 'var(--aside-width-large)',
      '--vxp-layout-header-height': 'var(--header-height)'
    }"
  >
    <template #sign>
      <HeaderSign></HeaderSign>
    </template>
    <template #header-main>
      <div class="search">
        <AutoComplete
          v-model:value="currentSearch"
          filter
          ignore-case
          transfer
          class="search-input"
          :prefix="MagnifyingGlass"
          :placeholder="placeholder"
          :options="searchOptions"
          @change="toComponentDoc"
        ></AutoComplete>
      </div>
    </template>
    <template #header-right>
      <HeaderNav></HeaderNav>
      <HeaderSuffix></HeaderSuffix>
    </template>
    <template #header-user>
      <span></span>
    </template>
    <template #aside-main>
      <AsideMenu></AsideMenu>
    </template>
    <template #aside-bottom>
      <span></span>
    </template>
    <Homepage v-if="page.frontmatter.homepage"></Homepage>
    <Article v-else :anchor-level="outline">
      <Content class="markdown"></Content>
    </Article>
  </Layout>
</template>

<style lang="scss">
@use '../style/mixins.scss' as *;

.vxp-layout__header {
  z-index: var(--header-z-index);
  padding: 0;

  &--reduced {
    transform: translateY(-100%);
  }

  .search {
    flex: auto;
    padding-left: 14px;
    margin-left: -1px;
    border-left: var(--vxp-border-light-2);
    transition: var(--vxp-transition-border);
  }

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

.sub-menu {
  position: fixed;
  top: var(--header-height);
  z-index: 90;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--sub-menu-height);
  background-color: var(--bg-color);
  border-bottom: var(--vxp-border-light-2);
  transition: var(--vxp-transition-transform);

  &--affix {
    transform: translateY(calc(var(--header-height) * -1));
  }

  @include query-media('lg') {
    display: none;
  }

  &__reduce {
    display: flex;
    padding: 0 16px 0 24px;
    color: inherit;
    background-color: transparent;
    border: 0;
    outline: 0;

    &:focus {
      color: var(--vxp-color-primary-base);
    }
  }

  .vxp-menu {
    border: 0;
  }

  .vxp-menu__item {
    height: var(--sub-menu-height);
  }
}
</style>
