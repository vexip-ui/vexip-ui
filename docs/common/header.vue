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
      <Column class="navigation" flex="auto">
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
            @select="toComponentDoc"
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
                <span class="vxp-menu__title">{{ getMetaName(globalState.language, menu, false) }}</span>
              </div>
            </li>
            <MenuItem v-else :label="menu.label">
              {{ getMetaName(globalState.language, menu, false) }}
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
                :selected="option.lang === globalState.language"
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
import { ref, watchEffect, inject, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { version } from 'vexip-ui'
import { MagnifyingGlass, GithubB, Language } from '@vexip-ui/icons'
import { toKebabCase } from '@vexip-ui/utils'
import ThemeSwitch from './theme-switch.vue'
import { getComponentConfig } from '../router/components'
import { getMetaName } from './meta-name'

const globalState = inject('globalState', { language: __ROLLBACK_LANG__ })

const searchOptions: string[] = []
const langOptions = [
  { lang: 'zh-CN', name: '中文' },
  { lang: 'en-US', name: 'English' }
]

getComponentConfig().forEach(group => {
  searchOptions.push(...group.components.map(({ name, cname }) => `${name} ${cname}`))
})

const currentMenu = ref('')
const placeholder = ref('')
const currentSearch = ref('')

const router = useRouter()
const route = useRoute()

const menus = [
  { label: 'guides', name: 'Guides', cname: '指南' },
  { label: 'components', name: 'Components', cname: '组件' },
  { name: 'Playground', cname: '游乐场', to: 'https://playground.vexipui.com' }
]

const searchMeta = {
  name: 'Search component in Vexip UI',
  cname: '在 Vexip UI 中搜索组件'
}

watchEffect(() => {
  const matchedMenu = menus.find(menu => menu.label && route.path.startsWith(`/${globalState.language}/${menu.label}`))

  placeholder.value = route.meta?.isComponent
    ? getMetaName(globalState.language, route.meta)
    : getMetaName(globalState.language, searchMeta, false)
  currentMenu.value = matchedMenu ? matchedMenu.label! : ''
})

function selectMenu(label: string) {
  if (!route.path.startsWith(`/${globalState.language}/${label}`)) {
    router.push(`/${globalState.language}/${label}`)
  }
}

function toHomepage() {
  router.push(`/${globalState.language}`)
}

function openPage(url: string) {
  window.open(url)
}

function toComponentDoc(fullName: string) {
  if (route.meta?.component !== fullName) {
    router.push(`/${globalState.language}/components/${toKebabCase(fullName.split(' ')[0])}`)
  }

  nextTick(() => {
    currentSearch.value = ''
  })
}

function changeLanguage(language: string) {
  if (language !== globalState.language) {
    router.push(route.path.replace(globalState.language, language))
  }
}
</script>

<style lang="scss">
.header {
  height: 65px;
  border-bottom: var(--vxp-border-light-2);

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
