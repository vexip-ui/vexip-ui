<template>
  <Row tag="header" class="header" :column-flex="{ align: 'middle' }">
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
      <div v-for="(meta, index) in repoMeta" :key="index" class="action">
        <span class="repo-name">
          {{ meta.name }}
        </span>
        <Select :value="meta.acttive" :options="meta.versions" transparent></Select>
      </div>
      <Switch
        class="ssr-switch"
        :value="ssr"
        open-color="var(--vxp-color-success-base)"
        open-text="SSR"
        close-text="SPA"
        @change="toggleSSR"
      ></Switch>
      <button class="action" title="Toggle Dark" @click="toggleDark">
        <Icon v-if="isDarkTheme" :scale="1.3">
          <Moon></Moon>
        </Icon>
        <Icon v-else :scale="1.3">
          <Sun></Sun>
        </Icon>
      </button>
      <button class="action" title="Share" @click="copyLink">
        <Icon :scale="1.3">
          <ShareNodes></ShareNodes>
        </Icon>
      </button>
      <button class="action" title="Download" @click="download">
        <Icon :scale="1.3">
          <Download></Download>
        </Icon>
      </button>
      <button class="action" title="Reset" @click="reset">
        <Icon :scale="1.3">
          <ArrowRotateLeft></ArrowRotateLeft>
        </Icon>
      </button>
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
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { Confirm, Message } from 'vexip-ui'
import { Moon, Sun, ShareNodes, Download, ArrowRotateLeft, GithubB } from '@vexip-ui/icons'
import { downloadProject } from '../download/download'

const props = defineProps({
  store: {
    type: Object,
    required: true
  },
  ssr: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-ssr'])

const isDarkTheme = ref(document.documentElement.classList.contains('dark'))
const libVersion = ref(__VERSION__)

const repoMeta = reactive([
  {
    owner: 'vexip-ui',
    repo: 'vexip-ui',
    name: 'Vexip UI',
    versions: ['latest'],
    acttive: 'latest'
  },
  {
    owner: 'vuejs',
    repo: 'core',
    name: 'Vue',
    versions: ['latest'],
    acttive: 'latest'
  }
])

init()

onMounted(() => {
  window.addEventListener('blur', handleWindowBlur)
})

onBeforeUnmount(() => {
  window.removeEventListener('blur', handleWindowBlur)
})

async function init() {
  Promise.all(
    repoMeta.map(async meta => {
      meta.versions = ['latest', ...(await fetchVersions(meta.owner, meta.repo))]
    })
  )
}

async function fetchVersions(owner: string, repo: string, maxCount = 15) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases?per_page=${maxCount}`
  )
  const releases = (await response.json()) as any[]
  const versions = releases
    .map(r => (/^v/.test(r.tag_name) ? r.tag_name.slice(1) : r.tag_name))
    .filter(r => !r.includes('-'))

  return versions as string[]
}

function handleWindowBlur() {
  if (document.activeElement?.tagName === 'IFRAME') {
    document.dispatchEvent(new MouseEvent('click'))
  }
}

function toggleSSR() {
  emit('toggle-ssr')
}

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
  z-index: 10;
  height: var(--nav-height);
  padding: 0 1em;
  font-size: 13px;
  color: var(--vxp-content-color-base);
  background-color: var(--vxp-bg-color-base);
  border-bottom: 1px solid transparent;
  box-shadow: 0 0 4px rgba(0, 0, 0, 30%);
  transition:
    var(--vxp-transition-background),
    var(--vxp-transition-border),
    var(--vxp-transition-shadow);

  .dark & {
    --border: #383838;

    border-bottom-color: var(--vxp-border-color-base);
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

  .ssr-switch {
    margin-right: 10px;
  }

  .action,
  .github-link {
    color: var(--vxp-content-color-secondary);

    &:hover,
    &:focus {
      color: var(var(--vxp-content-color-base));
    }
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-right: 10px;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
  }

  .repo-name {
    margin-right: 6px;
    white-space: nowrap;
  }

  .vxp-column {
    height: 100%;
  }
}
</style>
