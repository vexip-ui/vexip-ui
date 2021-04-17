<template>
  <ul :class="`${prefix}__list`">
    <slot></slot>
  </ul>
</template>

<script>
import { findComponentUpward } from '@/utils/common'
import { config } from '@/config/properties'

const prefix = config.defaults.prefixCls

const parentName = 'Dropdown'

export default {
  name: 'DropdownList',
  data() {
    return {
      prefix: `${prefix}-dropdown`,
      items: []
    }
  },
  mounted() {
    const parentInstance = findComponentUpward(this, parentName)

    if (parentInstance) {
      this.parentInstance = parentInstance
    }
  }
}
</script>
