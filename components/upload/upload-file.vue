<template>
  <transition appear :name="props.selectToAdd ? transitionName : undefined">
    <li
      :class="[
        `${prefix}__file`,
        `${prefix}__file--${props.listType}`,
        `${prefix}__file--${props.file.status}`
      ]"
      :title="fileName"
    >
      <slot :file="props.file.source" :status="props.file.status" :percentage="props.file.percentage">
        <template v-if="props.listType === 'name'">
          <div :class="`${prefix}__label`">
            <div :class="[`${prefix}__icon`, `${prefix}__file-icon`]">
              <slot name="icon" :file="props.file.source">
                <Renderer
                  v-if="useIconRenderer"
                  :renderer="props.iconRenderer"
                  :data="{ file: props.file.source }"
                ></Renderer>
                <Icon v-else :icon="getFileIcon(props.file)"></Icon>
              </slot>
            </div>
            <span :class="`${prefix}__filename`">
              {{ fileName }}
            </span>
          </div>
          <div :class="`${prefix}__actions`">
            <span
              v-if="props.file.status === status.UPLOADING"
              style="margin-right: 0.5em;"
              :class="`${prefix}__percentage`"
            >
              {{ `${props.file.percentage}%` }}
            </span>
            <div
              v-if="props.file.status === status.SUCCESS"
              :class="[`${prefix}__icon`, `${prefix}__success`]"
            >
              <Icon><CircleCheck></CircleCheck></Icon>
            </div>
            <div
              v-else-if="props.file.status === status.FAIL"
              :class="[`${prefix}__icon`, `${prefix}__fail`]"
            >
              <Icon><CircleExclamation></CircleExclamation></Icon>
            </div>
            <div
              v-else-if="props.file.status === status.UPLOADING"
              :class="[`${prefix}__icon`, `${prefix}__loading`]"
            >
              <Icon pulse>
                <Spinner></Spinner>
              </Icon>
            </div>
            <div :class="[`${prefix}__icon`, `${prefix}__close`]" @click="deleteFile(props.file)">
              <Icon><TrashCanR></TrashCanR></Icon>
            </div>
          </div>
          <div v-if="props.file.status === status.UPLOADING" :class="`${prefix}__progress`">
            <Progress info-type="none" :stroke-width="2" :percentage="props.file.percentage"></Progress>
          </div>
        </template>
        <template v-else-if="props.listType === 'thumbnail' || props.listType === 'card'">
          <div :class="`${prefix}__card`">
            <div :class="`${prefix}__thumbnail`">
              <template v-if="props.file.status === status.UPLOADING">
                <div v-if="props.listType === 'thumbnail'" :class="`${prefix}__progress`">
                  <span style="margin-bottom: 0.3em;">
                    {{ props.loadingText ?? locale.uploading }}
                  </span>
                  <Progress
                    info-type="none"
                    :stroke-width="2"
                    :percentage="props.file.percentage"
                  ></Progress>
                  <span style="margin-top: 3px;" :class="`${prefix}__percentage`">
                    {{ `${props.file.percentage}%` }}
                  </span>
                </div>
                <Icon v-else pulse :scale="1.8">
                  <Spinner></Spinner>
                </Icon>
              </template>
              <img
                v-else-if="props.file.type.startsWith('image/') && props.file.base64"
                :class="`${prefix}__image`"
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
            <div v-if="props.listType === 'card'" :class="`${prefix}__info`">
              <span :class="`${prefix}__filename`">
                {{ fileName }}
              </span>
              <CollapseTransition>
                <div v-if="props.file.status === status.UPLOADING" :class="`${prefix}__progress`">
                  <Progress
                    info-type="none"
                    :stroke-width="4"
                    :percentage="props.file.percentage"
                  ></Progress>
                </div>
              </CollapseTransition>
            </div>
            <div
              v-if="props.listType === 'card' || props.file.status !== status.UPLOADING"
              :class="`${prefix}__actions`"
            >
              <div v-if="props.listType === 'thumbnail'" :class="`${prefix}__mask`"></div>
              <div
                :class="[
                  `${prefix}__icon`,
                  `${prefix}__action`,
                  {
                    [`${prefix}__action--disabled`]: !props.file.type.startsWith('image/') || !props.file.base64
                  }
                ]"
                @click="$emit('preview', props.file.source)"
              >
                <Icon :scale="1.4">
                  <EyeR></EyeR>
                </Icon>
              </div>
              <div :class="[`${prefix}__icon`, `${prefix}__action`]" @click="deleteFile(props.file)">
                <Icon :scale="1.4">
                  <TrashCanR></TrashCanR>
                </Icon>
              </div>
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
import { useProps, useLocale, booleanProp } from '@vexip-ui/config'
import { iconMaps } from './file-icon'
import { CircleCheck, CircleExclamation, Spinner, EyeR, TrashCanR } from '@vexip-ui/icons'
import { UploadStatusType, uploadListTypes } from './symbol'

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
    selectToAdd: booleanProp
  },
  emits: ['delete', 'preview'],
  setup(_props, { emit }) {
    const props = useProps('uploadFile', _props, {
      file: {
        default: () => ({}),
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
      selectToAdd: false
    })

    const prefix = 'vxp-upload'
    const transitionName = 'vxp-fade'

    const useIconRenderer = computed(() => {
      return typeof props.iconRenderer === 'function'
    })
    const fileName = computed(() => {
      return props.file.path || props.file.name
    })

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

    function deleteFile(file: FileState) {
      emit('delete', file)
    }

    function transformfileToBase64(file: FileState) {
      const reader = new FileReader()

      reader.readAsDataURL(file.source)

      reader.onload = () => {
        if (file.status !== UploadStatusType.DELETE) {
          file.base64 = reader.result?.toString() ?? null
        }
      }
    }

    return {
      props,
      prefix,
      locale: useLocale('upload'),
      transitionName,
      status: UploadStatusType,

      useIconRenderer,
      fileName,

      getFileIcon,
      deleteFile,
      transformfileToBase64
    }
  }
})
</script>
