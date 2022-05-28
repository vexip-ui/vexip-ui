<template>
  <article ref="wrapper" :class="prefix">
    <div :style="{ visibility: allLoaded ? undefined : 'hidden' }">
      <h1 :class="`${prefix}__title`">
        {{ $route.meta.component }}
        <Tag v-if="$route.meta.since" type="warning" style="margin-left: 8px;">
          {{ `Since v${$route.meta.since}` }}
        </Tag>
      </h1>
      <div :class="`${prefix}__desc`">
        <component :is="desc" @mounted="handleDescMounted"></component>
      </div>
      <h2 class="anchor">
        <span class="anchor__title"> 代码示例 </span>
        <a class="anchor__link" href="">#</a>
      </h2>
      <Demo v-for="({ code, demo, desc: _desc }, index) in examples" :key="index" :code="code">
        <component :is="demo"></component>
        <template #desc>
          <component :is="_desc" @mounted="handleDemoMounted"></component>
        </template>
      </Demo>
      <component :is="api" @mounted="handleApiMounted"></component>
      <Portal to="#toc-anchor">
        <Anchor :offset="15">
          <AnchorLink v-for="item in anchors" :key="item" :to="`#${item}`">
            {{ item.toUpperCase() }}
          </AnchorLink>
        </Anchor>
      </Portal>
    </div>
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
import { ref, computed, watch, inject, nextTick } from 'vue'
import { Spinner } from '@vexip-ui/icons'
import { noop } from '@vexip-ui/utils'
import Demo from '@docs/common/demo.vue'
import { ussTocAnchor } from './toc-anchor'

import type { PropType } from 'vue'

interface Example {
  demo: Record<string, any>,
  desc: Record<string, any>,
  code: string
}

const props = defineProps({
  desc: {
    type: Object,
    default: null
  },
  examples: {
    type: Array as PropType<Example[]>,
    default: () => []
  },
  api: {
    type: Object,
    default: null
  }
})

const prefix = 'component-doc'

const refreshScroll = inject<() => void>('refreshScroll', noop)
const { anchors, wrapper, refreshAnchor } = ussTocAnchor()

const descLoaded = ref(false)

watch(descLoaded, value => value && refresh())

function handleDescMounted() {
  descLoaded.value = true
}

const mountedDemoCount = ref(0)
const allDemosLoaded = ref(false)

watch(
  () => props.examples,
  () => {
    mountedDemoCount.value = 0
    allDemosLoaded.value = false
  }
)
watch(allDemosLoaded, value => value && refresh())

function handleDemoMounted() {
  mountedDemoCount.value++

  if (mountedDemoCount.value === props.examples.length) {
    allDemosLoaded.value = true
  }
}

const apiLoaded = ref(false)

watch(apiLoaded, value => value && refresh())

function handleApiMounted() {
  apiLoaded.value = true
}

const allLoaded = computed(() => {
  return descLoaded.value && allDemosLoaded.value && apiLoaded.value
})

function refresh() {
  nextTick(() => {
    refreshScroll?.()
    refreshAnchor()
  })
}
</script>

<style lang="scss">
.component-doc {
  position: relative;
  padding: 1.2em 3.2em;
  padding-right: 13em;

  &__loading {
    position: absolute;
    top: 1em;
    right: 1em;
    color: var(--vxp-content-color-secondary);
  }

  &__desc p {
    margin: 3px 0;
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
