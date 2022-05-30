<template>
  <article ref="wrapper" :class="prefix">
    <div :class="`${prefix}__desc`">
      <template v-if="desc">
        <component :is="desc" @mounted="handleDescMounted"></component>
      </template>
    </div>
    <Portal to="#toc-anchor">
      <Anchor :offset="15">
        <AnchorLink
          v-for="item in anchors"
          :key="item.id"
          :to="`#${item.id}`"
        >
          {{ item.name }}
        </AnchorLink>
      </Anchor>
    </Portal>
  </article>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, markRaw, watch, watchEffect, inject } from 'vue'
import { noop } from '@vexip-ui/utils'
import { ussTocAnchor } from './toc-anchor'

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

const refreshScroll = inject<() => void>('refreshScroll', noop)
const { wrapper, anchors, refreshAnchor } = ussTocAnchor()

const desc = ref<Record<string, any> | null>(null)
const descLoaded = ref(false)

watch(descLoaded, value => value && refresh())

function refresh() {
  requestAnimationFrame(() => {
    refreshScroll?.()
    refreshAnchor()
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
  padding: 1.2em 3.2em 2.8em;
  padding-right: 15em;

  & > p {
    margin: 3px;
  }
}
</style>
