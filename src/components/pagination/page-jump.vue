<template>
  <div :class="`${prefix}__jump`">
    跳至
    <Input
      type="number"
      size="small"
      :value="currentValue"
      :class="`${prefix}__jump-input`"
      @on-change="handleChange"
    ></Input>
    页
  </div>
</template>

<script>
import Input from '../input'
import { findComponentUpward } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

const parentName = 'Pagination'

export default {
  name: 'PageJump',
  components: {
    Input
  },
  props: {
    value: {
      type: Number,
      default: 1,
      validator(value) {
        return value > 0
      }
    }
  },
  data() {
    return {
      prefix: `${prefix}-pagination`,
      currentValue: this.value
    }
  },
  computed: {},
  watch: {
    currentValue(value) {
      if (this.parentInstance) {
        this.parentInstance.changeActive(value)
      }

      this.$emit('on-change', value)
    }
  },
  mounted() {
    const parentInstance = findComponentUpward(this, parentName)

    if (parentInstance) {
      this.parentInstance = parentInstance

      this.parentInstance.$on('on-change', value => {
        this.currentValue = value
      })

      this.currentValue = this.parentInstance.currentActive
    }
  },
  methods: {
    handleChange(value) {
      const old = this.currentValue

      this.currentValue = value
      this.$emit('on-change', value)

      if (this.parentInstance) {
        const success = this.parentInstance.changeActive(value)

        if (!success) {
          this.$nextTick(() => {
            this.currentValue = old
          })
        }
      }
    }
  }
}
</script>
