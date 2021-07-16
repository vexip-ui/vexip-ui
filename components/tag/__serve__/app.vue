<template>
  <Tag
    v-for="tag in tags"
    :key="tag.type"
    :type="tag.type"
    size="small"
    closable
    circle
  >
    标签
  </Tag>
  <br />
  <br />
  <Tag
    v-for="tag in tags"
    :key="tag.type"
    :type="tag.type"
    border
    closable
    circle
  >
    标签
  </Tag>
  <br />
  <br />
  <Tag
    v-for="tag in tags"
    :key="tag.type"
    :type="tag.type"
    simple
    closable
    size="large"
    circle
  >
    标签
  </Tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Tag } from '..'

import type { TagType } from '../symbol'

export default defineComponent({
  name: 'App',
  components: {
    Tag
  },
  setup() {
    return {
      tags: [
        { type: 'default' },
        { type: 'primary' },
        { type: 'info' },
        { type: 'success' },
        { type: 'error' },
        { type: 'warning' },
        { type: 'lime' },
        { type: 'pink' },
        { type: 'magenta' },
        { type: 'tomato' },
        { type: 'orange' },
        { type: 'cyan' },
        { type: 'navy' },
        { type: 'gold' },
        { type: 'purple' }
      ] as { type: TagType }[]
    }
  }
})
</script>

<style lang="scss"></style>
