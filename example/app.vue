<template>
  <Grid tag="nav" class="dev-nav">
    <Cell :width="18" :use-flex="{ align: 'middle' }">
      <router-link
        v-for="route in router.options.routes"
        :key="route.path"
        class="router-link"
        :to="route.path"
      >
        {{ route.name }}
      </router-link>
    </Cell>
    <Cell :width="6" :use-flex="{ justify: 'end', align: 'middle' }" style="padding-right: 10px;">
      <!-- <Switcher v-model:value="isDark" class="theme-switch" :icon="isDark ? Moon : Sun"></Switcher> -->
      <ThemeSwitch></ThemeSwitch>
    </Cell>
  </Grid>
  <main class="dev-main">
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ThemeSwitch from '../docs/common/theme-switch.vue'

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
}

body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  color: var(--vxp-content-color-base);
  background-color: var(--body-bg-color);
  transition: var(--vxp-transition-background);
}

#app {
  height: 100%;
  padding: 10px 50px 30px;
}

.dev-nav {
  width: 100%;
  height: 50px;
}

.dev-main {
  height: calc(100% - 50px);
  padding: 20px;
  background-color: var(--bg-color);
  border: var(--vxp-border-base);
  border-radius: var(--vxp-border-radius-large);
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
