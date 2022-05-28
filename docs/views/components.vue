<template>
  <Row ref="wrapper" tag="section" :class="prefix">
    <Column tag="aside" :class="`${prefix}__sider`" :span="4">
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
          <MenuGroup v-for="group in componentGroups" :key="group.name" :label="group.cname">
            <MenuItem
              v-for="component in group.components"
              :key="component.name"
              :label="toKebabCase(component.name)"
              :data-name="toKebabCase(component.name)"
            >
              {{ `${component.name} ${component.cname}` }}
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
    <Column tag="section" :class="`${prefix}__content`" :span="20">
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
import { ref, watch, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { version, Row, Scroll } from 'vexip-ui'
import { toKebabCase } from '@vexip-ui/utils'
import Footer from '../common/footer.vue'
import { getComponentConfig } from '../router/components'

import type { ComponentConfig } from '../router/components'

const prefix = 'components'

const minorVersion = version.split('.').slice(0, 2).join('.')

const componentGroups = getComponentConfig()
const currentMenu = ref('')
const wrapper = ref<InstanceType<typeof Row> | null>(null)
const scroll = ref<InstanceType<typeof Scroll> | null>(null)
const menuScroll = ref<InstanceType<typeof Scroll> | null>(null)

const router = useRouter()
const route = useRoute()

provide('refreshScroll', refreshScroll)

watch(
  () => route.path,
  value => {
    if (value.startsWith('/components')) {
      currentMenu.value = value.split('/')[2]
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
  router.push(`/components/${label}`)
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
