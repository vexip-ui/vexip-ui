<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useI18n } from 'vue-i18n'

import { useData, useRouter } from 'vitepress'
import { GithubB, Language } from '@vexip-ui/icons'
import { isClient } from '@vexip-ui/utils'

import ThemeSwitch from './theme-switch.vue'
import DirectionSwitch from './direction-switch.vue'

import type { I18nConfig } from '../i18n'
import type { ThemeConfig } from '../types'

const router = useRouter()

const { site, page } = useData<ThemeConfig>()
const { locale, getLocaleMessage } = useI18n({ useScope: 'global' })

const isRtl = ref(false)

watch(() => router.route.path, syncVitepressDir)

const langOptions = computed(() => {
  return Object.entries(site.value.locales).map(([key, value]) => {
    const lang = value.lang || key
    const config = getLocaleMessage(lang) as I18nConfig

    return {
      lang,
      name: config.common.language || value.label,
      link: value.link
    }
  })
})

function changeLanguage(lang: string, link?: string) {
  if (lang !== locale.value) {
    const path =
      page.value.relativePath === 'index.md'
        ? '/'
        : page.value.relativePath.substring(
          locale.value === 'root' ? 0 : (locale.value as string).length
        )
    link = link || (lang === 'root' ? '/' : `/${lang}`)

    router.go(`${link}${path}`.replace(/(^|\/)?index.md$/, '$1').replace(/\.md$/, '.html'))
  }
}

function handleRtlChange(rtl: boolean) {
  isRtl.value = rtl
  syncVitepressDir()
}

function syncVitepressDir() {
  site.value.dir = isRtl.value ? 'rtl' : 'ltr'

  if (isClient) {
    document.documentElement.dir = site.value.dir
  }
}
</script>

<template>
  <div class="header-suffix">
    <Dropdown class="language" :transfer="false">
      <button type="button" class="language__trigger">
        <Icon label="language" :scale="2">
          <Language></Language>
        </Icon>
      </button>
      <template #drop>
        <DropdownList>
          <DropdownItem
            v-for="option in langOptions"
            :key="option.lang"
            :name="option.name"
            :selected="option.lang === locale"
            @select="changeLanguage(option.lang, option.link)"
          >
            {{ option.name }}
          </DropdownItem>
        </DropdownList>
      </template>
    </Dropdown>
    <div class="rtl">
      <DirectionSwitch ref="dir" @change="handleRtlChange"></DirectionSwitch>
    </div>
    <div class="theme">
      <ThemeSwitch></ThemeSwitch>
    </div>
    <Linker class="github-link" to="//github.com/vexip-ui/vexip-ui/">
      <Icon label="github" :scale="1.7">
        <GithubB></GithubB>
      </Icon>
    </Linker>
  </div>
</template>

<style lang="scss">
@use '../style/mixins.scss' as *;

.header-suffix {
  display: flex;
  align-items: center;

  .language {
    display: inline-flex;
    margin-inline-end: 24px;
    cursor: pointer;

    &__trigger {
      display: flex;
      padding: 0;
      color: var(--vxp-content-color-base);
      cursor: pointer;
      background-color: transparent;
      border: 0;
    }
  }

  .rtl,
  .theme {
    display: flex;
    align-items: center;
    margin-inline-end: 24px;
  }

  .github-link {
    margin-inline-end: 24px;

    @include query-media('lg') {
      margin-inline-end: 40px;
    }
  }
}
</style>
