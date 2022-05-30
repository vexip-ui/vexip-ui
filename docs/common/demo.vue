<template>
  <Row ref="wrapper" tag="section" :class="prefix">
    <Column>
      <div :class="`${prefix}__example`">
        <slot></slot>
      </div>
      <div :class="`${prefix}__description`">
        <slot name="desc"></slot>
      </div>
      <!-- <Divider :class="`${prefix}__divider`">
        <span :class="`${prefix}__title`">
          <slot name="title">
            {{ title }}
          </slot>
        </span>
      </Divider>
      <div :class="`${prefix}__description`">
        <slot name="desc"></slot>
      </div> -->
    </Column>
    <Column :class="`${prefix}__actions`">
      <Tooltip theme="dark" :class="`${prefix}__action`" transfer>
        <Icon :scale="1.1" @click="copyCode">
          <CopyR></CopyR>
        </Icon>
        <template #tip>
          复制代码
        </template>
      </Tooltip>
      <Tooltip theme="dark" :class="`${prefix}__action`" transfer>
        <Icon :scale="1.1" @click="expandCode">
          <Code></Code>
        </Icon>
        <template #tip>
          {{ codeExpanded ? '收起代码' : '展开代码' }}
        </template>
      </Tooltip>
    </Column>
    <CollapseTransition>
      <Column v-show="codeExpanded" :class="`${prefix}__code`">
        <slot name="code">
          <pre :class="`language-${lang}`"><code ref="codeRef"></code></pre>
        </slot>
        <div :class="`${prefix}__reduce`" @click="expandCode">
          <Icon><ChevronUp></ChevronUp></Icon>
          <span :class="`${prefix}__tip`"> 收起代码 </span>
        </div>
      </Column>
    </CollapseTransition>
  </Row>
</template>

<script setup lang="ts">
import { useSlots, ref, watch, onMounted } from 'vue'
import { highlight, languages } from 'prismjs'
import { Message } from 'vexip-ui'
import { CopyR, Code, ChevronUp } from '@vexip-ui/icons'

import type { PropType } from 'vue'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { Row } from 'vexip-ui'

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
  title: {
    type: String,
    default: ''
  },
  code: {
    type: String,
    default: ''
  },
  lang: {
    type: String,
    default: 'vue'
  },
  onMounted: {
    type: Function as PropType<() => any>,
    default: null
  }
})
const slots = useSlots()

const prefix = 'demo'
const codeExpanded = ref(false)
const wrapper = ref<InstanceType<typeof Row> | null>(null)
const codeRef = ref<HTMLElement | null>(null)

watch(
  () => props.code,
  value => {
    if (value) {
      const lang = getCodeLang(props.lang.toLowerCase())

      if (languages[lang]) {
        codeRef.value.innerHTML = highlight(props.code, languages[lang], lang)
      }
    }
  }
)

onMounted(() => {
  if (props.code && !slots.code && codeRef.value) {
    const lang = getCodeLang(props.lang.toLowerCase())

    if (languages[lang]) {
      codeRef.value.innerHTML = highlight(props.code, languages[lang], lang)
    }
  }

  if (typeof props.onMounted === 'function') {
    props.onMounted()
  }
})

function expandCode() {
  codeExpanded.value = !codeExpanded.value
}

function copyCode() {
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
    Message.success('复制成功')
  } else {
    Message.error('复制失败')
  }
}

function getCodeLang(extension: string) {
  return extensionMap[extension] ?? extension
}
</script>

<style lang="scss">
.demo {
  margin-bottom: 1.4em;
  border: var(--vxp-border-light-2);
  border-radius: var(--vxp-border-radius-base);
  transition: var(--vxp-transition-box-shadow);

  &:hover {
    box-shadow: var(--vxp-box-shadow-base);
  }

  &__example {
    padding: 3em 1.6em 2em;
  }

  &__divider {
    &::before {
      width: 1em;
    }

    &::after {
      width: calc(100% - 1em);
    }
  }

  &__description {
    padding: 0 1em 1em;

    .markdown p {
      padding: 0 1em;
      margin-bottom: 0.4em;
    }

    .anchor {
      width: 100%;
      margin: 1em 0;
      font-size: var(--vxp-font-size-primary);
      color: var(--vxp-content-color-base);
      white-space: nowrap;

      &::before,
      &::after {
        position: relative;
        top: 50%;
        content: '';
        border-top: var(--vxp-border-light-2);
        transform: translateY(50%);
      }

      &::before {
        width: 1em;
        margin-right: 0.6em;
      }

      &::after {
        width: calc(100% - 1em);
        margin-left: 0.6em;
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
  }

  &__action {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 3px;
    cursor: pointer;

    &,
    .vxp-icon {
      color: var(--vxp-content-color-placeholder);
    }

    &:hover {
      &,
      .vxp-icon {
        color: var(--vxp-color-primary-light-2);
      }
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
  }

  &__code {
    overflow: hidden;
    border-top: var(--vxp-border-light-2);
    border-radius: 0 0 var(--vxp-border-radius-base) var(--vxp-border-radius-base);

    pre {
      background-color: var(--vxp-fill-color-background);
    }

    code {
      display: block;
    }
  }

  &__reduce {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 0.4em 0;
    cursor: pointer;
    border-top: var(--vxp-border-light-2);

    &,
    .vxp-icon {
      color: var(--vxp-content-color-placeholder);
    }

    &:hover {
      &,
      .vxp-icon {
        color: var(--vxp-color-primary-light-2);
      }
    }
  }

  &__reduce &__tip {
    width: 66px;
    padding-left: 10px;
    margin-right: -66px;
    opacity: 0%;
    transition:
      margin var(--vxp-transition-base),
      var(--vxp-transition-color),
      var(--vxp-transition-opacity);
  }

  &__reduce:hover &__tip {
    margin-right: 0;
    opacity: 100%;
  }
}
</style>
