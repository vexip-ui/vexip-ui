<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { useI18n } from 'vue-i18n'
import { Bars } from '@vexip-ui/icons'

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
    class="docs-layout"
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
      <header
        v-if="!page.frontmatter.homepage && !page.isNotFound"
        class="sub-header"
        :style="fixedSub ? { position: 'fixed', top: '0' } : undefined"
      >
        <Button class="sub-header__reduce" text>
          <Icon :scale="1.4">
            <Bars></Bars>
          </Icon>
        </Button>
        <div style="flex: auto"></div>
        <HeaderNav></HeaderNav>
      </header>
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
</style>
