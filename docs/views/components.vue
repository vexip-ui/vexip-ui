<template>
  <Container ref="wrapper" :class="prefix">
    <template #aside>
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
          @keydown.tab="moveMenuIntoView"
        >
          <MenuGroup
            v-for="group in componentGroups"
            :key="group.name"
            :label="`${t(`group.${group.name}`)} (${group.components.length})`"
          >
            <MenuItem
              v-for="component in group.components"
              :key="component.name"
              :label="toKebabCase(component.name)"
              :data-name="toKebabCase(component.name)"
            >
              {{ t(`components.${component.name}`) }}
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
    </template>
    <main :class="`${prefix}__main`">
      <router-view v-slot="{ Component }">
        <transition name="vxp-fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </main>
    <Footer></Footer>
  </Container>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { toKebabCase } from '@vexip-ui/utils'
import Container from '../common/container.vue'
import Footer from '../common/footer.vue'
import { getComponentConfig } from '../router/components'

import type { Scroll } from 'vexip-ui'
import type { ComponentConfig } from '../router/components'
import type { Store } from '../symbol'

const store = inject<Store>('store')!

const prefix = 'components'

const version = __VERSION__
const minorVersion = version.split('.').slice(0, 2).join('.')

const componentGroups = getComponentConfig()
const currentMenu = ref('')
const wrapper = ref<InstanceType<typeof Container> | null>(null)
const menuScroll = ref<InstanceType<typeof Scroll> | null>(null)

const i18n = useI18n({ useScope: 'global' })
const { t } = i18n
const router = useRouter()
const route = useRoute()

const language = computed(() => i18n.locale.value)

watch(
  () => route.path,
  value => {
    if (value.startsWith(`/${language.value}/components`)) {
      currentMenu.value = value.split('/')[3]
    }

    if (!currentMenu.value) {
      currentMenu.value = toKebabCase(componentGroups[0].components[0].name)
    }
  },
  { immediate: true }
)
watch(currentMenu, scrollToMenuItem)
watch(
  () => store.expanded,
  value => {
    value && setTimeout(() => scrollToMenuItem(currentMenu.value), 200)
  }
)

function selectComponent(label: string) {
  router.push(`/${language.value}/components/${label}`)
}

function scrollToMenuItem(label: string) {
  const scrollEl = menuScroll.value?.$el

  if (!label || !menuScroll.value || !scrollEl) return

  const menuItemEl = scrollEl.querySelector(`.vxp-menu__item[data-name=${label}]`)

  if (!menuItemEl) return

  menuScroll.value.ensureInView(menuItemEl, 500, 10)
  menuItemEl.querySelector('[tabindex="0"]')?.focus()
}

function isNewComponent(config: ComponentConfig) {
  return config.since && config.since.startsWith(minorVersion)
}

function moveMenuIntoView() {
  requestAnimationFrame(() => {
    const scrollEl = menuScroll.value?.$el
    const activeEl = document.activeElement

    if (
      !menuScroll.value ||
      !scrollEl ||
      !activeEl ||
      !activeEl.classList.contains('vxp-menu__label')
    ) {
      return
    }

    if (activeEl.parentElement) {
      menuScroll.value.ensureInView(activeEl.parentElement, 0, 10)
    }
  })
}
</script>

<style lang="scss">
.components {
  &__sider {
    border-right: var(--vxp-border-light-2);
    transition: var(--vxp-transition-border);
  }

  &__menu {
    padding: 20px 0;
    border-right: 0;

    .vxp-menu__title {
      display: flex;
      align-items: center;
    }
  }

  &__tag {
    margin-left: 4px;
    font-size: 10px;
    transform: scale(0.8);
  }

  &__sub-name {
    margin-left: 8px;
    color: var(--vxp-content-color-secondary);
    transition: var(--vxp-transition-color);

    .vxp-menu__label:hover &,
    .vxp-menu__item--selected .vxp-menu__label & {
      color: var(--vxp-menu-label-color-hover);
    }
  }
}
</style>
