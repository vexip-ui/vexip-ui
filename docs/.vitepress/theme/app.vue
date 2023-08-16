<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'

import { useI18n } from 'vue-i18n'

import { useData, useRoute } from 'vitepress'
import { Bars } from '@vexip-ui/icons'
import { useBEM } from '@vexip-ui/bem-helper'
import { boundRange, isClient, multipleFixed } from '@vexip-ui/utils'
import { hashTarget } from './common/hash-target'
import { ensureStartingSlash } from '../shared'

import Homepage from './components/homepage.vue'
import NotFound from './components/not-found.vue'
import Article from './components/article.vue'
import DocSearch from './components/doc-search.vue'
import HeaderSign from './components/header-sign.vue'
import HeaderNav from './components/header-nav.vue'
import HeaderSuffix from './components/header-suffix.vue'
import AsideMenu from './components/aside-menu.vue'

import type { LayoutExposed, LayoutInnerClass, PropsOptions, ScrollbarExposed } from 'vexip-ui'
import type { ThemeConfig } from './types'

const { theme, page, frontmatter } = useData<ThemeConfig>()
const { t, locale } = useI18n({ useScope: 'global' })

const route = useRoute()

const nh = useBEM('docs-layout')
const layoutClasses: LayoutInnerClass = {
  section: nh.be('section'),
  header: nh.be('header'),
  sidebar: nh.be('sidebar'),
  aside: nh.be('aside'),
  footer: nh.be('footer')
}

const providedProps: PropsOptions = {
  default: { transfer: '#transfer-place' as any },
  masker: { transfer: true },
  modal: { transfer: true },
  drawer: { transfer: true },
  imageViewer: { transfer: true }
}

const fixedSub = ref(false)
const expanded = ref(false)
const mounted = ref(false)

const layout = ref<LayoutExposed>()

const outline = computed(() => {
  if (frontmatter.value.aside === false) {
    return undefined
  }

  const config = theme.value.outline || {}
  const path = ensureStartingSlash(page.value.relativePath)

  for (const key of Object.keys(config)) {
    if (path.startsWith(`/${locale.value}${key}`)) {
      return config[key]
    }
  }

  return undefined
})

const footerLinks = computed(() => {
  if (frontmatter.value.footer === false) {
    return []
  }

  return (theme.value.footerLinks || [])
    .filter(group => group.items.length && (group.text || group.i18n))
    .map(group => ({
      name: group.text || t(group.i18n!),
      children: group.items!.map(item => ({
        name: item.text || t(item.i18n!),
        subname: item.subtext || (item.subi18n ? t(item.subi18n) : undefined),
        to: item.link
      }))
    }))
})

const bar = ref<ScrollbarExposed>()
const barLength = ref(35)
const barDisabled = ref(false)

watch(
  () => route.path,
  () => {
    requestAnimationFrame(refreshScroll)
  }
)
watch(expanded, value => {
  if (!isClient) return

  if (value) {
    const bodyTop = document.body.getBoundingClientRect().top
    document.body.style.top = `${bodyTop}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.position = 'fixed'
  } else {
    document.body.style.position = ''
    window.scrollTo(0, Math.abs(+document.body.style.top.replace('px', '')))

    nextTick(() => {
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
    })
  }
})

onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true
    refreshScroll()
  })

  if (!isClient) return

  computeBarLength()
  window.addEventListener('scroll', handleScroll)
})

function computeBarLength() {
  barDisabled.value = document.documentElement.scrollHeight <= document.documentElement.clientHeight
  barLength.value = boundRange(
    (document.documentElement.clientHeight / (document.documentElement.scrollHeight || 1)) * 100,
    5,
    99
  )
}

function handleScroll() {
  if (!isClient || !bar.value) return

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  if (scrollHeight <= clientHeight) {
    bar.value.handleScroll(0)
    return
  }

  const percent = multipleFixed(scrollTop / (scrollHeight - clientHeight || 1), 100, 2)
  bar.value.handleScroll(percent)
}

function handleBarScroll(percent: number) {
  if (!isClient) return

  const { scrollHeight, clientHeight } = document.documentElement

  if (scrollHeight <= clientHeight) return

  document.documentElement.scrollTop = (percent * (scrollHeight - clientHeight)) / 100
}

function refreshScroll() {
  if (!isClient) return

  const content = document.documentElement

  if (hashTarget.value) {
    const target = document.querySelector(`#${hashTarget.value}`)

    if (target) {
      const wrapperRect = content.getBoundingClientRect()
      const elRect = target.getBoundingClientRect()
      const scrollTop = elRect.top - wrapperRect.top - 15

      content.scrollTop = scrollTop
      setTimeout(() => {
        content.scrollTop = scrollTop
      }, 0)
    }
  }

  content.scrollTop = 0
  setTimeout(() => {
    content.scrollTop = 0
  }, 0)

  computeBarLength()
}
</script>

<template>
  <Layout
    ref="layout"
    v-model:expanded="expanded"
    :class="['docs-layout', !mounted && 'docs-layout--rendering']"
    sign-type="header"
    fit-window
    :no-aside="frontmatter.homepage || page.isNotFound"
    :footer="!(frontmatter.homepage || page.isNotFound || frontmatter.footer === false)"
    :links="footerLinks"
    :inner-classes="layoutClasses"
    :style="{
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
        v-if="!frontmatter.homepage && !page.isNotFound"
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

    <!-- Main content -->
    <template #main>
      <Homepage v-if="frontmatter.homepage"></Homepage>
      <NotFound v-else-if="page.isNotFound"></NotFound>
      <template v-else>
        <ConfigProvider :props="providedProps">
          <Article :anchor-level="outline">
            <Content class="markdown"></Content>
          </Article>
        </ConfigProvider>
        <div id="transfer-place"></div>
      </template>
      <Masker
        v-model:active="expanded"
        class="global-masker"
        closable
        :auto-remove="false"
      ></Masker>
    </template>

    <template #footer-copyright>
      Made with ❤️ by
      <Linker type="primary" to="https://github.com/vexip-ui">
        Vexip UI
      </Linker>
      and contributors
    </template>
  </Layout>

  <teleport to="body">
    <Scrollbar
      v-show="!expanded"
      ref="bar"
      class="docs-scrollbar"
      :disabled="barDisabled"
      :bar-length="barLength"
      wrapper="body"
      @scroll="handleBarScroll"
    ></Scrollbar>
  </teleport>
</template>

<style lang="scss">
@use './style/mixins.scss' as *;

#transfer-place {
  position: relative;
  z-index: calc(var(--header-z-index) - 1);
}

.docs-layout {
  &__section.vxp-layout__section {
    transition-duration: 0ms;
  }

  &__header.vxp-layout__header {
    z-index: var(--header-z-index);
    padding: 0;

    &--away {
      position: sticky;
      top: calc(var(--vxp-layout-header-height) * -1);
    }
  }

  &__sidebar.vxp-layout__sidebar {
    z-index: calc(var(--header-z-index) - 2);

    &--away {
      z-index: 10000;
    }
  }

  &__aside.vxp-layout__aside {
    z-index: calc(var(--header-z-index) - 2);

    .vxp-layout__expand-handler {
      display: none;
    }
  }

  &__footer.vxp-layout__footer {
    .vxp-layout {
      &__links {
        padding-top: 36px;
      }

      &__links-row {
        justify-content: flex-start;
      }

      &__link-group {
        max-width: 400px;
      }

      &__copyright {
        padding: 24px 16px 30px;
      }

      &__link-name--group {
        font-weight: bold;
      }
    }
  }

  &--rendering &__aside {
    transition-duration: 0ms;
  }
}

.docs-scrollbar {
  position: fixed;
  top: calc(var(--sub-header-height) + var(--header-height));

  @include query-media('lg') {
    top: var(--header-height);
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
</style>
