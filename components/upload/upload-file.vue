<template>
  <transition appear :name="selectToAdd ? transitionName : undefined">
    <li :class="[`${prefix}__file`, `${prefix}__file--${file.status}`]" :title="fileName">
      <slot :file="file.source" :status="file.status" :percentage="file.percentage">
        <template v-if="listType === 'name'">
          <div :class="`${prefix}__label`">
            <div :class="[`${prefix}__icon`, `${prefix}__file-icon`]">
              <slot name="icon" :file="file.source">
                <Renderer
                  v-if="useIconRenderer"
                  :renderer="iconRenderer"
                  :data="{ file: file.source }"
                ></Renderer>
                <Icon v-else :name="getFileIcon(file)"></Icon>
              </slot>
            </div>
            <span :class="`${prefix}__filename`">
              {{ fileName }}
            </span>
          </div>
          <div :class="`${prefix}__actions`">
            <span
              v-if="file.status === status.UPLOADING"
              style="margin-right: 0.5em;"
              :class="`${prefix}__percentage`"
            >
              {{ `${file.percentage}%` }}
            </span>
            <div
              v-if="file.status === status.SUCCESS"
              :class="[`${prefix}__icon`, `${prefix}__success`]"
            >
              <Icon name="check-circle"></Icon>
            </div>
            <div
              v-else-if="file.status === status.FAIL"
              :class="[`${prefix}__icon`, `${prefix}__fail`]"
            >
              <Icon name="exclamation-circle"></Icon>
            </div>
            <div
              v-else-if="file.status === status.UPLOADING"
              :class="[`${prefix}__icon`, `${prefix}__loading`]"
            >
              <Icon pulse name="spinner"></Icon>
            </div>
            <div :class="[`${prefix}__icon`, `${prefix}__close`]" @click="deleteFile(file)">
              <Icon name="regular/trash-alt"></Icon>
            </div>
          </div>
          <div v-if="file.status === status.UPLOADING" :class="`${prefix}__progress`">
            <Progress info-type="none" :stroke-width="2" :percentage="file.percentage"></Progress>
          </div>
        </template>
        <template v-else-if="listType === 'thumbnail' || listType === 'card'">
          <div :class="`${prefix}__card`">
            <div :class="`${prefix}__thumbnail`">
              <template v-if="file.status === status.UPLOADING">
                <div v-if="listType === 'thumbnail'" :class="`${prefix}__progress`">
                  <span style="margin-bottom: 0.3em;">
                    {{ loadingText ?? locale.uploading }}
                  </span>
                  <Progress
                    info-type="none"
                    :stroke-width="2"
                    :percentage="file.percentage"
                  ></Progress>
                  <span style="margin-top: 0.2em;" :class="`${prefix}__percentage`">
                    {{ `${file.percentage}%` }}
                  </span>
                </div>
                <Icon
                  v-else
                  pulse
                  name="spinner"
                  :scale="1.8"
                ></Icon>
              </template>
              <img
                v-else-if="file.type.startsWith('image/') && file.base64"
                :class="`${prefix}__image`"
                :src="file.base64"
                :alt="fileName"
              />
              <template v-else>
                {{ transformfileToBase64(file) }}
                <slot name="icon" :file="file.source">
                  <Renderer
                    v-if="useIconRenderer"
                    :renderer="iconRenderer"
                    :data="{ file: file.source }"
                  ></Renderer>
                  <Icon v-else :name="getFileIcon(file)" :scale="2.8"></Icon>
                </slot>
              </template>
            </div>
            <div v-if="listType === 'card'" :class="`${prefix}__info`">
              <span :class="`${prefix}__filename`">
                {{ fileName }}
              </span>
              <CollapseTransition>
                <div v-if="file.status === status.UPLOADING" :class="`${prefix}__progress`">
                  <Progress
                    info-type="none"
                    :stroke-width="4"
                    :percentage="file.percentage"
                  ></Progress>
                </div>
              </CollapseTransition>
            </div>
            <div
              v-if="listType === 'card' || file.status !== status.UPLOADING"
              :class="`${prefix}__actions`"
            >
              <div
                :class="[
                  `${prefix}__icon`,
                  `${prefix}__action`,
                  {
                    [`${prefix}__action--disabled`]: !file.type.startsWith('image/') || !file.base64
                  }
                ]"
                @click="$emit('on-preview', file.source)"
              >
                <Icon name="regular/eye" :scale="1.4"></Icon>
              </div>
              <div :class="[`${prefix}__icon`, `${prefix}__action`]" @click="deleteFile(file)">
                <Icon name="regular/trash-alt" :scale="1.4"></Icon>
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
import { useConfiguredProps } from '@/common/config/install'
import { useLocaleConfig } from '@/common/config/locale'
import { iconMaps } from './file-icon'
import { UploadStatusType } from './symbol'

import '@/common/icons/check-circle'
import '@/common/icons/exclamation-circle'
import '@/common/icons/spinner'
import '@/common/icons/regular/eye'
import '@/common/icons/regular/trash-alt'

import type { PropType } from 'vue'
import type { UploadListType, RenderFn, FileState } from './symbol'

const props = useConfiguredProps('uploadFile', {
  file: {
    type: Object as PropType<FileState>,
    default: () => ({})
  },
  iconRenderer: {
    type: Function as PropType<RenderFn>,
    default: null
  },
  listType: {
    default: 'name' as UploadListType,
    validator: (value: UploadListType) => {
      return ['name', 'detail', 'thumbnail', 'card'].includes(value)
    }
  },
  loadingText: {
    type: String,
    default: null
  },
  selectToAdd: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'UploadFile',
  components: {
    CollapseTransition,
    Icon,
    Progress,
    Renderer
  },
  props,
  emits: ['on-delete', 'on-preview'],
  setup(props, { emit }) {
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
      emit('on-delete', file)
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
      prefix,
      locale: useLocaleConfig('upload'),
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
