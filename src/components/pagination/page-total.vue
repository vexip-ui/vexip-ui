<template>
  <div :class="`${prefix}__total`">
    {{ `共 ${currentValue} ${unit}` }}
  </div>
</template>

<script>
import { findComponentUpward } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

const parentName = 'Pagination'

export default {
  name: 'PageTotal',
  props: {
    value: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: '条'
    }
  },
  data() {
    return {
      prefix: `${prefix}-pagination`,
      currentValue: this.value
    }
  },
  watch: {
    value(value) {
      this.currentValue = value
    }
  },
  mounted() {
    const parentInstance = findComponentUpward(this, parentName)

    if (parentInstance) {
      this.parentInstance = parentInstance
      // parentInstance.items.push(this)

      this.parentInstance.$on('on-total-change', value => {
        this.currentValue = value
      })

      this.currentValue = this.parentInstance.total
    }
  }
}
</script>
