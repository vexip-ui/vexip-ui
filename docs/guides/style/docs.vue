<template>
  <article ref="wrapper" class="doc-wrapper">
    <Desc></Desc>
    <Portal to="#toc-anchor">
      <Anchor :offset="15">
        <AnchorLink
          v-for="item in anchors"
          :key="item"
          :to="`#${item}`"
        >
          {{ item.toUpperCase() }}
        </AnchorLink>
      </Anchor>
    </Portal>
  </article>
</template>

<script setup lang="ts">
import Desc from './desc.zh-CN.md'
import { ussTocAnchor } from '@docs/common/toc-anchor'

const { wrapper, anchors } = ussTocAnchor()
</script>
