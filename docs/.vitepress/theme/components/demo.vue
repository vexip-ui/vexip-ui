<script setup lang="ts">
import { defineAsyncComponent, markRaw, onMounted, ref, watch, watchEffect } from 'vue'
import { Message } from 'vexip-ui'
import { ChevronUp, Code, PaperPlaneR, PasteR, PenToSquareR } from '@vexip-ui/icons'
import { useI18n } from 'vue-i18n'
import { highlight, languages } from 'prismjs'
import { transformDemoCode } from '../common/demo-prefix'
import { hashTarget } from '../common/hash-target'
import { usePlayground } from '../common/playground'

import type { RowExposed } from 'vexip-ui'

const demos = import.meta.glob('@docs/demos/**/*.vue')
const codes = import.meta.glob('@docs/demos/**/*.vue', { as: 'raw' })

const extensionMap: Record<string, string> = {
  vue: 'markup',
  html: 'markup',
  md: 'markdown',
  rb: 'ruby',
  ts: 'typescript',
  py: 'python',
  sh: 'bash',
  yml: 'yaml',
  styl: 'stylus',
  kt: 'kotlin',
  rs: 'rust'
}

const props = defineProps({
  src: {
    type: String,
    default: ''
  }
})

const { t, locale } = useI18n({ useScope: 'global' })

const prefix = 'demo'
const activeClass = `${prefix}--active`

const demo = ref<Record<string, any>>()
const code = ref('')

const codeExpanded = ref(false)
const codeLines = ref(0)

const wrapper = ref<RowExposed>()
const codeRef = ref<HTMLElement>()

watchEffect(async () => {
  if (!codeRef.value) return

  await internalInit()

  const formattedCode = transformDemoCode(code.value)
  const lang = getCodeLang('vue')

  if (languages[lang]) {
    codeLines.value = formattedCode.split('\n').length - 1
    codeRef.value.innerHTML = highlight(formattedCode, languages[lang], lang)
  }
})

watch(hashTarget, toggleActive)

onMounted(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(toggleActive)
  })
})

async function internalInit() {
  const basePath = `/demos/${props.src}/demo.${locale.value}.vue`
  const path = Object.keys(demos).find(path => path.endsWith(basePath))

  if (path) {
    demo.value = markRaw(defineAsyncComponent(demos[path] as any))
    code.value = await codes[path]()
  }
}

function toggleActive() {
  if (wrapper.value?.$el) {
    const el = wrapper.value.$el as HTMLElement

    if (!hashTarget.value || el.id !== hashTarget.value) {
      el.classList.remove(activeClass)
    } else {
      el.classList.add(activeClass)
    }
  }
}

function expandCodes() {
  codeExpanded.value = !codeExpanded.value
}

function copyCodes() {
  let isSuccess = false

  if (wrapper.value?.$el) {
    const code = wrapper.value.$el.querySelector('pre code')
    const textarea = document.createElement('textarea')

    textarea.style.height = '0'
    textarea.setAttribute('readonly', 'readonly')

    textarea.value = code?.textContent ?? ''

    document.body.appendChild(textarea)
    textarea.select()

    isSuccess = document.execCommand('copy')

    document.body.removeChild(textarea)
  }

  if (isSuccess) {
    Message.success(t('common.copySuccess'))
  } else {
    Message.error(t('common.copyFail'))
  }
}

function getCodeLang(extension: string) {
  return extensionMap[extension] ?? extension
}

const githubBaseUrl = 'https://github.com/vexip-ui/vexip-ui/blob/main/docs/'

function editOnGithub() {
  if (props.src) {
    window.open(`${githubBaseUrl}/demos/${props.src}/demo.${locale.value}.vue`)
  }
}

function editOnPlayground() {
  // should use the original code
  if (code.value) {
    const { link } = usePlayground(code.value)

    window.open(link)
  }
}
</script>

<template>
  <Row ref="wrapper" tag="section" :class="[prefix]">
    <Column>
      <div :class="`${prefix}__example`">
        <NativeScroll
          mode="horizontal"
          width="100%"
          use-x-bar
          :scroll-style="{
            display: 'inline-block',
            padding: '20px 12px 8px'
          }"
        >
          <!-- <slot></slot> -->
          <component :is="demo" v-if="demo"></component>
        </NativeScroll>
      </div>
      <div :class="`${prefix}__description`">
        <slot></slot>
      </div>
    </Column>
    <Column :class="`${prefix}__actions`">
      <Tooltip reverse transfer>
        <template #trigger>
          <button type="button" :class="`${prefix}__action`">
            <Icon :scale="1.1" @click="copyCodes">
              <PasteR></PasteR>
            </Icon>
          </button>
        </template>
        {{ t('common.copyCode') }}
      </Tooltip>
      <Tooltip reverse transfer>
        <template #trigger>
          <button type="button" :class="`${prefix}__action`">
            <Icon :scale="1.1" :label="t('common.editOnGithub')" @click="editOnGithub">
              <PenToSquareR></PenToSquareR>
            </Icon>
          </button>
        </template>
        {{ t('common.editOnGithub') }}
      </Tooltip>
      <Tooltip reverse transfer>
        <template #trigger>
          <button type="button" :class="`${prefix}__action`">
            <Icon :scale="1.1" :label="t('common.editOnPlayground')" @click="editOnPlayground">
              <PaperPlaneR></PaperPlaneR>
            </Icon>
          </button>
        </template>
        {{ t('common.editOnPlayground') }}
      </Tooltip>
      <Tooltip reverse transfer>
        <template #trigger>
          <button type="button" :class="`${prefix}__action`">
            <Icon
              :scale="1.1"
              :label="codeExpanded ? t('common.hideCode') : t('common.showCode')"
              @click="expandCodes"
            >
              <Code></Code>
            </Icon>
          </button>
        </template>
        {{ codeExpanded ? t('common.hideCode') : t('common.showCode') }}
      </Tooltip>
    </Column>
    <CollapseTransition>
      <Column v-show="codeExpanded" :class="`${prefix}__code`">
        <div :class="`language-vue`">
          <pre :class="`language-vue`" :lang="'vue'"><code ref="codeRef"></code></pre>
          <span v-if="codeLines > 0" class="code-line-numbers">
            <span v-for="n in codeLines" :key="n"></span>
          </span>
        </div>
        <button type="button" :class="`${prefix}__reduce`" @click="expandCodes">
          <Icon><ChevronUp></ChevronUp></Icon>
          <span :class="`${prefix}__tip`">
            {{ t('common.hideCode') }}
          </span>
        </button>
      </Column>
    </CollapseTransition>
  </Row>
</template>

<style lang="scss">
@use '../style/mixins.scss' as *;

.demo {
  margin-bottom: 1.4em;
  border: var(--vxp-border-light-2);
  border-radius: var(--vxp-radius-base);
  transition: var(--vxp-transition-border), var(--vxp-transition-shadow);

  &:hover {
    box-shadow: var(--vxp-shadow-base);
  }

  &:target {
    border-color: var(--vxp-color-primary-opacity-2);
  }

  &__example {
    padding: 20px 12px 8px;
  }

  &__description {
    padding: 0 14px 14px;

    p {
      padding: 0 14px;
      margin-bottom: 6px;
    }

    blockquote {
      p {
        padding: 0;
        margin: 0;
      }
    }

    .anchor {
      width: 100%;
      margin: 14px 0;
      font-size: var(--vxp-font-size-primary);
      color: var(--vxp-content-color-base);
      white-space: nowrap;

      &::before,
      &::after {
        position: relative;
        top: 50%;
        content: '';
        border-top: var(--vxp-border-light-2);
        transition: var(--vxp-transition-border);
        transform: translateY(50%);
      }

      &::before {
        width: 14px;
        margin-right: 8px;
      }

      &::after {
        width: calc(100% - 14px);
        margin-left: 8px;
      }

      &__link {
        display: none;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
    border-top: var(--vxp-border-light-2);
    transition: var(--vxp-transition-border);
  }

  &__action {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-left: 3px;
    color: var(--vxp-content-color-placeholder);
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
    transition: var(--vxp-transition-color);

    &:hover,
    &:focus {
      color: var(--vxp-color-primary-opacity-2);
    }

    &:first-child {
      margin-left: 0;
    }

    .vxp-tooltip__trigger {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
    }

    .vxp-tooltip__tip {
      white-space: nowrap;
    }

    .vxp-icon {
      width: 100%;
      height: 100%;
    }
  }

  &__actions:hover &__action,
  &__actions:focus-within &__action {
    color: var(--vxp-content-color-third);

    &:hover,
    &:focus {
      color: var(--vxp-color-primary-opacity-2);
    }
  }

  &__code {
    overflow: hidden;
    border-top: var(--vxp-border-light-2);
    border-radius: 0 0 var(--vxp-border-radius-base) var(--vxp-border-radius-base);
  }

  &__reduce {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 32px;
    padding: 6px 0;
    color: var(--vxp-content-color-placeholder);
    cursor: pointer;
    background-color: transparent;
    border: 0;
    border-top: var(--vxp-border-light-2);
    outline: 0;

    &:hover,
    &:focus {
      color: var(--vxp-color-primary-opacity-2);
    }
  }

  &__reduce &__tip {
    width: 80px;
    padding-left: 10px;
    margin-right: -80px;
    white-space: nowrap;
    opacity: 0%;
    transition: margin var(--vxp-transition-base), var(--vxp-transition-color),
      var(--vxp-transition-opacity);
  }

  &__reduce:hover &__tip,
  &__reduce:focus &__tip {
    margin-right: 0;
    opacity: 100%;
  }

  div[class*='language-'] {
    border-radius: 0;
  }
}
</style>
