<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useI18n } from 'vue-i18n'

import { useData, useRoute, useRouter } from 'vitepress'
import { flatTree, toKebabCase } from '@vexip-ui/utils'
import { ensureStartingSlash } from '../../shared'

import type { AsideMenuItem } from '../types'

const emit = defineEmits(['menu-select'])

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
  const path = ensureStartingSlash(page.value.relativePath)

  for (const key of Object.keys(config)) {
    if (path.startsWith(`/${locale.value}${key}`)) {
      return config[key]
    }
  }

  return []
})
const flattedMenus = computed(() => {
  return flatTree(menus.value, {
    keyField: 'key',
    childField: 'items',
    parentField: '' as any
  }).filter(menu => !menu.items?.length && menu.link)
})
const hasGroup = computed(() => !!menus.value.find(menu => menu.items?.length))

watch(
  () => route.path,
  value => {
    const activeMenu = flattedMenus.value.find(menu =>
      value.startsWith(`/${locale.value}${menu.link}`)
    )

    if (activeMenu) {
      currentMenu.value = activeMenu.key
    }
  },
  { immediate: true }
)

function selectMenu(label: string, meta: AsideMenuItem) {
  if (!route.path.startsWith(`/${locale.value}${meta.link}`)) {
    router.go(`/${locale.value}${meta.link}`)
  }

  emit('menu-select', label, meta)
}
</script>

<template>
  <Menu
    v-model:active="currentMenu"
    marker-type="left"
    class="aside-menu"
    :style="{ marginTop: hasGroup ? undefined : '40px' }"
    @select="selectMenu"
  >
    <template v-for="menu in menus" :key="menu.key">
      <MenuGroup
        v-if="menu.items?.length"
        :label="`${menu.text || t(menu.i18n || menu.key)}${
          menu.count ? ` (${menu.items.length})` : ''
        }`"
      >
        <MenuItem
          v-for="child in menu.items"
          :key="child.key"
          :label="child.key"
          :data-name="toKebabCase(child.key)"
          :meta="child"
        >
          {{ child.text || t(child.i18n || child.key) }}
          <span v-if="child.origin && locale !== 'en-US'" class="aside-menu__sub-name">
            {{ child.origin }}
          </span>
          <Tag
            v-if="child.tag"
            class="aside-menu__tag"
            simple
            type="error"
          >
            {{ child.tag }}
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
        {{ menu.text || t(menu.i18n || menu.key) }}
        <span v-if="menu.origin && locale !== 'en-US'" class="aside-menu__sub-name">
          {{ menu.origin }}
        </span>
        <Tag
          v-if="menu.tag"
          class="aside-menu__tag"
          simple
          type="error"
        >
          {{ menu.tag }}
        </Tag>
      </MenuItem>
    </template>
  </Menu>
</template>

<style lang="scss">
.aside-menu {
  padding-bottom: 16px;

  &__tag {
    margin-left: 4px;
    font-size: 10px;
    transform: scale(0.8);
  }

  &__sub-name {
    margin-left: 8px;
    color: var(--vxp-content-color-secondary);
    transition: var(--vxp-transition-color);

    .vxp-menu__label:hover & {
      color: var(--vxp-content-color-secondary);
    }

    .vxp-menu__item--selected .vxp-menu__label & {
      color: var(--vxp-color-primary-opacity-3);
    }
  }

  .vxp-menu {
    &__title {
      display: flex;
      align-items: center;
    }
  }
}
</style>
