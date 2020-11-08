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
        ref="input"
        type="file"
        :class="`${prefix}__input`"
        :multiple="multiple"
        :accept="acceptString"
        @change="handleInputChange"
      />
      <slot>
        <template v-if="!allowDrag">
          <Button icon="upload">
            上传文件
          </Button>
          <slot name="tip">
            <p v-if="tip" :class="`${prefix}__tip`">
              {{ tip }}
            </p>
          </slot>
        </template>
        <div v-else :class="`${prefix}__drag-pane`">
          <Icon
            name="cloud-upload-alt"
            :class="`${prefix}__cloud`"
            :scale="4"
          ></Icon>
          <slot name="tip">
            <p :class="`${prefix}__tip`">
              {{ tip || '将文件拖到此处, 或点击上传' }}
            </p>
          </slot>
        </div>
      </slot>
    </div>
    <transition-group
      tag="ul"
      :appear="selectToAdd"
      :name="`${prefix}-list-transition`"
      :class="`${prefix}__files`"
      :style="{
        [selectToAdd ? 'marginBottom' : (multiple || allowDrag) ? 'marginTop' : 'marginLeft']: !hiddenFiles && renderFiles.length ? '0.5em' : null
      }"
    >
      <li
        v-for="item in renderFiles"
        :key="item.id"
        :class="`${prefix}__file`"
        :title="item.name"
      >
        <slot
          name="item"
          :file="item.source"
          :status="item.status"
          :percentage="item.percentage"
        >
          <template v-if="listType === 'name'">
            <div :class="`${prefix}__label`">
              <div
                v-if="!hiddenIcon"
                :class="[`${prefix}__icon`, `${prefix}__file-icon`]"
              >
                <slot name="icon" :file="item.source">
                  <Render
                    v-if="useIconRenderer"
                    :renderer="iconRenderer"
                    :data="item.source"
                  ></Render>
                  <Icon v-else :name="getFileIcon(item)"></Icon>
                </slot>
              </div>
              <span :class="`${prefix}__filename`">
                {{ item.name }}
              </span>
            </div>
            <div
              v-if="item.status === status.UPLOADING"
              :class="`${prefix}__progress`"
            >
              {{ `${item.percentage}%` }}
            </div>
            <div
              v-else-if="item.status === status.SUCCESS"
              :class="[`${prefix}__icon`, `${prefix}__success`]"
            >
              <Icon name="check-circle" :scale="0.8"></Icon>
            </div>
            <div
              v-else
              :class="[`${prefix}__icon`, `${prefix}__close`]"
              @click="deleteFile(item)"
            >
              <Icon name="times" :scale="0.8"></Icon>
            </div>
          </template>
          <template v-else-if="listType === 'thumbnail' || listType === 'card'">
            <div :class="`${prefix}__card`">
              <div :class="`${prefix}__thumbnail`">
                <img
                  v-if="item.type.startsWith('image/') && item.base64"
                  :class="`${prefix}__image`"
                  :src="item.base64"
                  :alt="item.name"
                />
                <template v-else>
                  {{ transformfileToBase64(item) }}
                  <slot name="icon" :file="item.source">
                    <Render
                      v-if="useIconRenderer"
                      :renderer="iconRenderer"
                      :data="item.source"
                    ></Render>
                    <Icon
                      v-else
                      :name="getFileIcon(item)"
                      :scale="3"
                    ></Icon>
                  </slot>
                </template>
              </div>
              <span v-if="listType === 'card'" :class="`${prefix}__filename`">
                {{ item.name }}
              </span>
              <div :class="`${prefix}__actions`">
                <div
                  :class="[
                    `${prefix}__icon`,
                    `${prefix}__action`,
                    {
                      [`${prefix}__action--disabled`]: !item.type.startsWith('image/') || !item.base64
                    }
                  ]"
                  @click="$emit('on-preview', item.source)"
                >
                  <Icon name="regular/eye" :scale="1.4"></Icon>
                </div>
                <div
                  :class="[`${prefix}__icon`, `${prefix}__action`]"
                  @click="deleteFile(item)"
                >
                  <Icon name="regular/trash-alt" :scale="1.4"></Icon>
                </div>
              </div>
            </div>
          </template>
        </slot>
      </li>
    </transition-group>
  </div>
</template>

<script>
/* eslint-disable */
import Button from '../button'
import Icon from '../icon'
import Render from '../basis/render'

import { iconMaps } from './file-icon'
import { upload } from './request'
import { getRandomString, isPromise } from '../../src/utils/common'

import '../../icons/check-circle'
import '../../icons/cloud-upload-alt'
import '../../icons/times'
import '../../icons/upload'
import '../../icons/regular/eye'
import '../../icons/regular/trash-alt'

const { prefix } = require('../../src/style/basis/variable')

const PENDING = 'pending'
const UPLOADING = 'uploading'
const FAIL = 'fail'
const SUCCESS = 'success'
const DELETE = 'delete'

const statusList = [PENDING, UPLOADING, FAIL, SUCCESS, DELETE]

export default {
  name: 'Upload',
  components: {
    Button,
    Icon,
    Render
  },
  status: Object.freeze({ PENDING, UPLOADING, FAIL, SUCCESS, DELETE }),
  props: {
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
      type: [String, Array],
      default: null
    },
    filter: {
      type: [String, Array],
      default: ''
    },
    maxSize: {
      type: Number,
      default: null,
      validator(value) {
        return value > 0
      }
    },
    field: {
      type: String,
      default: 'file'
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    headers: {
      type: Object,
      default() {
        return {}
      }
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
    hiddenIcon: {
      type: Boolean,
      default: false
    },
    countLimit: {
      type: Number,
      default: 0
    },
    allowDrag: {
      type: Boolean,
      default: false
    },
    beforeUpload: {
      type: Function,
      default: null
    },
    beforeSelect: {
      tyoe: Function,
      default: null
    },
    iconRenderer: {
      type: Function,
      default: null
    },
    selectToAdd: {
      type: Boolean,
      default: false
    },
    listType: {
      default: 'name',
      validator(value) {
        return ['name', 'detail', 'thumbnail', 'card'].includes(value)
      }
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-upload`,
      files: [],
      isDragOver: false,
      objectUrl: {},
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
    className() {
      const { prefix, multiple, allowDrag, selectToAdd, listType, block } = this

      return [
        prefix,
        `${prefix}--type-${listType}`,
        {
          [`${prefix}--multiple`]: multiple,
          [`${prefix}--drag`]: allowDrag,
          [`${prefix}--to-add`]: selectToAdd,
          [`${prefix}--block`]: block
        }
      ]
    },
    acceptString() {
      const accept = this.accept

      return accept && (typeof accept === 'string' ? accept : accept.join())
    },
    renderFiles() {
      return this.files.filter(item => item.status !== DELETE)
    },
    useIconRenderer() {
      return typeof this.iconRenderer === 'function'
    }
  },
  methods: {
    handleClick() {
      this.$refs.input.click()
    },
    handleInputChange(event) {
      this.handleFilesChange(event.target.files)
    },
    async handleFilesChange(originFiles) {
      originFiles = Array.from(originFiles || [])

      const files = this.selectToAdd ? this.files : []

      for (const file of originFiles) {
        if (typeof this.beforeSelect === 'function') {
          let result = this.beforeSelect(file, this.selectToAdd ? this.getSourceFiles() : [])

          if (isPromise(result)) {
            result = await result
          }

          if (result === false) continue
        }

        let fileObj = this.getFileObject(file)

        if (fileObj) {
          fileObj.status = PENDING
        } else {
          fileObj = this.createFileObject(file)
        }

        files.push(fileObj)
      }

      if (this.countLimit && files.length > this.countLimit) {
        this.files = files.slice(0, this.countLimit)

        const exceedFiles = files.slice(this.countLimit)

        this.$emit(
          'on-exceed',
          exceedFiles.map(file => file.source),
          this.getSourceFiles()
        )
      } else {
        this.files = files
      }

      const sourceFiles = this.getSourceFiles()

      this.$emit(
        'on-change',
        sourceFiles
      )

      if (!this.manual) {
        this.execute()
      }
    },
    getFileObject(file) {
      return this.files.find(item => item.source === file)
    },
    createFileObject(file) {
      const { name, size, type } = file

      return {
        id: getRandomString(),
        name,
        size,
        type,
        base64: null,
        status: PENDING,
        percentage: 0,
        source: file
      }
    },
    getSourceFiles() {
      return this.files.map(file => file.source)
    },
    getFileExtension(file) {
      return file.name
        .split('.')
        .pop()
        .toLocaleLowerCase()
    },
    execute() {
      if (!this.url || !this.verifyFiles()) {
        return false
      }

      const { files } = this
      const uploadFiles = files.filter(
        item => item.status !== SUCCESS && item.status !== DELETE
      )
      const requests = []

      for (const file of uploadFiles) {
        requests.push(this.uploadFile(file))
      }

      return Promise.all(requests).then(responses => responses.filter(response => response))
    },
    async uploadFile(file) {
      const { url, files, field, data, headers, withCredentials, beforeUpload } = this

      if (typeof beforeUpload === 'function') {
        let result = beforeUpload(
          file.source,
          files.filter(
            item => item.status !== SUCCESS && item.status !== DELETE
          ).map(item => item.source)
        )

        if (isPromise(result)) {
          result = await result
        }

        if (result === false) return
      }

      file.status = UPLOADING

      return await new Promise((resolve, reject) => {
        file.xhr = upload({
          url,
          headers,
          withCredentials,
          data,
          field,
          file: file.source,
          onProgress: percent => {
            this.handleProgress(percent, file)
          },
          onSuccess: response => {
            this.handleSuccess(response, file)
            resolve(response)
          },
          onError: error => {
            this.handleError(error, file)
            reject(error)
          },
          onAbort: () => {
            resolve(null)
          }
        })
      })
    },
    clear() {
      this.files = []
      this.$refs.input.value = null

      this.$emit('on-change', [])
    },
    verifyFiles() {
      const { files, maxSize } = this
      const limitSize = maxSize ? maxSize * 1024 : Infinity

      let filter = this.filter

      filter = typeof filter === 'string'
        ? (filter ? [filter] : [])
        : filter.filter(item => item)

      for (let i = 0, len = files.length; i < len; i++) {
        const file = files[i]
        const extension = this.getFileExtension(file)

        if (filter.length && !filter.includes(extension)) {
          this.$emit('on-filter-error', file.source)

          return false
        }

        if (file.size > limitSize) {
          this.$emit('on-size-error', file.source)

          return false
        }
      }

      return true
    },
    deleteFile(file) {
      file.status = DELETE

      if (file.xhr) {
        file.xhr.abort()
      }

      const files = this.files.filter(item => item.status !== DELETE)
      const dataTransfer = new DataTransfer()

      files.forEach(item => {
        dataTransfer.items.add(item.source)
      })

      this.$refs.input.files = dataTransfer.files

      this.$emit('on-delete', file.source)
    },
    // 根据源文件删除
    delete(originFile) {
      const file = this.files.find(file => file.source === originFile)

      if (file && file.status !== DELETE) {
        this.deleteFile(file)
      }
    },
    // 根据源文件修改进度
    progress(originFile, percent) {
      const file = this.files.find(file => file.source === originFile)

      if (file && file.status === UPLOADING) {
        file.percentage = percent
      }
    },
    setStatus(originFile, status) {
      if (!statusList.includes(status)) return

      const file = this.files.find(file => file.source === originFile)

      if (file) {
        file.status = status
      }
    },
    handleProgress(percent, file) {
      if (file.status === DELETE) return

      file.percentage = percent

      this.$emit('on-progress', percent, file.source)
    },
    handleSuccess(response, file) {
      if (file.status === DELETE) return

      file.status = SUCCESS
      file.response = response
      file.error = null

      this.$emit('on-success', response, file.source)
    },
    handleError(error, file) {
      if (file.status === DELETE) return

      file.status = FAIL
      file.error = error

      this.$emit('on-error', error, file.source)
    },
    getFileIcon(file) {
      const extension = this.getFileExtension(file)

      if (extension) {
        return iconMaps[extension] || iconMaps.default
      }

      return iconMaps.default
    },
    handleDrop(event) {
      if (!this.allowDrag) return

      clearTimeout(this.dragTimer)

      this.isDragOver = false
      this.handleFilesChange(event.dataTransfer.files)
    },
    handleDragEnter() {
      if (!this.allowDrag) return

      clearTimeout(this.dragTimer)

      this.isDragOver = true
    },
    handleDragLeave() {
      if (!this.allowDrag) return

      this.dragTimer = setTimeout(() => {
        this.isDragOver = false
      }, 100)
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
