<template>
  <Tag
    v-for="tag in tags"
    :key="tag.key"
    :type="tag.type"
    closable
  >
    标签
  </Tag>
  <br />
  <br />
  <Tag
    v-for="tag in tags"
    :key="tag.key"
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
    :key="tag.key"
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
    :key="tag.key"
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
        { key: 0, type: 'default' },
        { key: 1, type: 'primary' },
        { key: 2, type: 'success' },
        { key: 3, type: 'error' },
        { key: 4, type: 'warning' }
      ] as { key: number, type: TagType }[]
    }
  }
})
</script>

<style lang="scss"></style>
