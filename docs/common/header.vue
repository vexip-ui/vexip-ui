<template>
  <header class="header">
    <Row style="height: 100%;">
      <Column flex="300px" style="padding-left: 40px;">
        <a class="index" @click="toHomepage">
          <img class="index__logo" src="../assets/logo.png" alt="logo.pne" />
          <span class="index__title"> Vexip UI </span>
          <Tag class="index__version">
            {{ `v${version}` }}
          </Tag>
        </a>
      </Column>
      <Column class="navigation" style="flex: 1 1 calc(100% - 300px);">
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
        <Menu v-model:active="currentMenu" horizontal @select="selectMenu">
          <template v-for="menu in menus" :key="menu.label">
            <li
              v-if="menu.to"
              class="vxp-menu__item vxp-menu__item--no-icon"
              @click="openPage(menu.to)"
            >
              <div class="vxp-menu__label">
                <span class="vxp-menu__title">{{ $t(`common.${menu.label}`) }}</span>
              </div>
            </li>
            <MenuItem v-else :label="menu.label">
              {{ $t(`common.${menu.label}`) }}
            </MenuItem>
          </template>
        </Menu>
        <Dropdown style="margin-right: 24px; cursor: pointer;">
          <Icon :scale="2">
            <Language></Language>
          </Icon>
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
        <ThemeSwitch></ThemeSwitch>
        <Linker class="github-link" to="//github.com/qmhc/vexip-ui/">
          <Icon :scale="1.6">
            <GithubB></GithubB>
          </Icon>
        </Linker>
      </Column>
    </Row>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { MagnifyingGlass, GithubB, Language } from '@vexip-ui/icons'
import { toKebabCase } from '@vexip-ui/utils'
import ThemeSwitch from './theme-switch.vue'
import { getComponentConfig } from '../router/components'

const version = __VERSION__

const searchOptions = ref<string[]>([])
const langOptions = [
  { lang: 'zh-CN', name: '中文' },
  { lang: 'en-US', name: 'English' }
]
const currentMenu = ref('')
const placeholder = ref('')
const currentSearch = ref('')

const i18n = useI18n({ useScope: 'global' })
const router = useRouter()
const route = useRoute()

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
  const matchedMenu = menus.find(menu => menu.label && route.path.startsWith(`/${language.value}/${menu.label}`))

  placeholder.value = route.meta?.isComponent
    ? formatComponentName(route.meta.name as string)
    : i18n.t('common.searchComponent')
  currentMenu.value = matchedMenu ? matchedMenu.label! : ''
})

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
    router.push(`/${language.value}/components/${toKebabCase(fullName.split(' ').at(-1))}`)
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
.header {
  height: 65px;
  border-bottom: var(--vxp-border-light-2);
  transition: var(--vxp-transition-border);

  .vxp-column {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .navigation {
    & > * {
      display: flex;
      margin-right: 16px;
    }

    .vxp-menu {
      border: 0;
    }

    .vxp-menu__item {
      height: 64px;
    }
  }

  .search {
    flex: auto;
    padding-left: 1em;
    margin-left: -1px;
    border-left: var(--vxp-border-light-2);
    transition: var(--vxp-transition-border);
  }

  .index {
    display: flex;
    align-items: center;
    height: 64px;
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

    &,
    &:hover {
      color: var(--vxp-content-color-primary);
    }

    &__logo {
      height: 32px;
      margin-right: 14px;
    }

    &__version {
      margin: 2px 0 0 6px;
      transform: scale(0.8);
    }
  }

  .search-input {
    width: 300px;
    background-color: transparent;
    border: 0;
    box-shadow: none;

    .vxp-icon {
      color: var(--vxp-content-color-placeholder);
    }
  }

  .theme-switch {
    margin-right: 24px;
  }

  .github-link {
    margin-right: 40px;
  }
}
</style>
