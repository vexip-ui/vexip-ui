<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRouter } from 'vitepress'
import { useI18n } from 'vue-i18n'
import { GithubB, Language } from '@vexip-ui/icons'

import ThemeSwitch from './theme-switch.vue'

import type { I18nConfig } from '../i18n'

const router = useRouter()

const { site, page } = useData()
const { locale, getLocaleMessage } = useI18n({ useScope: 'global' })

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
</script>

<template>
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
  <div class="theme">
    <ThemeSwitch></ThemeSwitch>
  </div>
  <Linker class="github-link" to="//github.com/vexip-ui/vexip-ui/">
    <Icon label="github" :scale="1.6">
      <GithubB></GithubB>
    </Icon>
  </Linker>
</template>

<style lang="scss">
@use '../style/mixins.scss' as *;

.language {
  display: inline-flex;
  margin-right: 24px;
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

.theme {
  display: flex;
  align-items: center;
  margin-right: 24px;
}

.github-link {
  margin-right: 24px;

  @include query-media('lg') {
    margin-right: 40px;
  }
}
</style>
