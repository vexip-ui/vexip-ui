<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useData, useRouter } from 'vitepress'
import { ChevronLeft, ChevronRight } from '@vexip-ui/icons'
import { useRtl } from '@vexip-ui/hooks'
import { flatTree } from '@vexip-ui/utils'
import { ensureStartingSlash, removeExt } from '../../shared'

import type { AsideMenuItem, ThemeConfig } from '../types'

const { theme, page, frontmatter } = useData<ThemeConfig>()
const router = useRouter()
const { t, locale } = useI18n({ useScope: 'global' })
const { isRtl } = useRtl()

const path = computed(() => ensureStartingSlash(removeExt(page.value.relativePath)))
const candidates = computed(() => {
  const config = theme.value.asideMenus || {}

  let menus

  for (const key of Object.keys(config)) {
    if (path.value.startsWith(`/${locale.value}${key}`)) {
      menus = config[key]
      break
    }
  }

  if (!menus) return []

  return flatTree(menus, {
    childField: 'items',
    depthFirst: true,
    injectId: false,
    filter: menu => !!menu.link
  })
})
const index = computed(() => {
  return candidates.value.findIndex(item => path.value.startsWith(`/${locale.value}${item.link}`))
})
const prev = computed(() => createLink(frontmatter.value.prev, candidates.value[index.value - 1]))
const next = computed(() => createLink(frontmatter.value.next, candidates.value[index.value + 1]))

function createLink(item: false | string | AsideMenuItem, fallback?: AsideMenuItem) {
  return item === false
    ? undefined
    : {
        text: (typeof item === 'object' ? item.text : undefined) ?? fallback?.text,
        i18n:
          (typeof item === 'string'
            ? item
            : typeof item === 'object'
              ? item.i18n || item.key
              : undefined) ??
          fallback?.i18n ??
          fallback?.key,
        link: (typeof item === 'object' ? item.link : undefined) ?? fallback?.link,
        subtext: (typeof item === 'object' ? item.subtext : undefined) ?? fallback?.subtext,
        subI18n: (typeof item === 'object' ? item.subI18n : undefined) ?? fallback?.subI18n,
        noSub: (typeof item === 'object' ? item.noSub : undefined) ?? fallback?.noSub ?? []
      }
}
</script>

<template>
  <div v-if="prev?.link || next?.link" class="page-links">
    <Linker
      v-if="prev?.link"
      class="page-links__prev"
      type="primary"
      :icon="isRtl ? ChevronRight : ChevronLeft"
      @click="router.go(`/${locale}${prev.link}`)"
    >
      <span>{{ prev.text || t(prev.i18n!) }}</span>
      <span
        v-if="!prev.noSub.includes(locale as string) && (prev.subtext || prev.subI18n)"
        style="margin-inline-start: 6px"
      >
        {{ prev.subtext || t(prev.subI18n!) }}
      </span>
    </Linker>
    <span role="none" style="flex: auto"></span>
    <Linker
      v-if="next?.link"
      class="page-links__next"
      type="primary"
      @click="router.go(`/${locale}${next.link}`)"
    >
      <span>{{ next.text || t(next.i18n!) }}</span>
      <span
        v-if="!next.noSub.includes(locale as string) && (next.subtext || next.subI18n)"
        style="margin-inline-start: 6px"
      >
        {{ next.subtext || t(next.subI18n!) }}
      </span>
      <Icon
        :icon="isRtl ? ChevronLeft : ChevronRight"
        style="padding-top: 1px; margin-inline-start: 3px"
      ></Icon>
    </Linker>
  </div>
</template>

<style lang="scss">
.page-links {
  display: flex;
  align-items: center;
  height: 72px;
  padding: 16px 0;

  .vxp-linker {
    height: 100%;

    &__icon {
      padding-top: 1px;
    }
  }
}
</style>
