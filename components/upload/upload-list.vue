<template>
  <transition-group
    v-if="type === 'thumbnail'"
    tag="ul"
    :appear="selectToAdd"
    :name="`${prefix}-list-transition`"
    :class="`${prefix}__files`"
    :style="style"
  >
    <UploadFile
      v-for="item in files"
      :key="item.id"
      :file="item"
      :icon-renderer="iconRenderer"
      :list-type="type"
      :loading-text="loadingText"
      :select-to-add="selectToAdd"
      @on-delete="$emit('on-delete', $event)"
      @on-preview="$emit('on-preview', $event)"
    >
      <template #default="{ file, status: _status, percentage }">
        <slot
          name="item"
          :file="file"
          :status="_status"
          :percentage="percentage"
        ></slot>
      </template>
      <template #icon="{ file }">
        <slot name="icon" :file="file"></slot>
      </template>
    </UploadFile>
  </transition-group>
  <ul v-else :class="`${prefix}__files`" :style="style">
    <UploadFile
      v-for="item in files"
      :key="item.id"
      :file="item"
      :icon-renderer="iconRenderer"
      :list-type="type"
      :loading-text="loadingText"
      :select-to-add="selectToAdd"
      @on-delete="$emit('on-delete', $event)"
      @on-preview="$emit('on-preview', $event)"
    >
      <template #default="{ file, status: _status, percentage }">
        <slot
          name="item"
          :file="file"
          :status="_status"
          :percentage="percentage"
        ></slot>
      </template>
      <template #icon="{ file }">
        <slot name="icon" :file="file"></slot>
      </template>
    </UploadFile>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UploadFile from './upload-file.vue'
import { useConfiguredProps } from '@/common/config/install'

import type { PropType, StyleValue } from 'vue'
import type { UploadListType, RenderFn, FileState } from './symbol'

const props = useConfiguredProps('uploadList', {
  files: {
    type: Array as PropType<FileState[]>,
    default: () => []
  },
  selectToAdd: {
    type: Boolean,
    default: false
  },
  iconRenderer: {
    type: Function as PropType<RenderFn>,
    default: null
  },
  type: {
    default: 'name' as UploadListType,
    validator: (value: UploadListType) => {
      return ['name', 'detail', 'thumbnail', 'card'].includes(value)
    }
  },
  loadingText: {
    type: String,
    default: null
  },
  style: {
    type: [String, Object] as PropType<string | StyleValue>,
    default: null
  }
})

export default defineComponent({
  name: 'UploadList',
  components: {
    UploadFile
  },
  props,
  emits: ['on-preview', 'on-delete'],
  setup() {
    return {
      prefix: 'vxp-upload'
    }
  }
})
</script>
