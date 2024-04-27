<script setup lang="ts">
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { Progress } from '@/components/progress'
import { Renderer } from '@/components/renderer'

import { computed, toRef } from 'vue'

import { emitEvent, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { toFixed } from '@vexip-ui/utils'
import { uploadFileProps } from './props'
import { useFileIcons } from './file-icon'
import { StatusType, uploadListTypes } from './symbol'

import type { UploadFileState, UploadStatus } from './symbol'

defineOptions({ name: 'UploadFile' })

const imageExtRE = /\.(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i
const imageBase64RE = /^data:image\//

function isImage(file: UploadFileState) {
  if (file.type) {
    return file.type.startsWith('image/')
  }

  const { name, url, base64 } = file

  return !!(
    imageExtRE.test(name) ||
    (url && (imageExtRE.test(url) || imageBase64RE.test(url))) ||
    (base64 && imageBase64RE.test(base64))
  )
}

const _props = defineProps(uploadFileProps)
const props = useProps('uploadFile', _props, {
  locale: null,
  file: {
    default: () => ({}) as UploadFileState,
    static: true
  },
  iconRenderer: {
    default: null,
    isFunc: true
  },
  listType: {
    default: 'name',
    validator: value => uploadListTypes.includes(value)
  },
  loadingText: null,
  selectToAdd: false,
  precision: 2,
  canPreview: {
    default: isImage,
    isFunc: true
  }
})

defineSlots<{
  default: (params: { file: UploadFileState, status: UploadStatus, percentage: number }) => any,
  icon: (params: { file: UploadFileState }) => any
}>()

const nh = useNameHelper('upload')
const locale = useLocale('upload', toRef(props, 'locale'))
const icons = useIcons()
const fileIcons = useFileIcons(icons)

const useIconRenderer = computed(() => typeof props.iconRenderer === 'function')
const fileName = computed(() => props.file.path || props.file.name)
const percentage = computed(() => toFixed(props.file.percentage, props.precision))
const showThumb = computed(() => isImage(props.file) && (props.file.url || props.file.base64))

function getFileExtension(file: UploadFileState) {
  return file.name.split('.').pop()!.toLocaleLowerCase()
}

function getFileIcon(file: UploadFileState, scale = 1) {
  const extension = getFileExtension(file)
  const icon = extension
    ? fileIcons.value[extension] || fileIcons.value.default
    : fileIcons.value.default

  return { ...icon, scale: +(icon.scale || 1) * scale }
}

function handleDelete(file: UploadFileState) {
  emitEvent(props.onDelete, file)
}

function handlePreview(file: UploadFileState) {
  emitEvent(props.onPreview, file)
}

function imageToBase64(file: UploadFileState) {
  if (!file.source || !isImage(props.file)) return

  const reader = new FileReader()

  reader.readAsDataURL(file.source)
  reader.onload = () => {
    if (file.status !== StatusType.DELETE) {
      file.base64 = reader.result?.toString() ?? null
    }
  }
}
</script>

<template>
  <li
    :class="[
      nh.be('file'),
      nh.bem('file', props.listType),
      nh.bem('file', props.file.status),
      props.inherit && nh.bem('file', 'inherit')
    ]"
    :title="fileName"
    tabindex="-1"
  >
    <slot :file="props.file" :status="props.file.status" :percentage="percentage">
      <template v-if="props.listType === 'name'">
        <div :class="nh.be('label')">
          <div :class="[nh.be('icon'), nh.be('file-icon')]">
            <slot name="icon" :file="props.file">
              <Renderer
                v-if="useIconRenderer"
                :renderer="props.iconRenderer"
                :data="{ file: props.file }"
              ></Renderer>
              <Icon v-else v-bind="getFileIcon(props.file)"></Icon>
            </slot>
          </div>
          <span :class="nh.be('filename')">
            {{ fileName }}
          </span>
        </div>
        <div :class="nh.be('actions')">
          <span
            v-if="props.file.status === 'uploading'"
            style="margin-inline-end: 0.5em"
            :class="nh.be('percentage')"
          >
            {{ `${percentage}%` }}
          </span>
          <div v-if="props.file.status === 'success'" :class="[nh.be('icon'), nh.be('success')]">
            <Icon v-bind="icons.success"></Icon>
          </div>
          <div v-else-if="props.file.status === 'fail'" :class="[nh.be('icon'), nh.be('fail')]">
            <Icon v-bind="icons.warning"></Icon>
          </div>
          <div
            v-else-if="props.file.status === 'uploading'"
            :class="[nh.be('icon'), nh.be('loading')]"
          >
            <Icon v-bind="icons.loading"></Icon>
          </div>
          <button
            type="button"
            :class="[nh.be('icon'), nh.be('close')]"
            :aria-label="locale.ariaLabel.delete"
            @click="handleDelete(props.file)"
          >
            <Icon v-bind="icons.delete"></Icon>
          </button>
        </div>
        <div v-if="props.file.status === 'uploading'" :class="nh.be('progress')">
          <Progress
            inherit
            info-type="none"
            :stroke-width="2"
            :percentage="props.file.percentage"
            :precision="props.precision"
          ></Progress>
        </div>
      </template>
      <template v-else-if="props.listType === 'thumbnail' || props.listType === 'card'">
        <div :class="nh.be('card')">
          <div :class="nh.be('thumbnail')">
            <template v-if="props.file.status === 'uploading'">
              <div v-if="props.listType === 'thumbnail'" :class="nh.be('progress')">
                <span style="margin-bottom: 0.3em">
                  {{ props.loadingText ?? locale.uploading }}
                </span>
                <Progress
                  inherit
                  info-type="none"
                  :stroke-width="2"
                  :percentage="props.file.percentage"
                  :precision="props.precision"
                ></Progress>
                <span style="margin-top: 3px" :class="nh.be('percentage')">
                  {{ `${percentage}%` }}
                </span>
              </div>
              <Icon
                v-else
                v-bind="icons.loading"
                :scale="+(icons.loading.scale || 1) * 1.8"
                label="loading"
              ></Icon>
            </template>
            <img
              v-else-if="showThumb"
              :class="nh.be('image')"
              :src="props.file.url || props.file.base64 || ''"
              :alt="fileName"
            />
            <template v-else>
              {{ imageToBase64(props.file) }}
              <slot name="icon" :file="props.file">
                <Renderer
                  v-if="useIconRenderer"
                  :renderer="props.iconRenderer"
                  :data="{ file: props.file }"
                ></Renderer>
                <Icon v-else v-bind="getFileIcon(props.file, 2.8)"></Icon>
              </slot>
            </template>
          </div>
          <div v-if="props.listType === 'card'" :class="nh.be('info')">
            <span :class="nh.be('filename')">
              {{ fileName }}
            </span>
            <CollapseTransition>
              <div v-if="props.file.status === 'uploading'" :class="nh.be('progress')">
                <Progress
                  inherit
                  info-type="none"
                  :stroke-width="4"
                  :percentage="props.file.percentage"
                  :precision="props.precision"
                ></Progress>
              </div>
            </CollapseTransition>
          </div>
          <div
            v-if="props.listType === 'card' || props.file.status !== 'uploading'"
            :class="nh.be('actions')"
          >
            <div v-if="props.listType === 'thumbnail'" :class="nh.be('mask')"></div>
            <button
              type="button"
              :class="[
                nh.be('icon'),
                nh.be('action'),
                {
                  [nh.bem('action', 'disabled')]: !props.canPreview(props.file)
                }
              ]"
              :disabled="!props.canPreview(props.file)"
              :aria-label="locale.ariaLabel.preview"
              @click="handlePreview(props.file)"
            >
              <Icon v-bind="icons.preview" :scale="+(icons.preview.scale || 1) * 1.4"></Icon>
            </button>
            <button
              type="button"
              :class="[nh.be('icon'), nh.be('action')]"
              :aria-label="locale.ariaLabel.delete"
              @click="handleDelete(props.file)"
            >
              <Icon v-bind="icons.delete" :scale="+(icons.delete.scale || 1) * 1.4"></Icon>
            </button>
          </div>
        </div>
      </template>
    </slot>
  </li>
</template>
