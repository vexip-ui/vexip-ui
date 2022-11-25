<template>
  <Row tag="header" class="header">
    <Column flex="0">
      <Linker to="https://www.vexipui.com">
        <h1 class="index">
          <img class="index__logo" src="/vexip-ui.svg" alt="vexip-ui.svg" />
          <span class="index__title"> Vexip SFC Playground </span>
        </h1>
        <Tag v-if="libVersion" style="margin: 4px 0 0 6px; transform: scale(0.8);">
          {{ `v${libVersion}` }}
        </Tag>
      </Linker>
    </Column>
    <Column flex="auto"></Column>
    <Column flex="0">
      <div class="action" title="Toggle Dark" @click="toggleDark">
        <Icon v-if="isDarkTheme" :scale="1.3">
          <Moon></Moon>
        </Icon>
        <Icon v-else :scale="1.3">
          <Sun></Sun>
        </Icon>
      </div>
      <div class="action" title="Share" @click="copyLink">
        <Icon :scale="1.3">
          <ShareNodes></ShareNodes>
        </Icon>
      </div>
      <div class="action" title="Download" @click="download">
        <Icon :scale="1.3">
          <Download></Download>
        </Icon>
      </div>
      <div class="action" title="Reset" @click="reset">
        <Icon :scale="1.3">
          <ArrowRotateLeft></ArrowRotateLeft>
        </Icon>
      </div>
      <Linker
        class="github-link"
        title="Github"
        to="//github.com/vexip-ui/vexip-ui/tree/main/playground"
      >
        <Icon :scale="1.4">
          <GithubB></GithubB>
        </Icon>
      </Linker>
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Confirm, Message } from 'vexip-ui'
import { Moon, Sun, ShareNodes, Download, ArrowRotateLeft, GithubB } from '@vexip-ui/icons'
import { downloadProject } from '../download/download'

const props = defineProps({
  store: {
    type: Object,
    default: () => ({})
  }
})

const isDarkTheme = ref(document.documentElement.classList.contains('dark'))
const libVersion = ref(__VERSION__)

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

function reset() {
  location.href = location.origin
}
</script>

<style lang="scss">
.header {
  --bg: var(--vxp-color-white);
  --bg-light: var(--vxp-color-white);
  --border: var(--vxp-border-color-base);

  z-index: 10;
  height: var(--nav-height);
  padding: 0 1em;
  font-size: 13px;
  color: var(--base);
  background-color: var(--bg);
  border-bottom: 1px solid transparent;
  box-shadow: 0 0 4px rgba(0, 0, 0, 30%);
  transition:
    var(--vxp-transition-background),
    var(--vxp-transition-border),
    var(--vxp-transition-shadow);

  .dark & {
    --base: #ddd;
    --bg: #1a1a1a;
    --bg-light: #242424;
    --border: #383838;

    border-bottom-color: var(--border);
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
      margin-right: 4px;
      vertical-align: middle;
    }

    &__title {
      color: var(--base);
      transition: var(--vxp-transition-background);
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
