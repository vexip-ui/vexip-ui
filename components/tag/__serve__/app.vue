<template>
  <Tag
    v-for="tag in tags"
    :key="tag.type"
    :type="tag.type"
    closable
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
  >
    标签
  </Tag>
  <br />
  <br />
  <Tag
    v-for="tag in tags"
    :key="tag.type"
    closable
    :type="tag.type"
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
