<template>
  <nav class="dev-nav">
    <router-link
      v-for="route in router.options.routes"
      :key="route.path"
      class="router-link"
      :to="route.path"
    >
      {{ route.name }}
    </router-link>
  </nav>
  <main class="dev-main">
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
console.log(router)
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
  padding: 10px 50px 30px;
  background-color: var(--vxp-fill-color-background);
}

.dev-nav {
  display: flex;
  align-items: center;
  height: 50px;
}

.dev-main {
  height: calc(100% - 50px);
  padding: 20px;
  background-color: var(--vxp-color-white);
  border: var(--vxp-border-base);
  border-radius: var(--vxp-border-radius-base);
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
