<template>
  <div :class="`${prefix}__size`">
    <Select v-model="currentValue" size="small">
      <Option
        v-for="(item, index) in currentOptions"
        :key="index"
        :value="item"
        :label="`${item} ${unit}/页`"
      ></Option>
    </Select>
  </div>
</template>

<script>
import Option from '../option'
import Select from '../select'

import { findComponentUpward } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

const parentName = 'Pagination'

export default {
  name: 'PageCount',
  components: {
    Option,
    Select
  },
  props: {
    options: {
      type: Array,
      default() {
        return null
      }
    },
    value: {
      type: Number,
      default: null
    },
    unit: {
      type: String,
      default: '条'
    }
  },
  data() {
    return {
      prefix: `${prefix}-pagination`,
      currentValue: null,
      currentOptions: this.options,
      parentInstance: null
    }
  },
  watch: {
    currentValue(value) {
      if (this.parentInstance) {
        this.parentInstance.currentPageSize = value
      }

      this.$emit('on-change', value)
    }
  },
  mounted() {
    const parentInstance = findComponentUpward(this, parentName)

    if (parentInstance) {
      this.parentInstance = parentInstance

      this.parentInstance.$on('on-page-size-change', value => {
        this.currentValue = value
      })

      this.parentInstance.$on('on-size-opts-change', options => {
        this.currentOptions = options
      })

      this.currentValue = this.parentInstance.currentPageSize
      this.currentOptions = this.parentInstance.sizeOptions
    }
  }
}
</script>
