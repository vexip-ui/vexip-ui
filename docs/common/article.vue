<template>
  <article ref="wrapper" class="article">
    <slot></slot>
    <Portal to="#toc-anchor">
      <Anchor :offset="15">
        <AnchorLink v-for="item in anchors" :key="item.id" :to="`#${item.id}`">
          {{ item.name }}
        </AnchorLink>
      </Anchor>
    </Portal>
  </article>
</template>

<script setup lang="ts">
import { ussTocAnchor } from './toc-anchor'

const { anchors, wrapper, refreshAnchor } = ussTocAnchor(3)

defineExpose({ refreshAnchor })
</script>

<style lang="scss">
@use '../style/mixins.scss' as *;

.article {
  position: relative;
  padding: 16px 30px 30px;

  @include query-media('lg') {
    padding: 16px 60px 60px;
  }

  @include query-media('xl') {
    padding-right: calc(var(--anchor-width) + 50px);
  }
}
</style>
