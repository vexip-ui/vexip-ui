<template>
  <template v-if="!loading">
    <Header :store="store" :versions="versions"></Header>
    <Repl
      show-compile-output
      auto-resize
      :clear-console="false"
      :store="store"
      :sfc-options="sfcOptions"
      :editor="Monaco"
      :theme="dark ? 'dark' : 'light'"
      @keydown="handleKeyDown"
    ></Repl>
  </template>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { Repl } from '@vue/repl'

import Monaco from '@vue/repl/monaco-editor'
import Header from './header.vue'
import { useReplStore } from './store'
import { prettierCode } from './format'

const versions = parseVersions()
const hash = location.hash.slice(1)
const loading = ref(true)

const store = useReplStore({
  serializedState: hash,
  versions,
})

const dark = computed(() => store.dark.value)

// enable experimental features
const sfcOptions = {
  script: {
    // refTransform: true,
    reactivityTransform: true,
  },
}

store.init().then(() => {
  loading.value = false
})

// persist state
watchEffect(() => history.replaceState({}, '', store.serialize()))

function parseVersions() {
  const search = new URLSearchParams(location.search)
  const versions: Record<string, string> = {}

  for (const [name, value] of search.entries()) {
    versions[name] = value
  }

  return versions
}

async function handleKeyDown(event: KeyboardEvent) {
  const { code, ctrlKey, metaKey, altKey, shiftKey } = event

  if ((ctrlKey || metaKey) && code === 'KeyS') {
    event.preventDefault()
  } else if ((ctrlKey || metaKey || altKey) && shiftKey && code === 'KeyF') {
    const file = store.state.activeFile

    event.preventDefault()
    file.code = await prettierCode(file.filename, file.code)
  }
}
</script>

<style lang="scss">
@use 'sass:map';
@use 'sass:meta';
@use './style.scss' as *;

body {
  --nav-height: 50px;

  margin: 0;
  font-family: var(--vxp-font-family-base);
  font-size: 13px;
}

.vue-repl {
  height: calc(100vh - var(--nav-height)) !important;
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

.monaco-editor {
  &-background,
  .margin {
    transition: var(--vxp-transition-background);
  }
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

  @media #{meta.inspect($lg)} {
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
