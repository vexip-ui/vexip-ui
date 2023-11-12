<script setup lang="ts">
import { UploadFile } from '@/components/upload-file'

import { computed } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { uploadListProps } from './props'
import { uploadListTypes } from './symbol'

import type { UploadFileState, UploadStatus } from './symbol'

defineOptions({ name: 'UploadList' })

const _props = defineProps(uploadListProps)
const props = useProps('uploadList', _props, {
  files: {
    default: () => [],
    static: true
  },
  selectToAdd: false,
  iconRenderer: {
    default: null,
    isFunc: true
  },
  type: {
    default: 'name',
    validator: value => uploadListTypes.includes(value)
  },
  loadingText: null,
  style: null,
  precision: 2
  // 'canPreview' using UploadFile default
})

defineSlots<{
  item: (params: { file: UploadFileState, status: UploadStatus, percentage: number }) => any,
  icon: (params: { file: UploadFileState }) => any,
  suffix: () => any
}>()

const nh = useNameHelper('upload')
const transitionName = computed(() => nh.ns('fade'))

function handleDelete(file: UploadFileState) {
  emitEvent(props.onDelete, file)
}

function handlePreview(file: UploadFileState) {
  emitEvent(props.onPreview, file)
}
</script>

<template>
  <ul
    :class="[nh.be('files'), nh.bs('vars'), props.inherit && nh.bem('files', 'inherit')]"
    :style="props.style"
  >
    <Transition
      v-for="item in props.files"
      :key="item.id"
      appear
      :name="props.selectToAdd ? transitionName : undefined"
    >
      <UploadFile
        inherit
        :file="item"
        :icon-renderer="props.iconRenderer"
        :list-type="props.type"
        :loading-text="props.loadingText"
        :select-to-add="props.selectToAdd"
        :precision="props.precision"
        :can-preview="props.canPreview"
        @delete="handleDelete"
        @preview="handlePreview"
      >
        <template #default="{ file, status, percentage }">
          <slot
            name="item"
            :file="file"
            :status="status"
            :percentage="percentage"
          ></slot>
        </template>
        <template #icon="{ file }">
          <slot name="icon" :file="file"></slot>
        </template>
      </UploadFile>
    </Transition>
    <slot name="suffix"></slot>
  </ul>
</template>
