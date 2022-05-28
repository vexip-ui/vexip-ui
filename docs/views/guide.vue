<template>
  <Row tag="section" :class="prefix">
    <Column tag="aside" :class="`${prefix}__sider`" :span="4">
      <Scroll use-y-bar height="100%" :delta-y="60">
        <Menu
          v-model:active="currentMenu"
          marker-type="left"
          :class="`${prefix}__menu`"
          @select="selectGuide"
        >
          <MenuItem v-for="menu in menus" :key="menu.label" :label="menu.label">
            {{ menu.cname }}
          </MenuItem>
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
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Footer from '../common/footer.vue'
import { getGuideConfig } from '../router/guide'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { Scroll } from 'vexip-ui'

const prefix = 'guide'

const currentMenu = ref('')
const menus = getGuideConfig()

const scroll = ref<InstanceType<typeof Scroll> | null>(null)

const router = useRouter()
const route = useRoute()

watch(
  () => route.path,
  value => {
    if (value.startsWith('/guide')) {
      currentMenu.value = value.split('/')[2]
    }

    if (!currentMenu.value) {
      currentMenu.value = menus[0].label
    }

    scroll.value?.scrollTo(0, 0)
  },
  { immediate: true }
)

function selectGuide(label: string) {
  router.push(`/guide/${label}`)
}
</script>
