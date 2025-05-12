<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import Settings from './settings.vue'
import { useData, useRouter } from 'vitepress'
import { GithubB, Language } from '@vexip-ui/icons'
import { isClient } from '@vexip-ui/utils'

import ThemeSwitch from './theme-switch.vue'
import DirectionSwitch from './direction-switch.vue'

import type { I18nConfig } from '../i18n'
import type { ThemeConfig } from '../types'

const router = useRouter()

const { site, page, frontmatter } = useData<ThemeConfig>()
const { t, locale, getLocaleMessage } = useI18n({ useScope: 'global' })

const isRtl = ref(false)

watch(() => router.route.path, syncVitepressDir)

const langOptions = computed(() => {
  return Object.entries(site.value.locales).map(([key, value]) => {
    const lang = value.lang || key
    const config = getLocaleMessage(lang) as I18nConfig

    return {
      lang,
      name: config.common.language || value.label,
      link: value.link,
    }
  })
})

function changeLanguage(lang: string, link?: string) {
  if (lang !== locale.value) {
    const path =
      page.value.relativePath === 'index.md'
        ? '/'
        : page.value.relativePath.substring(
          locale.value === 'root' ? 0 : (locale.value as string).length,
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
      <DirectionSwitch
        :title="t('common.toggleDirection')"
        @change="handleRtlChange"
      ></DirectionSwitch>
    </div>

    <div class="theme">
      <ThemeSwitch :title="t('common.toggleTheme')"></ThemeSwitch>
    </div>

    <Linker
      class="github-link"
      to="//github.com/vexip-ui/vexip-ui/"
      :title="t('common.viewInGithub')"
    >
      <Icon label="github" :scale="1.7">
        <GithubB></GithubB>
      </Icon>
    </Linker>

    <Settings v-if="!frontmatter.homepage"></Settings>
  </div>
</template>

<style lang="scss">
@use '../style/mixins.scss' as *;

.header-suffix {
  --item-span: 24px;

  display: flex;
  align-items: center;
  height: 100%;

  .language {
    display: inline-flex;
    height: 100%;
    margin-inline-end: var(--item-span);
    cursor: pointer;

    &__trigger {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0;
      color: var(--vxp-content-color-base);
      cursor: pointer;
      background-color: transparent;
      border: 0;
    }
  }

  .rtl,
  .theme,
  .settings {
    display: flex;
    align-items: center;
    margin-inline-end: var(--item-span);
  }

  .github-link {
    margin-inline-end: var(--item-span);
  }

  & > :last-child {
    @include query-media('lg') {
      margin-inline-end: 40px;
    }
  }
}
</style>
