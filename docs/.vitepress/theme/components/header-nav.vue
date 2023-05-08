<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useData, useRoute, useRouter } from 'vitepress'
import { useI18n } from 'vue-i18n'
import { isExternal } from '../common/utils'

import type { NavMenuItem } from '../types'

const { theme } = useData()
const route = useRoute()
const router = useRouter()

const { t, locale } = useI18n({ useScope: 'global' })

const currentMenu = ref('')

const menus = computed(() => theme.value.nav as NavMenuItem[])

watchEffect(() => {
  const matchedMenu = menus.value.find(menu =>
    route.path.startsWith(`/${locale.value}${menu.activeMatch || menu.link}`)
  )

  currentMenu.value = matchedMenu ? matchedMenu.key : ''
})

function selectMenu(_: string, meta: NavMenuItem) {
  if (!route.path.startsWith(`/${locale.value}${meta.link}`)) {
    router.go(`/${locale.value}${meta.link}`)
  }
}

function openOutsidePage(url?: string) {
  url && window.open(url)
}
</script>

<template>
  <div class="navigation">
    <Menu v-model:active="currentMenu" horizontal @select="selectMenu">
      <template v-for="menu in menus" :key="menu.key">
        <li v-if="isExternal(menu.link)" class="vxp-menu__item vxp-menu__item--no-icon" role="none">
          <div
            class="vxp-menu__label vxp-menu__label--marker-bottom"
            role="menuitem"
            tabindex="0"
            @click="openOutsidePage(menu.link)"
            @keydown.enter.stop="openOutsidePage(menu.link)"
            @keydown.space.stop.prevent="openOutsidePage(menu.link)"
          >
            <span class="vxp-menu__title">{{ t(menu.i18n || menu.key) }}</span>
          </div>
        </li>
        <MenuItem v-else :label="menu.key" :meta="menu">
          {{ t(menu.i18n || menu.key) }}
        </MenuItem>
      </template>
    </Menu>
  </div>
</template>

<style lang="scss">
@use '../style/mixins.scss' as *;

.navigation {
  display: none;
  height: 100%;

  @include query-media('lg') {
    display: block;
  }

  .vxp-menu {
    margin-right: 20px;
    border: 0;
  }

  .vxp-menu__item {
    height: 100% !important;
  }
}
</style>
