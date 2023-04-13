<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { MagnifyingGlass, GithubB, Language, Bars } from '@vexip-ui/icons'
import { toKebabCase } from '@vexip-ui/utils'
import { useData, useRoute, useRouter } from 'vitepress'
import { useI18n } from 'vue-i18n'
import ThemeSwitch from './components/theme-switch.vue'
import Article from './components/article.vue'
import Homepage from './components/homepage.vue'

import type { I18nConfig } from '../../i18n'

const { theme, page, frontmatter } = useData()

const router = useRouter()
const route = useRoute()

const i18n = useI18n({ useScope: 'global' })
const { t } = i18n

const language = computed(() => i18n.locale.value as string)
const asideMenus = computed(() => {
  if (page.value.frontmatter.aside === false) {
    return []
  }

  const config = theme.value.asideMenus
  let path = route.data.relativePath
  path = /^\//.test(path) ? path : `/${path}`

  for (const key of Object.keys(config)) {
    if (path.startsWith(`/${language.value}${key}`)) {
      return config[key]
    }
  }

  return []
})
const headerMenus = computed(() => theme.value.nav)
const outline = computed(() => {
  if (page.value.frontmatter.aside === false) {
    return []
  }

  const config = theme.value.outline
  let path = route.data.relativePath
  path = /^\//.test(path) ? path : `/${path}`

  for (const key of Object.keys(config)) {
    if (path.startsWith(`/${language.value}${key}`)) {
      return config[key]
    }
  }

  return undefined
})

// import { getComponentConfig } from '../../router/components'

// import type { EventEmitter } from '@vexip-ui/utils'

// import type { Store } from '../../symbol'

// const emit = defineEmits(['toggle-menu'])

// const store = inject<Store>('store')!
// const emitter = inject<EventEmitter>('emitter')!
// const affixed = toRef(store, 'affixed')
// const affixed = ref(false)

// emitter.on('toggle-affix', (affix: boolean) => {
//   affixed.value = affix
// })

const version = __VERSION__

const searchOptions = ref<string[]>([])
const currentMenu = ref('')
const placeholder = ref('')
const currentSearch = ref('')

const langOptions = computed(() => {
  return i18n.availableLocales.map(lang => {
    const config = i18n.getLocaleMessage(lang as string) as I18nConfig

    return {
      lang: lang as string,
      name: config.common.language || lang
    }
  })
})

// watchEffect(() => {
//   const options: string[] = []

//   getComponentConfig().forEach(group => {
//     options.push(...group.components.map(({ name }) => formatComponentName(name)))
//   })

//   searchOptions.value = options
// })

// watchEffect(() => {
//   const matchedMenu = menus.find(
//     menu => menu.label && route.path.startsWith(`/${language.value}/${menu.label}`)
//   )

//   placeholder.value = route.meta?.isComponent
//     ? formatComponentName(route.meta.name as string)
//     : i18n.t('common.searchComponent')
//   currentMenu.value = matchedMenu ? matchedMenu.label! : ''
// })

// watch(
//   () => route.path,
//   () => emit('toggle-menu', false)
// )

function selectHeaderMenu(label: string, meta: any) {
  if (!route.path.startsWith(`/${language.value}${meta.link}`)) {
    router.go(`/${language.value}${meta.link}`)
  }
}

function selectAsideMenu(label: string, meta: any) {
  if (!route.path.startsWith(`/${language.value}${meta.link}`)) {
    router.go(`/${language.value}${meta.link}`)
  }
}

function toHomepage() {
  router.go(`/${language.value}`)
}

function openPage(url?: string) {
  url && window.open(url)
}

function toComponentDoc(fullName: string) {
  if (!route.path.startsWith(`/${language.value}/component/${fullName}`)) {
    router.go(`/${language.value}/component/${toKebabCase(fullName.split(' ').at(-1)!)}`)
  }

  nextTick(() => {
    currentSearch.value = ''
  })
}

function changeLanguage(lang: string) {
  if (lang !== language.value) {
    router.go(route.path.replace(language.value, lang))
  }
}

// function formatComponentName(name: string) {
//   return i18n.t(`components.${name}`) + (language.value !== 'en-US' ? ` ${name}` : '')
// }
</script>

<template>
  <Layout
    sign-type="header"
    :no-aside="frontmatter.homepage"
    :style="{
      height: '100vh',
      '--vxp-layout-aside-width': 'var(--aside-width-large)',
      '--vxp-layout-header-height': 'var(--header-height)'
    }"
  >
    <template #sign>
      <a class="index" @click="toHomepage">
        <img class="index__logo" src="/vexip-ui.svg" alt="vexip-ui" />
        <span class="index__title"> Vexip UI </span>
        <Tag class="index__version">
          {{ `v${version}` }}
        </Tag>
      </a>
    </template>
    <template #header-main>
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
    </template>
    <template #header-right>
      <div class="navigation">
        <Menu v-model:active="currentMenu" horizontal @select="selectHeaderMenu">
          <template v-for="menu in headerMenus" :key="menu.key">
            <li v-if="menu.to" class="vxp-menu__item vxp-menu__item--no-icon" role="none">
              <div
                class="vxp-menu__label vxp-menu__label--marker-bottom"
                role="menuitem"
                tabindex="0"
                @click="openPage(menu.to)"
                @keydown.enter.stop="openPage(menu.to)"
                @keydown.space.stop.prevent="openPage(menu.to)"
              >
                <span class="vxp-menu__title">{{ t(menu.i18n) }}</span>
              </div>
            </li>
            <MenuItem v-else :label="menu.key" :meta="menu">
              {{ t(menu.i18n) }}
            </MenuItem>
          </template>
        </Menu>
      </div>
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
      <Linker class="github-link" to="//github.com/vexip-ui/vexip-ui/">
        <Icon label="github" :scale="1.6">
          <GithubB></GithubB>
        </Icon>
      </Linker>
    </template>
    <template #header-user>
      <span></span>
    </template>
    <template #aside-main>
      <Menu
        v-model:active="currentMenu"
        marker-type="left"
        class="aside-menu"
        @select="selectAsideMenu"
      >
        <template v-for="menu in asideMenus" :key="menu.key">
          <MenuGroup
            v-if="menu.items?.length"
            :label="`${t(menu.i18n)}${menu.count ? ` (${menu.items.length})` : ''}`"
          >
            <MenuItem
              v-for="child in menu.items"
              :key="child.key"
              :label="toKebabCase(child.key)"
              :data-name="toKebabCase(child.key)"
              :meta="child"
            >
              {{ t(child.i18n) }}
              <span v-if="child.orgin && language !== 'en-US'" class="aside-menu__sub-name">
                {{ child.orgin }}
              </span>
              <Tag
                v-if="child.since"
                class="aside-menu__tag"
                simple
                type="error"
              >
                {{ child.since }}
              </Tag>
            </MenuItem>
          </MenuGroup>
          <MenuItem
            v-else
            :key="menu.key"
            :label="toKebabCase(menu.key)"
            :data-name="toKebabCase(menu.key)"
            :meta="menu"
          >
            {{ t(menu.i18n) }}
            <span v-if="menu.orgin && language !== 'en-US'" class="aside-menu__sub-name">
              {{ menu.name }}
            </span>
            <Tag
              v-if="menu.since"
              class="aside-menu__tag"
              simple
              type="error"
            >
              {{ menu.since }}
            </Tag>
          </MenuItem>
        </template>
      </Menu>
    </template>
    <template #aside-bottom>
      <span></span>
    </template>
    <Homepage v-if="frontmatter.homepage"></Homepage>
    <Article v-else :anchor-level="outline">
      <Content class="markdown"></Content>
    </Article>
  </Layout>
</template>

<style lang="scss">
@use '../style/mixins.scss' as *;

.vxp-layout__header {
  // // position: fixed;
  // // top: 0;
  // z-index: 100;
  // display: flex;
  // align-items: center;
  // width: 100%;
  // height: var(--header-height);
  // background-color: var(--bg-color);
  // border-bottom: var(--vxp-border-light-2);
  // transition: var(--vxp-transition-border), var(--vxp-transition-transform);

  z-index: 3000;
  padding: 0;

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
    font-family: Avenir, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
      Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;

    @include query-media('lg') {
      justify-content: center;
      width: var(--aside-width);
      padding: 0;
    }

    @include query-media('xl') {
      width: var(--aside-width-large);
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
