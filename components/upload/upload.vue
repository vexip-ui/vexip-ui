<template>
  <div :class="className">
    <div
      :class="{
        [`${prefix}__control`]: true,
        [`${prefix}__control--drag-over`]: isDragOver
      }"
      @click="handleClick"
      @drop.prevent="handleDrop"
      @dragover.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
    >
      <input
        v-if="!disabledClick"
        ref="input"
        type="file"
        :class="`${prefix}__input`"
        :multiple="multiple"
        :accept="acceptString"
        :webkitdirectory="directory"
        @change="handleInputChange"
      />
      <slot>
        <template v-if="!allowDrag">
          <Button icon="upload">
            {{ locale.upload }}
          </Button>
          <slot name="tip">
            <p v-if="tip" :class="`${prefix}__tip`">
              {{ tip }}
            </p>
          </slot>
        </template>
        <div v-else :class="`${prefix}__drag-pane`">
          <Icon name="cloud-upload-alt" :class="`${prefix}__cloud`" :scale="4"></Icon>
          <slot name="tip">
            <p :class="`${prefix}__tip`">
              {{ tip || locale.dragOrClick }}
            </p>
          </slot>
        </div>
      </slot>
    </div>
    <template v-if="!hiddenFiles">
      <transition-group
        v-if="listType === 'thumbnail'"
        tag="ul"
        :appear="selectToAdd"
        :name="`${prefix}-list-transition`"
        :class="`${prefix}__files`"
        :style="{
          [selectToAdd ? 'marginBottom' : 'marginTop']:
            !hiddenFiles && renderFiles.length ? '0.5em' : null
        }"
      >
        <UploadFile
          v-for="item in renderFiles"
          :key="item.id"
          :file="item"
          :icon-renderer="iconRenderer"
          :list-type="listType"
          :loading-text="loadingText"
          :select-to-add="selectToAdd"
          @on-delete="deleteFile"
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
      <ul
        v-else
        :class="`${prefix}__files`"
        :style="{
          [selectToAdd ? 'marginBottom' : 'marginTop']:
            !hiddenFiles && renderFiles.length ? '0.5em' : null
        }"
      >
        <UploadFile
          v-for="item in renderFiles"
          :key="item.id"
          :file="item"
          :icon-renderer="iconRenderer"
          :list-type="listType"
          :loading-text="loadingText"
          :select-to-add="selectToAdd"
          @on-delete="deleteFile"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import UploadFile from './upload-file.vue'
import { upload } from './request'
import { useConfiguredProps } from '@/common/config/install'
import { useLocaleConfig } from '@/common/config/locale'
import { isFalse, isFunction, isPromise, randomString } from '@/common/utils/common'
import { UploadStatusType } from './symbol'

import '@/common/icons/cloud-upload-alt'
import '@/common/icons/upload'

import type { PropType } from 'vue'
import type {
  UploadListType,
  BeforeFn,
  RenderFn,
  HttpError,
  SourceFile,
  FileState,
  DirectoryEntity
} from './symbol'

const props = useConfiguredProps('upload', {
  url: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  tip: {
    type: String,
    default: ''
  },
  accept: {
    type: [String, Array] as PropType<string | string[]>,
    default: null
  },
  filter: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  maxSize: {
    type: Number,
    default: null,
    validator: (value: number) => value >= 0
  },
  field: {
    type: String,
    default: 'file'
  },
  data: {
    type: Object as PropType<Record<string, string | Blob>>,
    default: () => ({})
  },
  headers: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  },
  withCredentials: {
    type: Boolean,
    default: false
  },
  manual: {
    type: Boolean,
    default: false
  },
  hiddenFiles: {
    type: Boolean,
    default: false
  },
  countLimit: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0
  },
  allowDrag: {
    type: Boolean,
    default: false
  },
  beforeUpload: {
    type: Function as PropType<BeforeFn>,
    default: null
  },
  beforeSelect: {
    type: Function as PropType<BeforeFn>,
    default: null
  },
  iconRenderer: {
    type: Function as PropType<RenderFn>,
    default: null
  },
  selectToAdd: {
    type: Boolean,
    default: false
  },
  listType: {
    default: 'name' as UploadListType,
    validator: (value: UploadListType) => {
      return ['name', 'detail', 'thumbnail', 'card'].includes(value)
    }
  },
  block: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: null
  },
  directory: {
    type: Boolean,
    default: false
  },
  pathField: {
    type: String,
    default: 'path'
  },
  disabledClick: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Upload',
  components: {
    Button,
    Icon,
    UploadFile
  },
  props,
  emits: [
    'on-exceed',
    'on-change',
    'on-filter-error',
    'on-size-error',
    'on-delete',
    'on-progress',
    'on-success',
    'on-error',
    'on-preview'
  ],
  setup(props, { emit }) {
    const prefix = 'vxp-upload'
    const fileStates = ref<FileState[]>([])
    const isDragOver = ref(false)

    const input = ref<HTMLInputElement | null>(null)

    const className = computed(() => {
      return [
        prefix,
        `${prefix}--type-${props.listType}`,
        {
          [`${prefix}--multiple`]: props.multiple,
          [`${prefix}--drag`]: props.allowDrag,
          [`${prefix}--to-add`]: props.selectToAdd,
          [`${prefix}--block`]: props.block
        }
      ]
    })
    const acceptString = computed(() => {
      const accept = props.accept

      return accept && (typeof accept === 'string' ? accept : accept.join())
    })
    const renderFiles = computed(() => {
      return fileStates.value.filter(item => item.status !== UploadStatusType.DELETE)
    })

    function handleClick() {
      !props.disabledClick && input.value?.click()
    }

    function handleInputChange(event: Event) {
      const target = event.target as HTMLInputElement

      if (target?.files) {
        handleFilesChange(target.files)
      }
    }

    async function handleFilesChange(inputFiles: FileList | SourceFile[]) {
      const originFiles = Array.from(inputFiles || []) as SourceFile[]
      const files = props.selectToAdd ? fileStates.value : []

      for (const file of originFiles) {
        if (!file.path) {
          file.path = file.webkitRelativePath
        }

        if (isFunction(props.beforeSelect)) {
          let result = props.beforeSelect(file, props.selectToAdd ? getSourceFiles() : [])

          if (isPromise(result)) {
            result = await result
          }

          if (isFalse(result)) continue
        }

        let fileState = getFileStateBySource(file)

        if (fileState) {
          if (
            fileState.status !== UploadStatusType.SUCCESS &&
            fileState.status !== UploadStatusType.UPLOADING
          ) {
            fileState.status = UploadStatusType.PENDING
          }
        } else {
          fileState = createFileState(file)
        }

        if (!files.includes(fileState)) {
          files.push(fileState)
        }
      }

      const countLimit = props.countLimit

      if (countLimit > 0 && files.length > countLimit) {
        fileStates.value = files.slice(0, countLimit)

        const exceedFiles = files.slice(countLimit)

        emit(
          'on-exceed',
          exceedFiles.map(file => file.source),
          getSourceFiles()
        )
      } else {
        fileStates.value = files
      }

      const sourceFiles = getSourceFiles()

      syncInputFiles()
      emit('on-change', sourceFiles)

      if (!props.manual) {
        execute()
      }
    }

    function getFileStateBySource(file: SourceFile) {
      const { name, size, type } = file
      const path = file.path || file.webkitRelativePath

      return fileStates.value.find(({ source }) => {
        return (
          (source.path || source.webkitRelativePath) === path &&
          source.name === name &&
          source.size === size &&
          source.type === type
        )
      })
    }

    function createFileState(file: SourceFile): FileState {
      const { name, size, type } = file

      return {
        id: randomString(),
        name,
        size,
        type,
        base64: null,
        status: UploadStatusType.PENDING,
        percentage: 0,
        source: file,
        path: file.path || file.webkitRelativePath,
        xhr: null,
        response: null,
        error: null
      }
    }

    function getSourceFiles() {
      return fileStates.value.map(file => file.source)
    }

    function getFileExtension(file: FileState) {
      return file.name.split('.').pop()!.toLocaleLowerCase()
    }

    function execute() {
      if (!props.url || !verifyFiles()) {
        return false
      }

      const uploadFiles = fileStates.value.filter(
        item => item.status !== UploadStatusType.SUCCESS && item.status !== UploadStatusType.DELETE
      )
      const requests: Promise<any>[] = []

      for (const file of uploadFiles) {
        requests.push(uploadFile(file))
      }

      return Promise.all(requests).then(responses => responses.filter(response => response))
    }

    async function uploadFile(file: FileState) {
      if (isFunction(props.beforeUpload)) {
        let result = props.beforeUpload(
          file.source,
          fileStates.value
            .filter(
              item =>
                item.status !== UploadStatusType.SUCCESS && item.status !== UploadStatusType.DELETE
            )
            .map(item => item.source)
        )

        if (isPromise(result)) {
          result = await result
        }

        if (isFalse(result)) return
      }

      file.status = UploadStatusType.UPLOADING

      const { url, headers, withCredentials, data, field, pathField } = props

      return await new Promise((resolve, reject) => {
        file.xhr = upload({
          url,
          headers,
          withCredentials,
          data,
          field,
          pathField,
          file: file.source,
          onProgress: percent => {
            handleProgress(percent, file)
          },
          onSuccess: response => {
            handleSuccess(response, file)
            resolve(response)
          },
          onError: error => {
            handleError(error, file)
            reject(error)
          },
          onAbort: () => {
            resolve(null)
          }
        })
      })
    }

    function verifyFiles() {
      const limitSize = props.maxSize ? props.maxSize * 1024 : Infinity
      const filter =
        typeof props.filter === 'string'
          ? props.filter
            ? [props.filter]
            : []
          : props.filter.filter(item => item)

      for (let i = 0, len = fileStates.value.length; i < len; i++) {
        const file = fileStates.value[i]
        const extension = getFileExtension(file)

        if (filter.length && !filter.includes(extension)) {
          emit('on-filter-error', file.source)

          return false
        }

        if (file.size > limitSize) {
          emit('on-size-error', file.source)

          return false
        }
      }

      return true
    }

    function deleteFile(file: FileState) {
      file.status = UploadStatusType.DELETE

      if (file.xhr) {
        file.xhr.abort()
      }

      syncInputFiles()
      emit('on-delete', file.source)
    }

    function syncInputFiles() {
      const files = fileStates.value.filter(item => item.status !== UploadStatusType.DELETE)
      const dataTransfer = new DataTransfer()

      files.forEach(item => {
        dataTransfer.items.add(item.source)
      })

      if (input.value) {
        input.value.files = dataTransfer.files
      }
    }

    // 根据源文件删除
    // function handleDelete(originFile: File) {
    //   const file = fileStates.value.find(file => file.source === originFile)

    //   if (file && file.status !== UploadStatusType.DELETE) {
    //     deleteFile(file)
    //   }
    // }

    // function clear() {
    //   fileStates.value = []

    //   if (input.value) {
    //     input.value.value = ''
    //   }

    //   emit('on-change', [])
    // }

    // 根据源文件修改进度
    // function progress(originFile: File, percent: number) {
    //   const file = fileStates.value.find(file => file.source === originFile)

    //   if (file && file.status === UploadStatusType.UPLOADING) {
    //     file.percentage = percent
    //   }
    // }

    // function setStatus(originFile: File, status: UploadStatusType) {
    //   if (!Object.keys(UploadStatusType).includes(status)) return

    //   const file = fileStates.value.find(file => file.source === originFile)

    //   if (file) {
    //     file.status = status
    //   }
    // }

    function handleProgress(percent: number, file: FileState) {
      if (file.status === UploadStatusType.DELETE) return

      file.percentage = percent

      emit('on-progress', percent, file.source)
    }

    function handleSuccess(response: any, file: FileState) {
      if (file.status === UploadStatusType.DELETE) return

      file.status = UploadStatusType.SUCCESS
      file.response = response
      file.error = null

      emit('on-success', response, file.source)
    }

    function handleError(error: HttpError, file: FileState) {
      if (file.status === UploadStatusType.DELETE) return

      file.status = UploadStatusType.FAIL
      file.error = error

      emit('on-error', error, file.source)
    }

    let dragTimer: number

    async function handleDrop(event: DragEvent) {
      if (!props.allowDrag) return

      window.clearTimeout(dragTimer)

      isDragOver.value = false

      if (event.dataTransfer) {
        const files = await collectDropFiles(event.dataTransfer)

        files.length && handleFilesChange(files)
      }
    }

    function handleDragEnter() {
      if (!props.allowDrag) return

      window.clearTimeout(dragTimer)

      isDragOver.value = true
    }

    function handleDragLeave() {
      if (!props.allowDrag) return

      dragTimer = window.setTimeout(() => {
        isDragOver.value = false
      }, 100)
    }

    async function collectDropFiles(dataTransfer: DataTransfer) {
      const { items, files } = dataTransfer

      if (!items.length) return []

      const collectedFiles: File[] = []
      const dirLoop: Array<{ dir: DirectoryEntity, prefix: string }> = []
      const processes: Promise<void>[] = []

      for (let i = 0, len = items.length; i < len; ++i) {
        const entity = items[i].webkitGetAsEntry?.()

        // 内核不支持
        if (!entity) return []

        if (entity.isFile) {
          collectedFiles.push(files[i])
        } else {
          dirLoop.push({ dir: entity as unknown as DirectoryEntity, prefix: '' })
          // directories.push(entity as unknown as DirectoryEntity)
        }
      }

      if (!dirLoop.length) return collectedFiles

      const fileEntries: Array<{ entry: DirectoryEntity, prefix: string }> = []

      let countLimit = props.countLimit - (props.selectToAdd ? fileStates.value.length : 0)
      countLimit = Math.round(countLimit) > 0 ? countLimit : 100

      const doProcess = () => {
        while (dirLoop.length) {
          const loop = dirLoop.shift()!
          const dir = loop.dir
          const prefix = loop.prefix ? `${loop.prefix}/${dir.name}` : dir.name
          const reader = dir.createReader()

          processes.push(
            new Promise<void>(resolve => {
              reader.readEntries(entries => {
                entries.forEach(entry => {
                  if (entry.isFile) {
                    fileEntries.push({ entry, prefix })
                  } else {
                    dirLoop.push({ dir: entry, prefix })
                  }
                })

                resolve()
              })
            })
          )
        }
      }

      while (true) {
        doProcess()
        await Promise.all(processes)

        if (!dirLoop.length || fileEntries.length >= countLimit) {
          break
        }
      }

      if (fileEntries.length > 0) {
        return collectedFiles.concat(
          await Promise.all(
            fileEntries.map(
              ({ entry, prefix }) =>
                new Promise<File>(resolve =>
                  entry.file(file => {
                    file.path = `${prefix}/${file.name}`
                    resolve(file)
                  })
                )
            )
          )
        )
      }

      return collectedFiles
    }

    return {
      prefix,
      locale: useLocaleConfig('upload'),
      fileStates,
      isDragOver,

      className,
      acceptString,
      renderFiles,

      input,

      handleClick,
      handleInputChange,
      deleteFile,
      handleDrop,
      handleDragEnter,
      handleDragLeave,

      execute
    }
  }
})
</script>
