<template>
  <section :class="[prefix, isAffix && `${prefix}--affix`]">
    <aside :class="[`${prefix}__aside`, menuExpanded && `${prefix}__aside--expanded`]">
      <slot name="aside"></slot>
    </aside>
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
    <section id="toc-anchor" class="toc-anchor"></section>
  </section>
</template>

<script setup lang="ts">
import { ref, toRef, watch, onMounted, provide, inject } from 'vue'
import { useRoute } from 'vue-router'
import { nextFrameOnce } from '@vexip-ui/utils'

import type { NativeScroll } from 'vexip-ui'
import type { Store } from '../symbol'

defineProps({
  menuExpanded: {
    type: Boolean,
    default: false
  }
})

const prefix = 'container'
const store = inject<Store>('store')!
const scroll = ref<InstanceType<typeof NativeScroll> | null>(null)
const isAffix = toRef(store, 'isAffix')
const route = useRoute()

let refreshed = false

watch(
  () => route.path,
  () => {
    refreshed = false
  }
)

onMounted(() => {
  requestAnimationFrame(setScrollY)
})

function handleScroll({ clientY }: { clientY: number }) {
  store.scrollY = clientY
  isAffix.value = !store.isLg && clientY >= 50
}

provide('refreshScroll', refreshScroll)

function refreshScroll() {
  if (!scroll.value) return

  scroll.value.refresh()

  if (!refreshed) {
    refreshed = true
    nextFrameOnce(setScrollY)
  }
}

function setScrollY() {
  if (scroll.value) {
    scroll.value.currentScroll.y = store.isAffix ? 65 : 0
    store.scrollY = store.isAffix ? 65 : 0
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

    z-index: calc(var(--vxp-z-index-popper) + 100);
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

  .toc-anchor {
    position: absolute;
    top: calc(var(--header-height) + var(--sub-menu-height) + 40px);
    right: 10px;
    display: none;
    width: var(--anchor-width);

    @include query-media('lg') {
      top: calc(var(--header-height) + 40px);
    }

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

    @include query-media('xl') {
      display: block;
    }
  }
}
</style>
