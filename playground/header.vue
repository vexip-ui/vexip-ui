<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRef } from 'vue'

import Action from './action.vue'
import { Confirm, Message } from 'vexip-ui'
import {
  ArrowDownToLine,
  Github,
  Moon,
  RefreshCcwDot,
  Rocket,
  RotateCw,
  Settings,
  Share2,
  Sun,
  Type,
} from 'lucide-vue-next'
import { cdnTemplates, getCdn, setCdn } from './cdn'
import { locale } from './locale'
import { downloadProject } from './download/download'
import { prettierCode } from './format'

import type { PropType } from 'vue'
import type { ReplStore } from './store'

interface RepoMeta {
  owner: string,
  repo: string,
  name: string,
  versions: string[],
  active: string,
  loading: boolean,
  loaded: boolean,
}

type ActionMeta = {
  label: string,
  icon: object,
  scale?: number,
} & (
  | {
    action: () => any,
  }
  | {
    linkTo: string,
  }
  | {
    type: 'dropdown',
    options: string[],
    value: string,
    action: () => any,
  }
)

const props = defineProps({
  store: {
    type: Object as PropType<ReplStore>,
    required: true,
  },
  versions: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
})

const emit = defineEmits(['reload'])

const store = toRef(props, 'store')

store.value.dark = document.documentElement.classList.contains('dark')

const libVersion = `Repl@${__REPL_VERSION__}`

const computedStyle = getComputedStyle(document.documentElement)
const media = computedStyle.getPropertyValue('--vxp-break-point-lg').trim()
const query = matchMedia(`only screen and ${media}`)

const transferTo = ref('')
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
    active: props.versions['vexip-ui'] || __VERSION__,
    loading: false,
    loaded: false,
  },
  vue: {
    owner: 'vuejs',
    repo: 'core',
    name: 'Vue',
    versions: [props.versions.vue || __VUE_VERSION__],
    active: props.versions.vue || __VUE_VERSION__,
    loading: false,
    loaded: false,
  },
  typescript: {
    owner: 'microsoft',
    repo: 'TypeScript',
    name: 'TypeScript',
    versions: [props.versions.typescript || __TS_VERSION__],
    active: props.versions.typescript || __TS_VERSION__,
    loading: false,
    loaded: false,
  },
})

const versionsMap = computed(() => {
  const map: Record<string, string> = {}

  for (const pkg of Object.keys(repoMeta)) {
    map[pkg] = repoMeta[pkg].active
  }

  return map
})

const cdnOptions = Object.keys(cdnTemplates)
const cdnPanelVisible = ref(false)
const currentCdn = ref(getCdn())

const actions = reactive([
  { label: locale.share, icon: Share2, scale: 1.1, action: copyLink },
  { label: locale.download, icon: ArrowDownToLine, scale: 1.3, action: download },
  { label: locale.format, icon: Type, action: formatCodes },
  { label: locale.reload, icon: RotateCw, action: reload },
  {
    label: locale.cdn,
    icon: Rocket,
    type: 'dropdown',
    options: cdnOptions,
    value: currentCdn,
    action: applyCdn,
  },
  { label: locale.reset, icon: RefreshCcwDot, action: reset },
  {
    label: 'GitHub',
    icon: Github,
    linkTo: 'https://github.com/vexip-ui/vexip-ui/tree/main/playground',
  },
]) satisfies ActionMeta[]

onMounted(() => {
  window.addEventListener('blur', handleWindowBlur)

  requestAnimationFrame(() => {
    transferTo.value = query!.matches ? '' : '#setting'
  })
})

async function initRepoVersions(meta: RepoMeta) {
  if (!meta.loaded) {
    meta.loading = true
    meta.versions = await fetchVersions(meta.owner, meta.repo)
    meta.loaded = true
    meta.loading = false
  }
}

async function fetchVersions(owner: string, repo: string, maxCount = 30) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases?per_page=100`,
  )
  const releases = (await response.json()) as any[]
  const filteredVersions: string[] = []
  const versions: string[] = releases
    .map(r => (/^v/.test(r.tag_name) ? r.tag_name.slice(1) : r.tag_name))
    .filter(r => !r.includes('-'))

  for (const version of versions) {
    filteredVersions.push(version)

    if (filteredVersions.length > maxCount) {
      break
    }
  }

  return filteredVersions
}

function handleWindowBlur() {
  if (document.activeElement?.tagName === 'IFRAME') {
    document.dispatchEvent(new MouseEvent('click'))
  }
}

function toggleDark() {
  const cls = document.documentElement.classList
  cls.toggle('dark')
  store.value.dark = cls.contains('dark')
  localStorage.setItem('vexip-sfc-playground-prefer-dark', String(store.value.dark))
}

async function copyLink() {
  await navigator.clipboard.writeText(location.href)
  Message.success({
    content: 'Sharable URL has been copied to clipboard.',
    background: !store.value.dark,
  })
}

async function download() {
  const result = await Confirm.open({
    content: locale.doDownload,
    confirmType: 'primary',
    confirmText: locale.download,
    cancelText: locale.cancel,
  })

  if (result) {
    downloadProject(props.store)
  }
}

function reset() {
  location.href = location.origin
}

function reload() {
  emit('reload')
}

function changeVersion(pkg: string, version: string) {
  repoMeta[pkg].active = version

  props.store.setVersion(pkg, version)
  history.replaceState({}, '', `${buildSearch()}${location.hash}`)
}

function applyCdn() {
  cdnPanelVisible.value = false
  setCdn(currentCdn.value)
}

function buildSearch() {
  if (Object.keys(versionsMap.value).length) {
    return `?${Object.entries(versionsMap.value)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`
  }

  return ''
}

async function formatCodes() {
  const files = props.store.files

  for (const file of Object.values(files)) {
    if (!file.hidden) {
      file.code = await prettierCode(file.filename, file.code)
    }
  }
}
</script>

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
    <Column flex="0" style="gap: 10px">
      <button
        v-show="transferTo"
        type="button"
        class="action icon-action"
        style="margin-inline-end: 0"
        @click="settingActive = true"
      >
        <Icon :scale="1.2">
          <Settings></Settings>
        </Icon>
      </button>
      <Portal :to="transferTo">
        <div class="section">
          <div v-for="(meta, pkg) in repoMeta" :key="pkg" class="select-action">
            <span class="repo-name">
              {{ meta.name }}
            </span>
            <Select
              :value="meta.active"
              :options="meta.versions"
              :transparent="!transferTo"
              :loading="meta.loading"
              @toggle="initRepoVersions(meta)"
              @change="changeVersion(pkg, $event)"
            ></Select>
          </div>
        </div>
        <div class="section">
          <Action :label="locale.theme" :show-label="!!transferTo" @click="toggleDark">
            <Icon v-if="store.dark" :scale="1.2">
              <Moon></Moon>
            </Icon>
            <Icon v-else :scale="1.25">
              <Sun></Sun>
            </Icon>
          </Action>
          <template v-for="(action, _index) in actions" :key="_index">
            <Action
              v-bind="action"
              :icon-props="{ scale: action.scale ?? 1.2 }"
              :show-label="!!transferTo"
              @click="action.action"
            ></Action>
          </template>
        </div>
      </Portal>
    </Column>
  </Row>
  <Drawer v-model:active="settingActive" transfer>
    <div id="setting"></div>
  </Drawer>
</template>

<style lang="scss">
@use './style' as *;

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
    var(--vxp-transition-background), var(--vxp-transition-border), var(--vxp-transition-shadow);

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
      margin-inline-start: 12px;
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
    gap: 10px;
  }

  .ssr-switch {
    margin-inline-end: 20px;
  }

  .select-action {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
  }

  .repo-name {
    margin-inline-end: 6px;
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
    flex-direction: column;
    justify-content: center;
    padding: 6px;
  }

  .ssr-switch {
    margin-inline-end: 20px;
  }

  .select-action {
    display: flex;
    flex-direction: column;
  }

  .repo-name {
    margin-inline-end: 0;
    margin-top: 8px;
    margin-bottom: 4px;
    color: var(--vxp-color-success-base);
    white-space: nowrap;
  }
}
</style>
