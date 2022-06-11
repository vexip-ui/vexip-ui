<template>
  <article ref="wrapper" :class="prefix">
    <ResizeObserver @resize="refreshScroll?.()">
      <div :style="{ visibility: allLoaded ? undefined : 'hidden' }">
        <h1 :class="`${prefix}__title`">
          {{ $t(`components.${$route.meta.name}`) }}
          <span v-if="language !== 'en-US'" :class="`${prefix}__sub-name`">
            {{ $route.meta.name }}
          </span>
          <Tag
            v-if="$route.meta.since"
            type="warning"
            simple
            style="margin-left: 8px;"
          >
            {{ `Since v${$route.meta.since}` }}
          </Tag>
        </h1>
        <div :class="`${prefix}__desc`">
          <template v-if="desc">
            <component :is="desc" @mounted="handleDescMounted"></component>
          </template>
        </div>
        <h2 class="anchor">
          <span class="anchor__title">
            {{
              getMetaName(language, { name: 'Demos', cname: '代码示例' }, false)
            }}
          </span>
          <a class="anchor__link" href="">#</a>
        </h2>
        <Demo
          v-for="(example, index) in examples"
          :key="index"
          :code="example.code"
          :github="example.github"
        >
          <component :is="example.demo"></component>
          <template #desc>
            <component :is="example.desc" @mounted="handleDemoMounted"></component>
          </template>
        </Demo>
        <h2 class="anchor">
          <span class="anchor__title"> API </span>
          <a class="anchor__link" href="#api">#</a>
        </h2>
        <div :class="`${prefix}__api`">
          <template v-if="api">
            <component :is="api" @mounted="handleApiMounted"></component>
          </template>
        </div>
        <Portal to="#toc-anchor">
          <Anchor :offset="15">
            <AnchorLink v-for="item in anchors" :key="item.id" :to="`#${item.id}`">
              {{ item.name }}
            </AnchorLink>
          </Anchor>
        </Portal>
      </div>
    </ResizeObserver>
    <transition name="vxp-fade">
      <div v-if="!allLoaded" :class="`${prefix}__loading`">
        <Icon pulse :scale="1.2">
          <Spinner></Spinner>
        </Icon>
      </div>
    </transition>
  </article>
</template>

<script setup lang="ts">
import {
  defineAsyncComponent,
  markRaw,
  ref,
  computed,
  watch,
  watchEffect,
  inject
} from 'vue'
import { Spinner } from '@vexip-ui/icons'
import { noop } from '@vexip-ui/utils'
import Demo from '@docs/common/demo.vue'
import { ussTocAnchor } from './toc-anchor'
import { getMetaName } from './meta-name'

interface Example {
  demo: Record<string, any>,
  desc: Record<string, any>,
  code: string,
  github: string
}

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: __ROLLBACK_LANG__
  }
})

const prefix = 'component-doc'

const refreshScroll = inject<() => void>('refreshScroll', noop)
const { anchors, wrapper, refreshAnchor } = ussTocAnchor(3)

const desc = ref<Record<string, any> | null>(null)
const examples = ref<Example[]>([])
const api = ref<Record<string, any> | null>(null)

const descLoaded = ref(false)
const mountedDemoCount = ref(0)
const allDemosLoaded = ref(false)
const apiLoaded = ref(false)

const allLoaded = computed(() => {
  return descLoaded.value && allDemosLoaded.value && apiLoaded.value
})

watch(allLoaded, value => value && refresh())

function refresh() {
  requestAnimationFrame(() => {
    refreshScroll?.()
    refreshAnchor()
  })
}

function handleDescMounted() {
  descLoaded.value = true
}

function handleDemoMounted() {
  mountedDemoCount.value++

  if (mountedDemoCount.value === examples.value.length) {
    allDemosLoaded.value = true
  }
}

function handleApiMounted() {
  apiLoaded.value = true
}

async function internalInit(name: string, language: string) {
  descLoaded.value = false
  mountedDemoCount.value = 0
  allDemosLoaded.value = false
  apiLoaded.value = false

  const demos: string[] = (await import(`../demos/${name}/demos-meta.json`)).default

  language = language || __ROLLBACK_LANG__

  desc.value = markRaw(defineAsyncComponent(() => import(`../demos/${name}/desc.${language}.md`)))
  api.value = markRaw(defineAsyncComponent(() => import(`../demos/${name}/api.${language}.md`)))

  examples.value = demos.map(demo => {
    return {
      demo: markRaw(defineAsyncComponent(() => import(`../demos/${name}/${demo}/demo.${language}.vue`))),
      desc: markRaw(defineAsyncComponent(() => import(`../demos/${name}/${demo}/desc.${language}.md`))),
      code: '',
      github: `demos/${name}/${demo}/demo.${language}.vue`
    }
  })

  demos.forEach(async (demo, index) => {
    examples.value[index].code = (await import(`../demos/${name}/${demo}/demo.${language}.vue?raw`)).default
  })
}

watchEffect(async () => {
  await internalInit(props.name, props.language)
})
</script>

<style lang="scss">
.component-doc {
  position: relative;
  padding: 16px 3.2em;
  padding-right: 15em;

  &__loading {
    position: absolute;
    top: 14px;
    right: 14px;
    color: var(--vxp-content-color-secondary);
  }

  .api,
  .demo__description {
    :not(pre) > code {
      padding: 3px 5px;
      font-family: SFMono-Regular, Consolas, Monaco, 'andale mono', 'ubuntu mono', monospace;
      color: var(--vxp-color-error-opacity-2);
      background-color: var(--vxp-color-error-opacity-9);
      border-radius: var(--vxp-border-radius-small);
    }
  }
}
</style>
