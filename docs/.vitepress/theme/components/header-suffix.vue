<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vitepress'
import { useI18n } from 'vue-i18n'
import { GithubB, Language } from '@vexip-ui/icons'

import ThemeSwitch from './theme-switch.vue'

import type { I18nConfig } from '../i18n'

const router = useRouter()
const route = useRoute()

const { locale, availableLocales, getLocaleMessage } = useI18n({ useScope: 'global' })

const langOptions = computed(() => {
  return availableLocales.map(lang => {
    const config = getLocaleMessage(lang as string) as I18nConfig

    return {
      lang: lang as string,
      name: config.common.language || lang
    }
  })
})

function changeLanguage(lang: string) {
  if (lang !== locale.value) {
    router.go(route.path.replace(locale.value as string, lang))
  }
}
</script>

<template>
  <Dropdown class="language" trigger="click">
    <button type="button" class="language-trigger">
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
          @select="changeLanguage(option.lang)"
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

<style scoped lang="scss">
@use '../style/mixins.scss' as *;

.language {
  display: inline-flex;
  margin-right: 24px;
  cursor: pointer;

  &-trigger {
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
