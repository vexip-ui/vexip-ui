<template>
  <section :class="[prefix, affixed && `${prefix}--affix`]">
    <aside v-if="store.isLg" :class="`${prefix}__aside`">
      <slot name="aside"></slot>
    </aside>
    <Masker v-else v-model:active="store.expanded" closable>
      <aside :class="[`${prefix}__aside`, store.expanded && `${prefix}__aside--expanded`]">
        <slot name="aside"></slot>
      </aside>
    </Masker>
    <main :class="`${prefix}__main`">
      <NativeScroll
        ref="scroll"
        appear
        use-y-bar
        :class="`${prefix}__scroll`"
        height="100%"
        scroll-class="page-view"
        @scroll="handleScroll"
      >
        <slot></slot>
      </NativeScroll>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref, toRef, watch, onMounted, provide, inject } from 'vue'
import { nextFrameOnce } from '@vexip-ui/utils'
import { useRoute } from 'vue-router'

import type { NativeScroll } from 'vexip-ui'
import type { Store } from '../symbol'

defineProps({
  menuExpanded: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:menu-expanded'])

const prefix = 'container'
const store = inject<Store>('store')!
const scroll = ref<InstanceType<typeof NativeScroll>>()
const affixed = toRef(store, 'affixed')
const route = useRoute()

let refreshed = false

watch(
  () => route.path,
  () => {
    refreshed = false
  }
)

onMounted(() => {
  requestAnimationFrame(() => setScrollY())
})

function handleScroll({ clientY }: { clientY: number }) {
  store.scrollY = clientY
  affixed.value = !store.isLg && clientY >= 50
}

provide('refreshScroll', refreshScroll)
provide('scrollToElement', scrollToElement)

function refreshScroll(animate = false) {
  requestAnimationFrame(() => {
    if (!scroll.value) return

    scroll.value.refresh()

    if (!refreshed) {
      refreshed = true
      nextFrameOnce(() => setScrollY(animate))
    }
  })
}

function setScrollY(animate = false) {
  if (scroll.value) {
    scroll.value.scrollTo(0, store.affixed ? 65 : 0, animate ? undefined : 0)
    store.scrollY = store.affixed ? 65 : 0
  }
}

function scrollToElement(element: Element) {
  if (scroll.value) {
    scroll.value.scrollToElement(element, 500, store.affixed ? 0 : -75)
  }
}
</script>

<style lang="scss">
@use '../style/mixins.scss' as *;

.container {
  position: relative;
  height: 100%;

  &__aside {
    @include fixed;

    z-index: calc(var(--vxp-z-index-masker) + 100);
    width: var(--aside-width);
    background-color: var(--bg-color);
    border-right: var(--vxp-border-light-2);
    transition: var(--vxp-transition-border), var(--vxp-transition-transform);
    transform: translateX(-100%);

    &--expanded {
      transform: translateX(0);
    }

    @include query-media('lg') {
      top: var(--header-height);
      z-index: 0;
      transform: translateX(0);
    }

    @include query-media('xl') {
      width: var(--aside-width-large);
    }

    .vxp-menu-group__title {
      padding: 10px 20px;
      color: var(--vxp-content-color-third);
    }
  }

  &__main {
    width: 100%;
    height: 100%;

    @include query-media('lg') {
      padding-left: var(--aside-width);
    }

    @include query-media('xl') {
      padding-left: var(--aside-width-large);
    }
  }

  &__scroll {
    & > .vxp-scrollbar--right {
      top: calc(var(--header-height) + var(--sub-menu-height));

      @include query-media('lg') {
        top: var(--header-height);
      }
    }
  }

  .page-view {
    padding-top: calc(var(--header-height) + var(--sub-menu-height));

    @include query-media('lg') {
      padding-top: var(--header-height);
    }
  }
}
</style>
