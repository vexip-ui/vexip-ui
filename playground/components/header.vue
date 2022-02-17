<template>
  <Row tag="header" class="header">
    <Column flex="0">
      <h1 class="index">
        <img class="index__logo" src="/logo.png" alt="logo.png" />
        <span class="index__title"> Vexip SFC Playground </span>
      </h1>
    </Column>
    <Column flex="auto"></Column>
    <Column flex="0">
      <div class="action" @click="toggleDark">
        <Icon v-if="isDarkTheme" name="moon" :scale="1.3"></Icon>
        <Icon v-else name="sun" :scale="1.4"></Icon>
      </div>
      <div class="action" @click="copyLink">
        <Icon name="share-alt" :scale="1.3"></Icon>
      </div>
      <div class="action" @click="download">
        <Icon name="download" :scale="1.3"></Icon>
      </div>
      <Linker class="github-link" to="//github.com/qmhc/vexip-ui/tree/main/playground">
        <Icon name="brands/github" :scale="1.5"></Icon>
      </Linker>
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Row } from '@/components/row'
import { Column } from '@/components/column'
import { Confirm } from '@/components/confirm'
import { Linker } from '@/components/linker'
import { Icon } from '@/components/icon'
import { Message } from '@/components/message'
import { downloadProject } from '../download/download'

import '@/common/icons/sun'
import '@/common/icons/moon'
import '@/common/icons/share-alt'
import '@/common/icons/download'
import '@/common/icons/brands/github'

const props = defineProps({
  store: {
    type: Object,
    default: () => ({})
  }
})

const isDarkTheme = ref(document.documentElement.classList.contains('dark'))

function toggleDark() {
  const cls = document.documentElement.classList
  cls.toggle('dark')
  isDarkTheme.value = cls.contains('dark')
  localStorage.setItem('vexip-sfc-playground-prefer-dark', String(isDarkTheme.value))
}

async function copyLink() {
  await navigator.clipboard.writeText(location.href)
  Message.success({
    content: 'Sharable URL has been copied to clipboard.',
    background: !isDarkTheme.value
  })
}

async function download() {
  const result = await Confirm.open({
    content: 'Download project files?',
    confirmType: 'primary',
    confirmText: 'Download',
    cancelText: 'Cancel'
  })

  if (result) {
    downloadProject(props.store)
  }
}
</script>

<style lang="scss">
.header {
  --bg: #{$vxp-color-white};
  --bg-light: #{$vxp-color-white};
  --border: #{$vxp-color-border};

  z-index: 10;
  height: var(--nav-height);
  padding: 0 1em;
  font-size: 13px;
  color: var(--base);
  background-color: var(--bg);
  box-shadow: 0 0 4px rgba(0, 0, 0, 30%);

  .dark & {
    --base: #ddd;
    --bg: #1a1a1a;
    --bg-light: #242424;
    --border: #383838;

    border-bottom: 1px solid var(--border);
    box-shadow: none;
  }

  .index {
    display: inline-block;
    margin: 0;
    font-size: 1.5em;
    font-weight: 500;
    line-height: var(--nav-height);
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;

    &__logo {
      position: relative;
      top: -2px;
      height: 24px;
      margin-right: 10px;
      vertical-align: middle;
    }

    &__title {
      color: var(--base);
    }
  }

  .action,
  .github-link {
    &,
    .vxp-icon {
      color: var(--base);
    }

    &:hover {
      &,
      .vxp-icon {
        color: var(--base);
      }
    }
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;
  }

  .vxp-column {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
