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

<script lang="ts">
import { UploadFile } from '@/components/upload-file'

import { computed, defineComponent } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { uploadListProps } from './props'
import { uploadListTypes } from './symbol'

import type { FileState } from './symbol'

export default defineComponent({
  name: 'UploadList',
  components: {
    UploadFile
  },
  props: uploadListProps,
  emits: [],
  setup(_props) {
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

    const nh = useNameHelper('upload')
    const transitionName = computed(() => nh.ns('fade'))

    function handleDelete(file: FileState) {
      emitEvent(props.onDelete, file)
    }

    function handlePreview(file: FileState) {
      emitEvent(props.onPreview, file)
    }

    return {
      props,
      nh,
      transitionName,

      handleDelete,
      handlePreview
    }
  }
})
</script>
