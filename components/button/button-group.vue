<template>
  <div :class="prefix">
    <slot></slot>
  </div>
</template>

<script>
const { prefix } = require('../../src/style/basis/variable')

export default {
  name: 'ButtonGroup',
  props: {},
  data() {
    return {
      prefix: `${prefix}-button-group`
    }
  }
}
</script>
