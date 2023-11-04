<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useData, useRoute, useRouter } from 'vitepress'
import { isExternal } from '../../shared'

import HeaderNavLink from './header-nav-link.vue'

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
</script>

<template>
  <div class="navigation">
    <Menu v-model:active="currentMenu" horizontal @select="selectMenu">
      <template v-for="menu in menus" :key="menu.key">
        <HeaderNavLink v-if="isExternal(menu.link)" :menu="menu"></HeaderNavLink>

        <MenuItem
          v-else
          :class="{
            'hide-marker': menu.items?.length
          }"
          :label="menu.key"
          :meta="menu"
          :transfer="false"
        >
          {{ menu.text || t(menu.i18n || menu.key) }}

          <template v-if="menu.items?.length" #group>
            <template v-for="child in menu.items" :key="child.key">
              <MenuGroup
                v-if="child.items?.length"
                :label="child.text || t(child.i18n || child.key)"
              >
                <template v-for="son in child.items" :key="son.key">
                  <HeaderNavLink v-if="isExternal(son.link)" :menu="son"></HeaderNavLink>
                  <MenuItem v-else :label="son.key" :meta="son">
                    {{ son.text || t(son.i18n || son.key) }}
                  </MenuItem>
                </template>
              </MenuGroup>

              <HeaderNavLink v-else-if="isExternal(child.link)" :menu="child"></HeaderNavLink>

              <MenuItem v-else :label="child.key" :meta="child">
                {{ child.text || t(child.i18n || child.key) }}
              </MenuItem>
            </template>
          </template>
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
    margin-inline-end: 20px;
    border: 0;

    & > .vxp-menu__item {
      height: 100% !important;

      & > .vxp-menu__label {
        padding: 10px 14px;
      }
    }

    &__popper {
      min-width: 200px;

      .vxp-menu__list {
        width: 100%;
      }

      .vxp-menu__label {
        padding: 6px 16px;
      }
    }

    &__list {
      padding: 12px 0;
    }

    &__item.hide-marker .vxp-menu__label::after {
      display: none;
    }
  }

  .vxp-menu-group__title {
    padding: 4px 14px;
  }
}
</style>
