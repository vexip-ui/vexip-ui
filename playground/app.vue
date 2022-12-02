<template>
  <Header
    :store="store"
    :ssr="ssrMode"
    :versions="versions"
    @toggle-ssr="toggleSSR"
  ></Header>
  <Repl
    show-compile-output
    auto-resize
    :clear-console="false"
    :store="store"
    :ssr="ssrMode"
    :sfc-options="sfcOptions"
  ></Repl>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { Repl } from '@vue/repl'
import Header from './components/header.vue'
import { ReplStore } from './store'

const ssrMode = ref(false)

let hash = location.hash.slice(1)

if (hash.startsWith('__SSR__')) {
  hash = hash.slice(7)
  ssrMode.value = true
}

const versions = getSearch()
const store = new ReplStore({ serializedState: hash, versions })

// enable experimental features
const sfcOptions = {
  script: {
    // refTransform: true,
    reactivityTransform: true
  }
}

// persist state
watchEffect(() => {
  const newHash = store.serialize().replace(/^#/, ssrMode.value ? '#__SSR__' : '#')

  history.replaceState({}, '', newHash)
})

function toggleSSR() {
  ssrMode.value = !ssrMode.value
  store.setFiles(store.getFiles())
}

function getSearch() {
  if (location.search) {
    const units = location.search.substring(1).split('&')

    return units.reduce((prev, current) => {
      if (current) {
        const [key, value] = current.split('=')
        prev[key] = value
      }

      return prev
    }, {} as Record<string, string>)
  }

  return {}
}
</script>

<style lang="scss">
@use 'sass:map';
@use './style.scss' as *;

body {
  --nav-height: 50px;

  margin: 0;
  font-family: var(--vxp-font-family-base);
  font-size: 13px;
}

.vue-repl {
  height: calc(100vh - var(--nav-height));
}

.vue-repl,
.file-selector,
.tab-buttons,
.iframe-container {
  transition: var(--vxp-transition-background), var(--vxp-transition-border);
}

.import-map-wrapper {
  background-color: transparent !important;
  background-image: none !important;
}

/* stylelint-disable-next-line selector-class-pattern */
.CodeMirror-gutters,
.split-pane .left {
  transition: var(--vxp-transition-border);
}

.iframe-container {
  background-color: var(--vxp-bg-color-base) !important;
}

.split-pane {
  $lg: (
    max-width: map.get(map.get($break-point-map, 'lg'), 'min-width') - 0.02px
  );

  @include query-media('lg') {
    .left,
    .right {
      width: 50%;
    }
  }

  @media #{inspect($lg)} {
    .left,
    .right {
      width: 100% !important;
      height: 100% !important;
    }

    .right {
      display: none;
    }

    .toggler {
      display: block !important;
    }

    &.show-output {
      .left {
        display: none;
      }

      .right {
        display: block;
      }
    }
  }
}
</style>
