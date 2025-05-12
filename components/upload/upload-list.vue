<script setup lang="ts">
import { Renderer } from '@/components/renderer'
import { UploadFile } from '@/components/upload-file'

import { computed } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { uploadListProps } from './props'
import { uploadListTypes } from './symbol'

import type { UploadFileState, UploadListSlots } from './symbol'

defineOptions({ name: 'UploadList' })

const _props = defineProps(uploadListProps)
const props = useProps('uploadList', _props, {
  files: {
    default: () => [],
    static: true,
  },
  selectToAdd: false,
  iconRenderer: {
    default: null,
    isFunc: true,
  },
  type: {
    default: 'name',
    validator: value => uploadListTypes.includes(value),
  },
  loadingText: null,
  style: null,
  precision: 2,
  // 'canPreview' using UploadFile default
  slots: () => ({}),
})

const slots = defineSlots<UploadListSlots>()

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
        <template v-if="slots.item || props.slots.item" #default="{ file, status, percentage }">
          <slot
            name="item"
            :file="file"
            :status="status"
            :percentage="percentage"
          >
            <Renderer
              :renderer="props.slots.item"
              :data="{
                file,
                status,
                percentage
              }"
            ></Renderer>
          </slot>
        </template>
        <template v-if="slots.icon || props.slots.icon" #icon="{ file, status, percentage }">
          <slot
            name="icon"
            :file="file"
            :status="status"
            :percentage="percentage"
          >
            <Renderer :renderer="props.slots.icon" :data="{ file, status, percentage }"></Renderer>
          </slot>
        </template>
      </UploadFile>
    </Transition>
    <slot name="suffix">
      <Renderer :renderer="props.slots.suffix"></Renderer>
    </slot>
  </ul>
</template>
