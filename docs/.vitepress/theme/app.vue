<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { useI18n } from 'vue-i18n'

import Homepage from './components/homepage.vue'
import NotFound from './components/not-found.vue'
import Article from './components/article.vue'
import DocSearch from './components/doc-search.vue'
import HeaderSign from './components/header-sign.vue'
import HeaderNav from './components/header-nav.vue'
import HeaderSuffix from './components/header-suffix.vue'
import AsideMenu from './components/aside-menu.vue'

import type { LayoutExposed } from 'vexip-ui'

const { theme, page } = useData()

const route = useRoute()

const { locale } = useI18n({ useScope: 'global' })

const layout = ref<LayoutExposed>()
const scroll = computed(() => layout.value?.scroll)

const outline = computed(() => {
  if (page.value.frontmatter.aside === false) {
    return []
  }

  const config = theme.value.outline
  let path = route.data.relativePath
  path = /^\//.test(path) ? path : `/${path}`

  for (const key of Object.keys(config)) {
    if (path.startsWith(`/${locale.value}${key}`)) {
      return config[key]
    }
  }

  return undefined
})

watch(
  () => route.path,
  () => {
    if (!scroll.value) return

    scroll.value.scrollTo(0, 0, 0)
  }
)
</script>

<template>
  <Layout
    ref="layout"
    sign-type="header"
    :no-aside="page.frontmatter.homepage || page.isNotFound"
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
      <DocSearch></DocSearch>
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
    <NotFound v-else-if="page.isNotFound"></NotFound>
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
