<template>
  <Row tag="header" class="header" :column-flex="{ align: 'middle' }">
    <Column flex="0">
      <Linker to="https://www.vexipui.com">
        <h1 class="index">
          <img class="index__logo" src="/vexip-ui.svg" alt="vexip-ui.svg" />
          <span class="index__title"> Vexip SFC Playground </span>
        </h1>
        <Tag class="lib-version" size="small">
          {{ libVersion }}
        </Tag>
      </Linker>
    </Column>
    <Column flex="auto"></Column>
    <Column flex="0">
      <button
        v-show="transferTo"
        class="action"
        style="margin-right: 0;"
        @click="settingActive = true"
      >
        <Icon :scale="1.3">
          <Gear></Gear>
        </Icon>
      </button>
      <Portal :to="transferTo">
        <div class="section">
          <div v-for="(meta, pkg) in repoMeta" :key="pkg" class="action">
            <span class="repo-name">
              {{ meta.name }}
            </span>
            <Select
              :value="meta.active"
              :options="meta.versions"
              transparent
              @change="changeVersion(pkg, $event)"
            ></Select>
          </div>
        </div>
        <div class="section">
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
        </div>
      </Portal>
    </Column>
  </Row>
  <Drawer v-model:active="settingActive" transfer>
    <div id="setting"></div>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Confirm, Message } from 'vexip-ui'
import { Gear, Moon, Sun, ShareNodes, Download, ArrowRotateLeft, GithubB } from '@vexip-ui/icons'
import { downloadProject } from '../download/download'

import type { PropType } from 'vue'
import type { ReplStore } from '../store'

interface RepoMeta {
  owner: string,
  repo: string,
  name: string,
  versions: string[],
  active: string
}

const props = defineProps({
  store: {
    type: Object as PropType<ReplStore>,
    required: true
  },
  ssr: {
    type: Boolean,
    default: false
  },
  versions: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  }
})

const emit = defineEmits(['toggle-ssr'])

const isDarkTheme = ref(document.documentElement.classList.contains('dark'))
const libVersion = `Repl@${__REPL_VERSION__}`

const computedStyle = getComputedStyle(document.documentElement)
const media = computedStyle.getPropertyValue('--vxp-break-point-lg').trim()
const query = matchMedia(`only screen and ${media}`)

const transferTo = ref(query!.matches ? '' : '#setting')
const settingActive = ref(false)

query.addEventListener('change', () => {
  transferTo.value = query!.matches ? '' : '#setting'
  settingActive.value = !!transferTo.value && settingActive.value
})

const repoMeta: Record<string, RepoMeta> = reactive({
  'vexip-ui': {
    owner: 'vexip-ui',
    repo: 'vexip-ui',
    name: 'Vexip UI',
    versions: [props.versions['vexip-ui'] || __VERSION__],
    active: props.versions['vexip-ui'] || __VERSION__
  },
  vue: {
    owner: 'vuejs',
    repo: 'core',
    name: 'Vue',
    versions: [props.versions.vue || __VUE_VERSION__],
    active: props.versions.vue || __VUE_VERSION__
  }
})

initRepoVersions()

onMounted(() => {
  window.addEventListener('blur', handleWindowBlur)
})

async function initRepoVersions() {
  Promise.all(
    Object.values(repoMeta).map(async meta => {
      meta.versions = await fetchVersions(meta.owner, meta.repo)
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

function changeVersion(pkg: string, version: string) {
  repoMeta[pkg].active = version

  const versions = getVersions()

  props.store.setVersions(versions)
  history.replaceState({}, '', `${buildSearch(versions)}${location.hash}`)
}

function getVersions() {
  const versions: Record<string, string> = {}

  for (const pkg of Object.keys(repoMeta)) {
    versions[pkg] = repoMeta[pkg].active
  }

  return versions
}

function buildSearch(search: Record<string, string>) {
  if (Object.keys(search).length) {
    return `?${Object.entries(search)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`
  }

  return ''
}
</script>

<style lang="scss">
@use '../style.scss' as *;

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
      vertical-align: middle;
    }

    &__title {
      display: none;
      margin-left: 12px;
      color: var(--base);
      transition: var(--vxp-transition-background);

      @include query-media('sm') {
        display: inline-block;
      }
    }
  }

  .lib-version {
    margin: 4px 0 0 12px;
  }

  .section {
    display: flex;
  }

  .ssr-switch {
    margin-right: 20px;
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
    color: var(--vxp-color-success-base);
    white-space: nowrap;
  }

  .vxp-column {
    height: 100%;
  }
}

#setting {
  display: flex;
  flex-direction: column;

  .section {
    display: flex;
    justify-content: center;
    padding: 6px;
  }

  .ssr-switch {
    margin-right: 20px;
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

    &:last-child {
      margin-right: 0;
    }
  }

  .repo-name {
    margin-right: 6px;
    color: var(--vxp-color-success-base);
    white-space: nowrap;
  }
}
</style>
