<template>
  <header class="header">
    <Row style="height: 100%;">
      <Column :span="4" style="padding-left: 40px;">
        <a class="index" @click="toHomepage">
          <img class="index__logo" src="../assets/logo.png" alt="logo.pne" />
          <span class="index__title"> Vexip UI </span>
          <Tag class="index__version">
            {{ `v${version}` }}
          </Tag>
        </a>
      </Column>
      <Column class="navigation" :span="20">
        <div class="search">
          <AutoComplete
            v-model:value="currentSearch"
            filter
            ignore-case
            transfer
            class="search-input"
            style="width: 400px;"
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
                <span class="vxp-menu__title">{{ menu.name }}</span>
              </div>
            </li>
            <MenuItem v-else :label="menu.label">
              {{ menu.name }}
            </MenuItem>
          </template>
        </Menu>
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
import { ref, watchEffect, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { version } from 'vexip-ui'
import { MagnifyingGlass, GithubB } from '@vexip-ui/icons'
import { toKebabCase } from '@vexip-ui/utils'
import ThemeSwitch from './theme-switch.vue'
import { getComponentConfig } from '../router/components'

const searchOptions: string[] = []

getComponentConfig().forEach(group => {
  searchOptions.push(...group.components.map(({ name, cname }) => `${name} ${cname}`))
})

const currentMenu = ref('')
const placeholder = ref('')
const currentSearch = ref('')

const router = useRouter()
const route = useRoute()

const menus = [
  { label: 'guide', name: '指南' },
  { label: 'components', name: '组件' },
  { name: '游乐场', to: 'https://playground.vexipui.com' }
]

watchEffect(() => {
  const matchedMenu = menus.find(menu => menu.label && route.path.startsWith(`/${menu.label}`))

  placeholder.value = route.meta?.component
    ? (route.meta.component as string)
    : '在 Vexip UI 中搜索组件'
  currentMenu.value = matchedMenu ? matchedMenu.label! : ''
})

function selectMenu(label: string) {
  if (!route.path.startsWith(`/${label}`)) {
    router.push(`/${label}`)
  }
}

function toHomepage() {
  router.push('/')
}

function openPage(url: string) {
  window.open(url)
}

function toComponentDoc(fullName: string) {
  if (route.meta?.component !== fullName) {
    router.push(`/components/${toKebabCase(fullName.split(' ')[0])}`)
  }

  nextTick(() => {
    currentSearch.value = ''
  })
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
      margin: 4px 0 0 6px;
      transform: scale(0.8);
    }
  }

  .search-input {
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
    margin-right: 40px !important;

    &,
    .vxp-icon {
      color: var(--vxp-content-color-base);
    }

    &:hover {
      &,
      .vxp-icon {
        color: var(--vxp-content-color-base);
      }
    }
  }
}
</style>
