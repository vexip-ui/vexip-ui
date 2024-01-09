<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useData, useRoute, useRouter } from 'vitepress'
import { useBEM } from '@vexip-ui/bem-helper'
import { flatTree, toKebabCase } from '@vexip-ui/utils'
import { ensureStartingSlash, matchPath } from '../../shared'

import type { AsideMenuItem } from '../types'

const emit = defineEmits(['menu-select'])

const { theme, page } = useData()

const router = useRouter()
const route = useRoute()

const { t, locale } = useI18n({ useScope: 'global' })

const nh = useBEM('aside-menu')
const currentMenu = ref('')

const menus = computed<AsideMenuItem[]>(() => {
  if (page.value.frontmatter.aside === false) {
    return []
  }

  const config = theme.value.asideMenus
  const path = ensureStartingSlash(page.value.relativePath)

  for (const key of Object.keys(config)) {
    if (matchPath(path, `/${locale.value}${key}`)) {
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
      matchPath(value, `/${locale.value}${menu.link}`)
    )

    if (activeMenu) {
      currentMenu.value = activeMenu.key
    }
  },
  { immediate: true }
)

function selectMenu(label: string, meta: AsideMenuItem) {
  if (!matchPath(route.path, `/${locale.value}${meta.link}`)) {
    router.go(`/${locale.value}${meta.link}`)
  }

  emit('menu-select', label, meta)
}
</script>

<template>
  <Menu
    :active="currentMenu"
    marker-type="left"
    :class="nh.b()"
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
          <span
            v-if="!child.noSub?.includes(locale as string) && (child.subtext || child.subI18n)"
            :class="nh.be('sub-name')"
          >
            {{ child.subtext || t(child.subI18n!) }}
          </span>
          <div v-if="child.tags?.length" :class="nh.be('tags')">
            <Tag
              v-for="(tag, index) in child.tags"
              :key="index"
              :class="nh.be('tag')"
              simple
              :type="tag.type"
            >
              {{ tag.text }}
            </Tag>
          </div>
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
        <span
          v-if="!menu.noSub?.includes(locale as string) && (menu.subtext || menu.subI18n)"
          :class="nh.be('sub-name')"
        >
          {{ menu.subtext || t(menu.subI18n!) }}
        </span>
        <div v-if="menu.tags?.length" :class="nh.be('tags')">
          <Tag
            v-for="(tag, index) in menu.tags"
            :key="index"
            :class="nh.be('tag')"
            simple
            :type="tag.type"
          >
            {{ tag.text }}
          </Tag>
        </div>
      </MenuItem>
    </template>
  </Menu>
</template>

<style lang="scss">
.aside-menu {
  padding-bottom: 126px;

  &__tags {
    display: flex;
    margin-inline-start: 4px;
    transform: translateX(-10%) scale(0.8);
  }

  &__tag {
    margin-inline-start: 4px;
    font-size: 10px;
  }

  &__sub-name {
    margin-inline-start: 8px;
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
