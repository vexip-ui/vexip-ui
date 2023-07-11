<template>
  <nav class="dev-nav">
    <div class="dev-nav__left">
      <router-link
        v-for="route in router.options.routes"
        :key="route.path"
        class="router-link"
        :to="route.path"
      >
        {{ route.name }}
      </router-link>
    </div>
    <span role="none" style="flex: auto"></span>
    <div class="dev-nav__right">
      <DirectionSwitch style="margin-inline-end: 20px"></DirectionSwitch>
      <ThemeSwitch></ThemeSwitch>
    </div>
  </nav>
  <main class="dev-main">
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import DirectionSwitch from '../docs/.vitepress/theme/components/direction-switch.vue'
import ThemeSwitch from '../docs/.vitepress/theme/components/theme-switch.vue'

const router = useRouter()
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  --bg-color: #fff;
  --body-bg-color: var(--vxp-fill-color-background);
  --ghost-bg-color: #234;
  --ghost-padding: 10px;

  height: 100%;

  &.dark {
    --bg-color: #131719;
    --body-bg-color: #1b1b1b;
    --ghost-bg-color: transparent;
    --ghost-padding: 0;
  }

  &.rtl {
    direction: rtl;
  }
}

body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  font-family: var(--vxp-font-family-base);
  font-size: var(--vxp-font-size-base);
  font-variant-numeric: tabular-nums;
  line-height: var(--vxp-line-height-base);
  color: var(--vxp-content-color-base);
  background-color: var(--body-bg-color);
  transition: var(--vxp-transition-background);
}

#app {
  height: 100%;
  padding: 10px 50px 30px;
}

.dev-nav {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;

  &__section {
    display: flex;
  }
}

.dev-main {
  position: relative;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background-color: var(--bg-color);
  border: var(--vxp-border-base);
  border-radius: var(--vxp-radius-large);
  transition: var(--vxp-transition-background), var(--vxp-transition-border);
}

.router-link {
  padding: 10px;
  color: var(--vxp-color-primary-light-3);
  text-decoration: none;
  transition: var(--vxp-transition-color);

  &:hover {
    color: var(--vxp-color-primary-base);
  }

  &-active,
  &-active:hover {
    color: var(--vxp-color-warning-base);
  }
}
</style>
