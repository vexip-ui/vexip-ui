<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { useI18n } from 'vue-i18n'
import { Bars } from '@vexip-ui/icons'
import { ensureStartingSlash } from './common/utils'

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

const fixedSub = ref(false)
const expanded = ref(false)

const layout = ref<LayoutExposed>()
const scroll = computed(() => layout.value?.scroll)

const outline = computed(() => {
  if (page.value.frontmatter.aside === false) {
    return []
  }

  const config = theme.value.outline
  const path = ensureStartingSlash(page.value.relativePath)

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
watch(
  () => scroll.value?.y,
  value => {
    fixedSub.value = !!value && value >= 65
  }
)
</script>

<template>
  <Layout
    ref="layout"
    v-model:expanded="expanded"
    class="docs-layout"
    sign-type="header"
    :no-aside="page.frontmatter.homepage || page.isNotFound"
    :style="{
      height: '100vh',
      '--vxp-layout-aside-width': 'var(--aside-width)',
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
      <header
        v-if="!page.frontmatter.homepage && !page.isNotFound"
        class="sub-header"
        :style="
          fixedSub
            ? { position: 'fixed', top: '0', boxShadow: 'var(--vxp-shadow-light-2)' }
            : undefined
        "
      >
        <Button class="sub-header__reduce" text @click="expanded = !expanded">
          <Icon :scale="1.4">
            <Bars></Bars>
          </Icon>
        </Button>
        <div style="flex: auto"></div>
        <HeaderNav></HeaderNav>
      </header>
    </template>
    <template #aside-main>
      <AsideMenu @menu-select="expanded = false"></AsideMenu>
    </template>
    <template #aside-bottom>
      <span></span>
    </template>
    <Homepage v-if="page.frontmatter.homepage"></Homepage>
    <NotFound v-else-if="page.isNotFound"></NotFound>
    <Article v-else :anchor-level="outline">
      <Content class="markdown"></Content>
    </Article>
    <Masker v-model:active="expanded" class="global-masker" closable></Masker>
  </Layout>
</template>

<style lang="scss">
@use '../style/mixins.scss' as *;

.docs-layout {
  .vxp-layout {
    &__header {
      z-index: var(--header-z-index);
      padding: 0;

      &--reduced {
        transform: translateY(-100%);
      }
    }

    &__scrollbar {
      top: calc(var(--sub-header-height) + var(--vxp-layout-header-height));

      @include query-media('lg') {
        top: var(--vxp-layout-header-height);
      }
    }

    &__expand-handler {
      display: none;
    }

    &__sider--away {
      z-index: calc(var(--header-z-index) + 2);
    }
  }
}

.sub-header {
  position: absolute;
  top: calc(100% + 1px);
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: var(--sub-header-height);
  background-color: var(--bg-color);
  border-bottom: var(--vxp-border-light-2);
  transition: var(--vxp-transition-shadow);

  @include query-media('lg') {
    display: none;
  }

  .navigation {
    display: block;
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
}

.global-masker {
  z-index: calc(var(--header-z-index) + 1) !important;
}
</style>
