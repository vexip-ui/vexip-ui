<template>
  <header :class="['header', isAffix && 'header--reduced']">
    <a class="index" @click="toHomepage">
      <img class="index__logo" src="/logo.png" alt="logo.pne" />
      <span class="index__title"> Vexip UI </span>
      <Tag class="index__version">
        {{ `v${version}` }}
      </Tag>
    </a>
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
    <div class="navigation">
      <Menu v-model:active="currentMenu" horizontal @select="selectMenu">
        <template v-for="menu in menus" :key="menu.label">
          <li v-if="menu.to" class="vxp-menu__item vxp-menu__item--no-icon" role="none">
            <div
              class="vxp-menu__label vxp-menu__label--marker-bottom"
              role="menuitem"
              tabindex="0"
              @click="openPage(menu.to)"
              @keydown.enter.stop="openPage(menu.to)"
              @keydown.space.stop.prevent="openPage(menu.to)"
            >
              <span class="vxp-menu__title">{{ $t(`common.${menu.label}`) }}</span>
            </div>
          </li>
          <MenuItem v-else :label="menu.label">
            {{ $t(`common.${menu.label}`) }}
          </MenuItem>
        </template>
      </Menu>
    </div>
    <Dropdown class="language" trigger="click">
      <button class="language-trigger">
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
            :selected="option.lang === language"
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
    <Linker class="github-link" to="//github.com/qmhc/vexip-ui/">
      <Icon label="github" :scale="1.6">
        <GithubB></GithubB>
      </Icon>
    </Linker>
  </header>
  <section v-if="currentMenu" :class="['sub-menu', isAffix && 'sub-menu--affix']">
    <Button class="sub-menu__reduce" text @click="$emit('toggle-menu', true)">
      <Icon :scale="1.4">
        <Bars></Bars>
      </Icon>
    </Button>
    <div style="flex: auto;"></div>
    <Menu v-model:active="currentMenu" horizontal @select="selectMenu">
      <template v-for="menu in menus" :key="menu.label">
        <li v-if="menu.to" class="vxp-menu__item vxp-menu__item--no-icon" role="none">
          <div
            class="vxp-menu__label vxp-menu__label--marker-bottom"
            role="menuitem"
            tabindex="0"
            @click="openPage(menu.to)"
            @keydown.enter.stop="openPage(menu.to)"
            @keydown.space.stop.prevent="openPage(menu.to)"
          >
            <span class="vxp-menu__title">{{ $t(`common.${menu.label}`) }}</span>
          </div>
        </li>
        <MenuItem v-else :label="menu.label">
          {{ $t(`common.${menu.label}`) }}
        </MenuItem>
      </template>
    </Menu>
  </section>
</template>

<script setup lang="ts">
import { ref, toRef, computed, watch, watchEffect, inject, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { MagnifyingGlass, GithubB, Language, Bars } from '@vexip-ui/icons'
import { toKebabCase } from '@vexip-ui/utils'
import ThemeSwitch from './theme-switch.vue'
import { getComponentConfig } from '../router/components'

import type { EventEmitter } from '@vexip-ui/utils'
import type { I18nConfig } from '../i18n'
import type { Store } from '../symbol'

const emit = defineEmits(['toggle-menu'])

const store = inject<Store>('store')!
const emitter = inject<EventEmitter>('emitter')!
const isAffix = toRef(store, 'isAffix')

emitter.on('toggle-affix', (affix: boolean) => {
  isAffix.value = affix
})

const version = __VERSION__

const searchOptions = ref<string[]>([])
const currentMenu = ref('')
const placeholder = ref('')
const currentSearch = ref('')

const i18n = useI18n({ useScope: 'global' })
const router = useRouter()
const route = useRoute()

const langOptions = computed(() => {
  return i18n.availableLocales.map(lang => {
    const config = i18n.getLocaleMessage(lang as string) as I18nConfig

    return {
      lang: lang as string,
      name: config.common.language || lang
    }
  })
})

const menus = [
  { label: 'guides' },
  { label: 'components' },
  { label: 'playground', to: 'https://playground.vexipui.com' }
]

const language = computed(() => i18n.locale.value as string)

watchEffect(() => {
  const options: string[] = []

  getComponentConfig().forEach(group => {
    options.push(...group.components.map(({ name }) => formatComponentName(name)))
  })

  searchOptions.value = options
})

watchEffect(() => {
  const matchedMenu = menus.find(
    menu => menu.label && route.path.startsWith(`/${language.value}/${menu.label}`)
  )

  placeholder.value = route.meta?.isComponent
    ? formatComponentName(route.meta.name as string)
    : i18n.t('common.searchComponent')
  currentMenu.value = matchedMenu ? matchedMenu.label! : ''
})

watch(
  () => route.path,
  () => emit('toggle-menu', false)
)

function selectMenu(label: string) {
  if (!route.path.startsWith(`/${language.value}/${label}`)) {
    router.push(`/${language.value}/${label}`)
  }
}

function toHomepage() {
  router.push(`/${language.value}`)
}

function openPage(url: string) {
  window.open(url)
}

function toComponentDoc(fullName: string) {
  if (route.meta?.component !== fullName) {
    router.push(`/${language.value}/components/${toKebabCase(fullName.split(' ').at(-1)!)}`)
  }

  nextTick(() => {
    currentSearch.value = ''
  })
}

function changeLanguage(lang: string) {
  if (lang !== language.value) {
    router.push(route.path.replace(language.value, lang))
  }
}

function formatComponentName(name: string) {
  return i18n.t(`components.${name}`) + (language.value !== 'en-US' ? ` ${name}` : '')
}
</script>

<style lang="scss">
@use '../style/mixins.scss' as *;

.header {
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--header-height);
  background-color: var(--bg-color);
  border-bottom: var(--vxp-border-light-2);
  transition: var(--vxp-transition-border), var(--vxp-transition-transform);

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

  .index {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    height: 100%;
    padding: 0 16px 0 20px;
    font-family:
      Avenir,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      'Noto Sans',
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji';
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;

    @include query-media('lg') {
      width: var(--aside-width);
      padding: 0;
      padding-left: 16px;
    }

    @include query-media('xl') {
      justify-content: center;
      width: var(--aside-width-large);
      padding-left: 0;
    }

    &,
    &:hover {
      color: var(--vxp-content-color-primary);
    }

    &__logo {
      height: 32px;

      @include query-media('lg') {
        margin-right: 14px;
      }
    }

    &__title {
      display: none;
      white-space: nowrap;

      @include query-media('lg') {
        display: block;
      }
    }

    &__version {
      display: none;

      @include query-media('lg') {
        display: block;
        margin: 2px 0 0 6px;
        transform: scale(0.8);
      }
    }
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

  .navigation {
    display: none;

    @include query-media('lg') {
      display: block;
    }

    .vxp-menu {
      margin-right: 20px;
      border: 0;
    }

    .vxp-menu__item {
      height: var(--header-height);
    }
  }

  .language {
    display: inline-flex;
    margin-right: 24px;
    cursor: pointer;

    &-trigger {
      display: flex;
      padding: 0;
      color: var(--vxp-content-color-base);
      background-color: transparent;
      border: 0;
    }
  }

  .theme {
    display: block;
    margin-right: 24px;
  }

  .github-link {
    margin-right: 24px;

    @include query-media('lg') {
      margin-right: 40px;
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
