<template>
  <transition appear :name="selectToAdd ? transitionName : null">
    <li :class="[`${prefix}__file`, `${prefix}__file--${file.status}`]" :title="file.name">
      <slot
        :file="file.source"
        :status="file.status"
        :percentage="file.percentage"
      >
        <template v-if="listType === 'name'">
          <div :class="`${prefix}__label`">
            <div :class="[`${prefix}__icon`, `${prefix}__file-icon`]">
              <slot name="icon" :file="file.source">
                <Render
                  v-if="useIconRenderer"
                  :renderer="iconRenderer"
                  :data="file.source"
                ></Render>
                <Icon v-else :name="getFileIcon(file)"></Icon>
              </slot>
            </div>
            <span :class="`${prefix}__filename`">
              {{ file.name }}
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
            <div v-if="file.status === status.SUCCESS" :class="[`${prefix}__icon`, `${prefix}__success`]">
              <Icon name="check-circle" :scale="0.8"></Icon>
            </div>
            <div v-else-if="file.status === status.FAIL" :class="[`${prefix}__icon`, `${prefix}__fail`]">
              <Icon name="exclamation-circle" :scale="0.8"></Icon>
            </div>
            <div v-else-if="file.status === status.UPLOADING" :class="[`${prefix}__icon`, `${prefix}__loading`]">
              <Icon
                pulse
                name="spinner"
                :scale="0.8"
              ></Icon>
            </div>
            <div
              :class="[`${prefix}__icon`, `${prefix}__close`]"
              @click="deleteFile(file)"
            >
              <Icon name="regular/trash-alt" :scale="0.8"></Icon>
            </div>
          </div>
          <div v-if="file.status === status.UPLOADING" :class="`${prefix}__progress`">
            <Progress
              info-type="none"
              :stroke-width="2"
              :percentage="file.percentage"
            ></Progress>
          </div>
        </template>
        <template v-else-if="listType === 'thumbnail' || listType === 'card'">
          <div :class="`${prefix}__card`">
            <div :class="`${prefix}__thumbnail`">
              <template v-if="file.status === status.UPLOADING">
                <div v-if="listType === 'thumbnail'" :class="`${prefix}__progress`">
                  <span style="margin-bottom: 0.3em;">
                    {{ loadingText }}
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
                :alt="file.name"
              />
              <template v-else>
                {{ transformfileToBase64(file) }}
                <slot name="icon" :file="file.source">
                  <Render
                    v-if="useIconRenderer"
                    :renderer="iconRenderer"
                    :data="file.source"
                  ></Render>
                  <Icon
                    v-else
                    :name="getFileIcon(file)"
                    :scale="2.8"
                  ></Icon>
                </slot>
              </template>
            </div>
            <div v-if="listType === 'card'" :class="`${prefix}__info`">
              <span :class="`${prefix}__filename`">
                {{ file.name }}
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
            <div v-if="listType === 'card' || file.status !== status.UPLOADING" :class="`${prefix}__actions`">
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
              <div
                :class="[`${prefix}__icon`, `${prefix}__action`]"
                @click="deleteFile(file)"
              >
                <Icon name="regular/trash-alt" :scale="1.4"></Icon>
              </div>
            </div>
          </div>
        </template>
      </slot>
    </li>
  </transition>
</template>

<script>
import CollapseTransition from '../collapse/collapse-transition'
import Progress from '../progress'
import Render from '../basis/render'

import { PENDING, UPLOADING, FAIL, SUCCESS, DELETE } from './upload'
import { iconMaps } from './file-icon'

import '../../icons/check-circle'
import '../../icons/exclamation-circle'
import '../../icons/spinner'
import '../../icons/regular/eye'
import '../../icons/regular/trash-alt'

const { prefix } = require('@/style/basis/variable')

export default {
  name: 'UploadFile',
  components: {
    CollapseTransition,
    Progress,
    Render
  },
  props: {
    file: {
      type: Object,
      default() {
        return {}
      }
    },
    iconRenderer: {
      type: Function,
      default: null
    },
    listType: {
      default: 'name',
      validator(value) {
        return ['name', 'detail', 'thumbnail', 'card'].includes(value)
      }
    },
    loadingText: {
      type: String,
      default: '上传中'
    },
    selectToAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-upload`,
      transitionName: `${prefix}-fade`,
      status: {
        PENDING,
        UPLOADING,
        FAIL,
        SUCCESS,
        DELETE
      }
    }
  },
  computed: {
    useIconRenderer() {
      return typeof this.iconRenderer === 'function'
    }
  },
  methods: {
    getFileExtension(file) {
      return file.name
        .split('.')
        .pop()
        .toLocaleLowerCase()
    },
    getFileIcon(file) {
      const extension = this.getFileExtension(file)

      if (extension) {
        return iconMaps[extension] || iconMaps.default
      }

      return iconMaps.default
    },
    deleteFile(file) {
      this.$emit('on-delete', file)
    },
    transformfileToBase64(file) {
      const reader = new FileReader()

      reader.readAsDataURL(file.source)

      reader.onload = () => {
        if (file.status !== DELETE) {
          this.$set(file, 'base64', reader.result)
        }
      }
    }
  }
}
</script>
