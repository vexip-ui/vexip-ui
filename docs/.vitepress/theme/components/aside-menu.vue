<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useData, useRoute, useRouter } from 'vitepress'
import { useI18n } from 'vue-i18n'
import { toKebabCase, flatTree } from '@vexip-ui/utils'
import { ensureStartingSlash } from '../common/utils'

import type { AsideMenuItem } from '../types'

const { theme, page } = useData()

const router = useRouter()
const route = useRoute()

const { t, locale } = useI18n({ useScope: 'global' })

const currentMenu = ref('')

const menus = computed<AsideMenuItem[]>(() => {
  if (page.value.frontmatter.aside === false) {
    return []
  }

  const config = theme.value.asideMenus
  const path = ensureStartingSlash(route.data.relativePath)

  for (const key of Object.keys(config)) {
    if (path.startsWith(`/${locale.value}${key}`)) {
      return config[key]
    }
  }

  return []
})
const flattedMenus = computed(() => {
  return flatTree(menus.value, { keyField: 'key', childField: 'items' }).filter(
    menu => !menu.items?.length && menu.link
  )
})

watch(
  () => route.path,
  value => {
    const activeMenu = flattedMenus.value.find(menu =>
      value.startsWith(`/${locale.value}${menu.link}`)
    )

    if (activeMenu) {
      currentMenu.value = activeMenu.key
    }

    // if (!currentMenu.value) {
    //   currentMenu.value = toKebabCase(componentGroups[0].components[0].name)
    // }
  },
  { immediate: true }
)

function selectMenu(_: string, meta: AsideMenuItem) {
  if (!route.path.startsWith(`/${locale.value}${meta.link}`)) {
    router.go(`/${locale.value}${meta.link}`)
  }
}
</script>

<template>
  <Menu
    v-model:active="currentMenu"
    marker-type="left"
    class="aside-menu"
    @select="selectMenu"
  >
    <template v-for="menu in menus" :key="menu.key">
      <MenuGroup
        v-if="menu.items?.length"
        :label="`${t(menu.i18n || menu.key)}${menu.count ? ` (${menu.items.length})` : ''}`"
      >
        <MenuItem
          v-for="child in menu.items"
          :key="child.key"
          :label="child.key"
          :data-name="toKebabCase(child.key)"
          :meta="child"
        >
          {{ t(child.i18n || child.key) }}
          <span v-if="child.origin && locale !== 'en-US'" class="aside-menu__sub-name">
            {{ child.origin }}
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
        :label="menu.key"
        :data-name="toKebabCase(menu.key)"
        :meta="menu"
      >
        {{ t(menu.i18n || menu.key) }}
        <span v-if="menu.origin && locale !== 'en-US'" class="aside-menu__sub-name">
          {{ menu.origin }}
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
