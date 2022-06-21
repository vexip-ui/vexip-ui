<template>
  <Article ref="article" :class="prefix">
    <div :class="`${prefix}__desc`">
      <template v-if="desc">
        <component :is="desc" @mounted="handleDescMounted"></component>
      </template>
    </div>
  </Article>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, markRaw, watch, watchEffect, inject } from 'vue'
import Article from './article.vue'
import { noop } from '@vexip-ui/utils'

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

const prefix = 'guide-doc'
const article = ref<InstanceType<typeof Article> | null>(null)

const refreshScroll = inject<() => void>('refreshScroll', noop)

const desc = ref<Record<string, any> | null>(null)
const descLoaded = ref(false)

watch(descLoaded, value => value && refresh())

function refresh() {
  requestAnimationFrame(() => {
    refreshScroll?.()
    article.value?.refreshAnchor()
  })
}

function handleDescMounted() {
  descLoaded.value = true
}

async function internalInit(name: string, language: string) {
  descLoaded.value = false
  language = language || __ROLLBACK_LANG__

  desc.value = markRaw(defineAsyncComponent(() => import(`../guides/${name}/desc.${language}.md`)))
}

watchEffect(async () => {
  await internalInit(props.name, props.language)
})
</script>

<style lang="scss">
.guide-doc {
  & > p {
    margin: 3px;
  }
}
</style>
