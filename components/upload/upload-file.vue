<template>
  <transition appear :name="props.selectToAdd ? transitionName : undefined">
    <li
      :class="[nh.be('file'), nh.bem('file', props.listType), nh.bem('file', props.file.status)]"
      :title="fileName"
      tabindex="-1"
    >
      <slot :file="props.file.source" :status="props.file.status" :percentage="percentage">
        <template v-if="props.listType === 'name'">
          <div :class="nh.be('label')">
            <div :class="[nh.be('icon'), nh.be('file-icon')]">
              <slot name="icon" :file="props.file.source">
                <Renderer
                  v-if="useIconRenderer"
                  :renderer="props.iconRenderer"
                  :data="{ file: props.file.source }"
                ></Renderer>
                <Icon v-else :icon="getFileIcon(props.file)"></Icon>
              </slot>
            </div>
            <span :class="nh.be('filename')">
              {{ fileName }}
            </span>
          </div>
          <div :class="nh.be('actions')">
            <span
              v-if="props.file.status === 'uploading'"
              style="margin-right: 0.5em;"
              :class="nh.be('percentage')"
            >
              {{ `${percentage}%` }}
            </span>
            <div v-if="props.file.status === 'success'" :class="[nh.be('icon'), nh.be('success')]">
              <Icon><CircleCheck></CircleCheck></Icon>
            </div>
            <div v-else-if="props.file.status === 'fail'" :class="[nh.be('icon'), nh.be('fail')]">
              <Icon><CircleExclamation></CircleExclamation></Icon>
            </div>
            <div
              v-else-if="props.file.status === 'uploading'"
              :class="[nh.be('icon'), nh.be('loading')]"
            >
              <Icon pulse>
                <Spinner></Spinner>
              </Icon>
            </div>
            <button :class="[nh.be('icon'), nh.be('close')]" @click="handleDelete(props.file)">
              <Icon><TrashCanR></TrashCanR></Icon>
            </button>
          </div>
          <div v-if="props.file.status === 'uploading'" :class="nh.be('progress')">
            <Progress
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
                  <span style="margin-bottom: 0.3em;">
                    {{ props.loadingText ?? locale.uploading }}
                  </span>
                  <Progress
                    info-type="none"
                    :stroke-width="2"
                    :percentage="props.file.percentage"
                    :precision="props.precision"
                  ></Progress>
                  <span style="margin-top: 3px;" :class="nh.be('percentage')">
                    {{ `${percentage}%` }}
                  </span>
                </div>
                <Icon v-else pulse :scale="1.8">
                  <Spinner></Spinner>
                </Icon>
              </template>
              <img
                v-else-if="props.file.type.startsWith('image/') && props.file.base64"
                :class="nh.be('image')"
                :src="props.file.base64"
                :alt="fileName"
              />
              <template v-else>
                {{ transformfileToBase64(props.file) }}
                <slot name="icon" :file="props.file.source">
                  <Renderer
                    v-if="useIconRenderer"
                    :renderer="props.iconRenderer"
                    :data="{ file: props.file.source }"
                  ></Renderer>
                  <Icon v-else :icon="getFileIcon(props.file)" :scale="2.8"></Icon>
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
                :class="[
                  nh.be('icon'),
                  nh.be('action'),
                  {
                    [nh.bem('action', 'disabled')]:
                      !props.file.type.startsWith('image/') || !props.file.base64
                  }
                ]"
                :disabled="!props.file.type.startsWith('image/') || !props.file.base64"
                @click="handlePreview(props.file)"
              >
                <Icon :scale="1.4">
                  <EyeR></EyeR>
                </Icon>
              </button>
              <button :class="[nh.be('icon'), nh.be('action')]" @click="handleDelete(props.file)">
                <Icon :scale="1.4">
                  <TrashCanR></TrashCanR>
                </Icon>
              </button>
            </div>
          </div>
        </template>
      </slot>
    </li>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { Progress } from '@/components/progress'
import { Renderer } from '@/components/renderer'
import { CircleCheck, CircleExclamation, Spinner, EyeR, TrashCanR } from '@vexip-ui/icons'
import {
  useNameHelper,
  useProps,
  useLocale,
  booleanProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { toFixed } from '@vexip-ui/utils'
import { iconMaps } from './file-icon'
import { StatusType, uploadListTypes } from './symbol'

import type { PropType } from 'vue'
import type { UploadListType, RenderFn, FileState } from './symbol'

export default defineComponent({
  name: 'UploadFile',
  components: {
    CollapseTransition,
    Icon,
    Progress,
    Renderer,
    CircleCheck,
    CircleExclamation,
    Spinner,
    EyeR,
    TrashCanR
  },
  props: {
    file: Object as PropType<FileState>,
    iconRenderer: Function as PropType<RenderFn>,
    listType: String as PropType<UploadListType>,
    loadingText: String,
    selectToAdd: booleanProp,
    precision: Number,
    onDelete: eventProp<(file: FileState, source: File) => void>(),
    onPreview: eventProp<(file: FileState, source: File) => void>()
  },
  emits: [],
  setup(_props) {
    const props = useProps('uploadFile', _props, {
      file: {
        default: () => ({} as FileState),
        static: true
      },
      iconRenderer: {
        default: null,
        isFunc: true
      },
      listType: {
        default: 'name' as UploadListType,
        validator: (value: UploadListType) => uploadListTypes.includes(value)
      },
      loadingText: null,
      selectToAdd: false,
      precision: 2
    })

    const nh = useNameHelper('upload')
    const transitionName = computed(() => nh.ns('fade'))

    const useIconRenderer = computed(() => typeof props.iconRenderer === 'function')
    const fileName = computed(() => props.file.path || props.file.name)
    const percentage = computed(() => toFixed(props.file.percentage, props.precision))

    function getFileExtension(file: FileState) {
      return file.name.split('.').pop()!.toLocaleLowerCase()
    }

    function getFileIcon(file: FileState) {
      const extension = getFileExtension(file)

      if (extension) {
        return iconMaps[extension] || iconMaps.default
      }

      return iconMaps.default
    }

    function handleDelete(file: FileState) {
      emitEvent(props.onDelete, file, file.source)
    }

    function handlePreview(file: FileState) {
      emitEvent(props.onPreview, file, file.source)
    }

    function transformfileToBase64(file: FileState) {
      const reader = new FileReader()

      reader.readAsDataURL(file.source)

      reader.onload = () => {
        if (file.status !== StatusType.DELETE) {
          file.base64 = reader.result?.toString() ?? null
        }
      }
    }

    return {
      props,
      nh,
      locale: useLocale('upload'),
      transitionName,

      useIconRenderer,
      fileName,
      percentage,

      getFileIcon,
      handleDelete,
      handlePreview,
      transformfileToBase64
    }
  }
})
</script>
