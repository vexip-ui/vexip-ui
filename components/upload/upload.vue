<template>
  <div :id="idFor" :class="className">
    <div
      ref="control"
      :class="{
        [nh.be('control')]: true,
        [nh.bem('control', 'drag-over')]: isDragOver
      }"
      tabindex="-1"
      @click="handleClick"
      @drop.prevent="handleDrop"
      @dragover.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
      @keydown.enter="handleClick"
      @keydown.space="handleClick"
    >
      <input
        v-if="!props.disabledClick"
        ref="input"
        type="file"
        :class="nh.be('input')"
        :disabled="props.disabled"
        :multiple="props.multiple"
        :accept="acceptString"
        :webkitdirectory="props.directory"
        @change="handleInputChange"
      />
      <slot :is-drag-over="(props.allowDrag || props.disabledClick) && isDragOver">
        <template v-if="!props.allowDrag && !props.disabledClick">
          <Button
            ref="button"
            :size="size"
            :icon="IUpload"
            :type="props.state"
            :disabled="props.disabled"
            :loading="props.loading"
            :loading-icon="props.loadingIcon"
            :loading-spin="props.loadingSpin"
          >
            {{ props.buttonLabel ?? locale.upload }}
          </Button>
          <slot name="tip">
            <p v-if="props.tip" :class="nh.be('tip')">
              {{ props.tip }}
            </p>
          </slot>
        </template>
        <div
          v-else
          ref="panel"
          :class="[nh.be('drag-pane'), props.disabled && nh.bem('drag-pane', 'disabled')]"
          tabindex="0"
        >
          <Icon :class="[nh.be('cloud'), props.disabled && nh.bem('cloud', 'disabled')]" :scale="4">
            <CloudArrowUp></CloudArrowUp>
          </Icon>
          <slot name="tip">
            <p :class="nh.be('tip')">
              {{ props.tip || locale.dragOrClick }}
            </p>
          </slot>
          <Icon
            :class="nh.be('loading-icon')"
            :spin="props.loadingSpin"
            :pulse="!props.loadingSpin"
            :icon="props.loadingIcon"
            :style="{ opacity: props.loading ? '100%' : '0%' }"
          ></Icon>
        </div>
      </slot>
    </div>
    <UploadList
      v-if="!props.hiddenFiles"
      :files="renderFiles"
      :select-to-add="props.selectToAdd"
      :type="props.listType"
      :icon-renderer="props.iconRenderer"
      :loading-text="props.loadingText"
      :can-preview="props.canPreview"
      :style="{
        [(props.selectToAdd ? 'marginBottom' : 'marginTop') as any]:
          !props.hiddenFiles && renderFiles.length ? '0.5em' : undefined
      }"
      @delete="handleDelete"
      @preview="handlePreview"
    >
      <template #item="{ file, status: _status, percentage }">
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
    </UploadList>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onBeforeUnmount } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import UploadList from './upload-list.vue'
import { useFieldStore } from '@/components/form'
import {
  useNameHelper,
  useProps,
  useLocale,
  stateProp,
  booleanProp,
  createStateProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { isClient, noop, isDefined, isFalse, isPromise, randomString } from '@vexip-ui/utils'
import { CloudArrowUp, Upload as IUpload, Spinner } from '@vexip-ui/icons'
import { upload } from './request'
import { StatusType, uploadListTypes } from './symbol'

import type { PropType, Ref } from 'vue'
import type {
  UploadListType,
  BeforeUpload,
  BeforeSelect,
  RenderFn,
  HttpError,
  SourceFile,
  FileState,
  FileOptions,
  DirectoryEntity
} from './symbol'

function getDefaultFileState(): FileState {
  return {
    id: randomString(),
    name: '',
    size: 0,
    type: '',
    base64: null,
    status: StatusType.PENDING,
    percentage: 0,
    source: null,
    url: null,
    path: '',
    xhr: null,
    response: null,
    error: null
  }
}

export default defineComponent({
  name: 'Upload',
  components: {
    Button,
    Icon,
    UploadList,
    CloudArrowUp
  },
  props: {
    state: stateProp,
    url: String,
    fileList: Array as PropType<FileOptions[]>,
    multiple: booleanProp,
    tip: String,
    accept: [String, Array] as PropType<string | string[]>,
    filter: [String, Array] as PropType<string | string[]>,
    maxSize: Number,
    field: String,
    data: Object as PropType<Record<string, string | Blob>>,
    headers: Object as PropType<Record<string, string>>,
    withCredentials: booleanProp,
    manual: booleanProp,
    hiddenFiles: booleanProp,
    countLimit: Number,
    allowDrag: booleanProp,
    onBeforeUpload: Function as PropType<BeforeUpload>,
    onBeforeSelect: Function as PropType<BeforeSelect>,
    iconRenderer: Function as PropType<RenderFn>,
    selectToAdd: booleanProp,
    listType: String as PropType<UploadListType>,
    block: booleanProp,
    loadingText: String,
    directory: booleanProp,
    pathField: String,
    disabledClick: booleanProp,
    buttonLabel: String,
    disabled: booleanProp,
    loading: booleanProp,
    loadingIcon: Object,
    loadingLock: booleanProp,
    loadingSpin: booleanProp,
    defaultFiles: Array as PropType<FileOptions[]>,
    canPreview: Function as PropType<(file: FileState) => boolean>,
    onExceed: eventProp<(files: FileState[]) => void>(),
    onChange: eventProp<(files: FileState[]) => void>(),
    onFilterError: eventProp<(files: FileState) => void>(),
    onSizeError: eventProp<(files: FileState) => void>(),
    onDelete: eventProp<(file: FileState) => void>(),
    onPreview: eventProp<(file: FileState) => void>(),
    onProgress: eventProp<(file: FileState, percent: number) => void>(),
    onSuccess: eventProp<(file: FileState, response: any) => void>(),
    onError: eventProp<(file: FileState, error: HttpError) => void>()
  },
  emits: ['update:file-list'],
  setup(_props, { emit }) {
    const { idFor, state, disabled, loading, size, validateField, getFieldValue, setFieldValue } =
      useFieldStore<FileOptions[]>(() => {
        if (button.value?.$el) {
          button.value.$el.focus()
        } else {
          panel.value?.focus()
        }
      })

    const props = useProps('upload', _props, {
      state: createStateProp(state),
      url: {
        default: '',
        static: true
      },
      fileList: {
        default: () => getFieldValue([]),
        static: true
      },
      multiple: false,
      tip: '',
      accept: null,
      filter: '',
      maxSize: {
        default: null,
        validator: (value: number) => value >= 0
      },
      field: 'file',
      data: () => ({}),
      headers: () => ({}),
      withCredentials: false,
      manual: false,
      hiddenFiles: false,
      countLimit: {
        default: 0,
        validator: (value: number) => value >= 0
      },
      allowDrag: false,
      onBeforeUpload: {
        default: null,
        isFunc: true
      },
      onBeforeSelect: {
        default: null,
        isFunc: true
      },
      iconRenderer: {
        default: null,
        isFunc: true
      },
      selectToAdd: false,
      listType: {
        default: 'name' as UploadListType,
        validator: (value: UploadListType) => uploadListTypes.includes(value)
      },
      block: false,
      loadingText: null,
      directory: false,
      pathField: 'path',
      disabledClick: false,
      buttonLabel: null,
      disabled: () => disabled.value,
      loading: () => loading.value,
      loadingIcon: Spinner,
      loadingLock: false,
      loadingSpin: false,
      defaultFiles: () => []
    })

    const nh = useNameHelper('upload')
    const fileStates = ref([]) as Ref<FileState[]>
    const isDragOver = ref(false)

    const input = ref<HTMLInputElement | null>(null)
    const button = ref<InstanceType<typeof Button> | null>(null)
    const panel = ref<HTMLElement | null>(null)

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(`type-${props.listType}`),
        {
          [nh.bm(props.state)]: props.state !== 'default',
          [nh.bm('multiple')]: props.multiple,
          [nh.bm('drag')]: props.allowDrag,
          [nh.bm('to-add')]: props.selectToAdd,
          [nh.bm('block')]: props.block,
          [nh.bm('drag-only')]: props.disabledClick
        }
      ]
    })
    const acceptString = computed(() => {
      const accept = props.accept

      return accept && (typeof accept === 'string' ? accept : accept.join())
    })
    const defaultList = computed(() => props.defaultFiles.map(file => createFileState(file)))
    const renderFiles = computed(() => {
      return defaultList.value
        .concat(fileStates.value)
        .filter(item => item.status !== StatusType.DELETE)
    })

    watch(
      () => props.fileList,
      value => {
        const idMap = new Map<string | number, FileState>()
        const fileMap = new Map<SourceFile, FileState>()

        for (const state of fileStates.value) {
          if (isDefined(state.id)) {
            idMap.set(state.id, state)
          }

          if (state.source) {
            fileMap.set(state.source, state)
          }
        }

        fileStates.value = value.map(file =>
          createFileState(
            file,
            file.id ? idMap.get(file.id) : file.source ? fileMap.get(file.source) : undefined
          )
        )
        syncInputFiles()
      },
      { immediate: true }
    )

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
      const shouldAdd = props.selectToAdd
      const files = shouldAdd ? Array.from(fileStates.value) : []

      for (const file of originFiles) {
        if (!file.path) {
          file.path = file.webkitRelativePath
        }

        let fileState = getFileStateBySource(file)

        if (fileState) {
          if (
            fileState.status !== StatusType.SUCCESS &&
            fileState.status !== StatusType.UPLOADING
          ) {
            fileState.status = StatusType.PENDING
          }
        } else {
          fileState = createFileState({
            name: file.name,
            size: file.size,
            type: file.type,
            source: file
          })
        }

        if (typeof props.onBeforeSelect === 'function') {
          let result = props.onBeforeSelect(fileState, files)

          if (isPromise(result)) {
            result = await result
          }

          if (isFalse(result)) continue
        }

        if (!files.includes(fileState)) {
          files.push(fileState)
        }
      }

      const countLimit = props.countLimit

      if (countLimit > 0 && files.length > countLimit) {
        const exceedFiles = files.slice(countLimit)

        emitEvent(props.onExceed, exceedFiles)
        fileStates.value = files.slice(0, countLimit)
      } else {
        fileStates.value = files
      }

      syncInputFiles()
      emitChangeEvent()

      if (!props.manual) {
        execute()
      }
    }

    function emitChangeEvent() {
      setFieldValue(fileStates.value)
      emitEvent(props.onChange, fileStates.value)
      emit('update:file-list', fileStates.value)
      validateField()
    }

    function getFileStateBySource(file: SourceFile) {
      const { name, size, type } = file
      const path = file.path || file.webkitRelativePath

      return fileStates.value.find(({ source }) => {
        return (
          source &&
          (source.path || source.webkitRelativePath) === path &&
          source.name === name &&
          source.size === size &&
          source.type === type
        )
      })
    }

    function createFileState(file: FileOptions, defaults = getDefaultFileState()): FileState {
      const { id, name, size, type, base64, status, percentage, source, url, path } = file

      Object.assign(defaults, {
        id: id ?? defaults.id ?? randomString(),
        name: name || '',
        size: size || 0,
        type: type || '',
        base64: base64 || null,
        status: status ?? StatusType.PENDING,
        percentage: percentage || 0,
        source: source || null,
        url: url || null,
        path: path || '',
        xhr: null,
        response: null,
        error: null
      })

      return defaults
    }

    function getFileExtension(file: FileState) {
      return file.name.split('.').pop()!.toLocaleLowerCase()
    }

    function execute() {
      if (!props.url || !verifyFiles()) {
        return false
      }

      const uploadFiles = fileStates.value.filter(
        item => item.status !== StatusType.SUCCESS && item.status !== StatusType.DELETE
      )
      const requests: Promise<any>[] = []

      for (const file of uploadFiles) {
        requests.push(uploadFile(file).catch(noop))
      }

      return Promise.all(requests).then(responses => responses.filter(response => response))
    }

    async function uploadFile(file: FileState) {
      if (typeof props.onBeforeUpload === 'function') {
        let result = props.onBeforeUpload(
          file,
          fileStates.value.filter(
            item => item.status !== StatusType.SUCCESS && item.status !== StatusType.DELETE
          )
        )

        if (isPromise(result)) {
          try {
            result = await result
          } catch (e) {
            return
          }
        }

        if (isFalse(result)) return

        if (result instanceof Blob) {
          if (result instanceof File) {
            file.source = result
          } else {
            file.source = new File([result], file.name, {
              type: file.type
            })
          }
        }
      }

      if (!file.source) return

      file.status = StatusType.UPLOADING

      const { url, headers, withCredentials, data, field, pathField } = props

      return await new Promise((resolve, reject) => {
        file.xhr = upload({
          url,
          headers,
          withCredentials,
          data,
          field,
          pathField,
          file: file.source!,
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

      for (let i = 0, len = fileStates.value.length; i < len; ++i) {
        const file = fileStates.value[i]
        const extension = getFileExtension(file)

        if (filter.length && !filter.includes(extension)) {
          emitEvent(props.onFilterError, file)

          return false
        }

        if (file.size > limitSize) {
          emitEvent(props.onSizeError, file)

          return false
        }
      }

      return true
    }

    function handleDelete(file: FileState) {
      file.status = StatusType.DELETE

      if (file.xhr) {
        file.xhr.abort()
      }

      syncInputFiles()
      emitEvent(props.onDelete, file)
      emitChangeEvent()
    }

    function handlePreview(file: FileState) {
      emitEvent(props.onPreview, file)
    }

    function syncInputFiles() {
      if (!isClient) return

      const dataTransfer = new DataTransfer()
      fileStates.value = fileStates.value.filter(item => item.status !== StatusType.DELETE)

      fileStates.value.forEach(item => {
        item.source && dataTransfer.items.add(item.source)
      })

      if (input.value) {
        input.value.files = dataTransfer.files
      }
    }

    function handleProgress(percent: number, file: FileState) {
      if (file.status === StatusType.DELETE) return

      file.percentage = percent

      emitEvent(props.onProgress, file, percent)
      emitChangeEvent()
    }

    function handleSuccess(response: any, file: FileState) {
      if (file.status === StatusType.DELETE) return

      file.status = StatusType.SUCCESS
      file.response = response
      file.error = null

      emitEvent(props.onSuccess, file, response)
      emitChangeEvent()
    }

    function handleError(error: HttpError, file: FileState) {
      if (file.status === StatusType.DELETE) return

      file.status = StatusType.FAIL
      file.error = error

      emitEvent(props.onError, file, error)
      emitChangeEvent()
    }

    let dragTimer: ReturnType<typeof setTimeout>

    onBeforeUnmount(() => {
      clearTimeout(dragTimer)
    })

    async function handleDrop(event: DragEvent) {
      if (!props.allowDrag) return

      clearTimeout(dragTimer)

      isDragOver.value = false

      if (event.dataTransfer) {
        const files = await collectDropFiles(event.dataTransfer)

        files.length && handleFilesChange(files)
      }
    }

    function handleDragEnter() {
      if (!props.allowDrag) return

      clearTimeout(dragTimer)

      isDragOver.value = true
    }

    function handleDragLeave() {
      if (!props.allowDrag) return

      dragTimer = setTimeout(() => {
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
        if (!entity) return files

        if (entity.isFile) {
          collectedFiles.push(files[i])
        } else {
          dirLoop.push({ dir: entity as unknown as DirectoryEntity, prefix: '' })
          // directories.push(entity as unknown as DirectoryEntity)
        }
      }

      if (!props.directory || !dirLoop.length) return collectedFiles

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
      IUpload,

      props,
      nh,
      locale: useLocale('upload'),
      size,
      idFor,
      fileStates,
      isDragOver,

      className,
      acceptString,
      renderFiles,

      input,
      button,
      panel,

      handleClick,
      handleInputChange,
      handleDelete,
      handlePreview,
      handleDrop,
      handleDragEnter,
      handleDragLeave,

      execute
    }
  }
})
</script>
