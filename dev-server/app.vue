<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Gear } from '@vexip-ui/icons'

import TogglePadding from './toggle-padding.vue'
import DirectionSwitch from '../docs/.vitepress/theme/components/direction-switch.vue'
import ThemeSwitch from '../docs/.vitepress/theme/components/theme-switch.vue'

const router = useRouter()
const panelShow = ref(false)
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component"></component>
  </RouterView>
  <button
    :class="['dev-setting', panelShow && 'dev-setting--active']"
    type="button"
    tabindex="-1"
    @click="panelShow = !panelShow"
  >
    <Gear></Gear>
  </button>
  <Transition name="vxp-fade">
    <div v-show="panelShow" class="dev-panel">
      <div class="dev-panel__container">
        <div class="dev-links">
          <template v-for="route in router.options.routes">
            <RouterLink
              v-if="route.name"
              :key="route.path"
              class="router-link"
              :to="route.path"
              @click="panelShow = false"
            >
              {{ route.name }}
            </RouterLink>
          </template>
        </div>
        <div class="dev-actions">
          <TogglePadding></TogglePadding>
          <DirectionSwitch></DirectionSwitch>
          <ThemeSwitch></ThemeSwitch>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  --bg-color: #fff;

  height: 100%;

  &.dark {
    --bg-color: #131719;
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
  background-color: var(--bg-color);
  transition: var(--vxp-transition-background);
}

#app {
  height: 100%;
  overflow: auto;
}

.padding #app {
  padding: 20px;
}

.dev-setting {
  position: absolute;
  inset-inline-end: 20px;
  bottom: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  color: var(--vxp-content-color-base);
  cursor: pointer;
  background-color: var(--vxp-fill-color-background);
  border: 0;
  border-radius: 50%;
  outline: 0;
  box-shadow: var(--vxp-shadow-base);
  transition: var(--vxp-transition-color);

  &--active {
    color: var(--vxp-color-primary-base);
  }

  svg {
    width: 1.3em;
    height: 1.3em;
    line-height: 1;
    vertical-align: -0.125em;
    fill: currentcolor;
  }
}

.dev-panel {
  position: absolute;
  inset-inline-end: 20px;
  bottom: 70px;
  z-index: 9999;
  padding: 4px 0;
  overflow: hidden;
  background-color: var(--vxp-fill-color-background);
  border-radius: var(--vxp-radius-base);

  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: calc(100vh - 128px);
    padding: 20px;
    overflow: hidden auto;
    scrollbar-width: thin;
    scrollbar-color: var(--vxp-color-primary-opacity-8) transparent;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--vxp-color-primary-opacity-8);
      border-radius: 4px;
    }
  }
}

.dev-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 180px;

  .router-link {
    padding: 7px 10px 8px;
    line-height: 1;
    color: var(--vxp-color-primary-base);
    text-decoration: none;
    background-color: var(--vxp-bg-color-base);
    border: 1px solid var(--vxp-color-primary-opacity-6);
    border-radius: var(--vxp-radius-base);
    transition: var(--vxp-transition-background);

    &:hover {
      background-color: var(--vxp-color-primary-opacity-9);
    }

    &-active,
    &-active:hover {
      background-color: var(--vxp-color-primary-opacity-8);
    }
  }
}

.dev-actions {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
