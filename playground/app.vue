<script setup lang="ts">
import { computed, ref, useTemplateRef, watch, watchEffect } from 'vue'
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

const dark = computed(() => store.dark)

store.init().then(() => {
  console.info(store)
  loading.value = false
})

const AUTO_SAVE_KEY = 'vxp-playground-auto-save'
const autoSave = ref(JSON.parse(localStorage.getItem(AUTO_SAVE_KEY) || 'true'))

watch(autoSave, value => {
  localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(value))
})

// persist state
watchEffect(() => history.replaceState({}, '', store.serialize()))

const replRef = useTemplateRef<InstanceType<typeof Repl>>('replRef')

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
    const file = store.activeFile

    event.preventDefault()
    file.code = await prettierCode(file.filename, file.code)
  }
}

function reloadRepl() {
  replRef.value?.reload()
}
</script>

<template>
  <template v-if="!loading">
    <Header :store="store" :versions="versions" @reload="reloadRepl"></Header>
    <Repl
      ref="replRef"
      v-model="autoSave"
      :clear-console="false"
      :store="store"
      :editor="Monaco"
      :theme="dark ? 'dark' : 'light'"
      @keydown="handleKeyDown"
    ></Repl>
  </template>
</template>

<style lang="scss">
@use 'sass:map';
@use 'sass:meta';
@use './style' as *;

body {
  --nav-height: 50px;

  margin: 0;
  overflow: hidden;
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
