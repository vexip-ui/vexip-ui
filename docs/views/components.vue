<template>
  <Row ref="wrapper" tag="section" :class="prefix">
    <Column tag="aside" :class="`${prefix}__sider`" flex="300px">
      <Scroll
        ref="menuScroll"
        use-y-bar
        height="100%"
        :delta-y="60"
        @ready="scrollToMenuItem(currentMenu)"
      >
        <Menu
          v-model:active="currentMenu"
          marker-type="left"
          :class="`${prefix}__menu`"
          @select="selectComponent"
        >
          <MenuGroup
            v-for="group in componentGroups"
            :key="group.name"
            :label="`${$t(`group.${group.name}`)} (${group.components.length})`"
          >
            <MenuItem
              v-for="component in group.components"
              :key="component.name"
              :label="toKebabCase(component.name)"
              :data-name="toKebabCase(component.name)"
            >
              {{ $t(`components.${component.name}`) }}
              <span v-if="language !== 'en-US'" :class="`${prefix}__sub-name`">
                {{ component.name }}
              </span>
              <Tag
                v-if="isNewComponent(component)"
                :class="`${prefix}__tag`"
                simple
                type="error"
              >
                New
              </Tag>
            </MenuItem>
          </MenuGroup>
        </Menu>
      </Scroll>
    </Column>
    <Column tag="section" :class="`${prefix}__content`" style="flex: 1 1 calc(100% - 300px);">
      <NativeScroll
        ref="scroll"
        appear
        use-y-bar
        height="100%"
        :delta-y="50"
      >
        <main :class="`${prefix}__main`">
          <router-view v-slot="{ Component }">
            <transition name="vxp-fade" mode="out-in">
              <component :is="Component"></component>
            </transition>
          </router-view>
        </main>
        <Footer></Footer>
      </NativeScroll>
      <section id="toc-anchor" class="toc-anchor"></section>
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { toKebabCase } from '@vexip-ui/utils'
import Footer from '../common/footer.vue'
import { getComponentConfig } from '../router/components'

import type { Row, NativeScroll, Scroll } from 'vexip-ui'
import type { ComponentConfig } from '../router/components'

const prefix = 'components'

const version = __VERSION__
const minorVersion = version.split('.').slice(0, 2).join('.')

const componentGroups = getComponentConfig()
const currentMenu = ref('')
const wrapper = ref<InstanceType<typeof Row> | null>(null)
const scroll = ref<InstanceType<typeof NativeScroll> | null>(null)
const menuScroll = ref<InstanceType<typeof Scroll> | null>(null)

const i18n = useI18n({ useScope: 'global' })
const router = useRouter()
const route = useRoute()

const language = computed(() => i18n.locale.value)

provide('refreshScroll', refreshScroll)

watch(
  () => route.path,
  value => {
    if (value.startsWith(`/${language.value}/components`)) {
      currentMenu.value = value.split('/')[3]
    }

    if (!currentMenu.value) {
      currentMenu.value = toKebabCase(componentGroups[0].components[0].name)
    }

    scroll.value?.scrollTo(0, 0, 0)
  },
  { immediate: true }
)
watch(currentMenu, scrollToMenuItem)

function refreshScroll() {
  scroll.value?.refresh()
}

function selectComponent(label: string) {
  router.push(`/${language.value}/components/${label}`)
}

function scrollToMenuItem(label: string) {
  const scrollEl = menuScroll.value?.$el

  if (!label || !scrollEl || !wrapper.value?.$el) return

  const menuItemEl = wrapper.value.$el.querySelector(`.vxp-menu__item[data-name=${label}]`)

  if (!menuItemEl) return

  const scrollRect = scrollEl.getBoundingClientRect()
  const menuItemRect = menuItemEl.getBoundingClientRect()

  if (menuItemRect.y < scrollRect.y || menuItemRect.y >= scrollRect.y + scrollRect.height) {
    menuScroll.value?.scrollToElement(menuItemEl, 500, -10)
  }
}

function isNewComponent(config: ComponentConfig) {
  return config.since && config.since.startsWith(minorVersion)
}
</script>

<style lang="scss">
.components {
  &,
  &__sider,
  &__content {
    position: relative;
    height: 100%;
  }

  &__sider {
    border-right: var(--vxp-border-light-2);
  }

  &__menu {
    padding-top: 20px;
    border-right: 0;
  }

  &__tag {
    font-size: 10px;
    transform: scale(0.8);
  }

  &__sub-name {
    margin-left: 8px;
    color: var(--vxp-content-color-third);
    transition: var(--vxp-transition-color);

    .vxp-menu__label:hover &,
    .vxp-menu__item--selected .vxp-menu__label & {
      color: var(--vxp-menu-label-color-hover);
    }
  }

  .toc-anchor {
    position: absolute;
    top: 40px;
    right: 13.5em;
    width: 12.5em;
    transform: translateX(100%);

    .vxp-anchor {
      width: 100%;
      font-size: 12px;

      &__link {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .vxp-select {
    max-width: 400px;
  }

  .vxp-menu__title {
    display: flex;
    align-items: center;
  }
}
</style>
