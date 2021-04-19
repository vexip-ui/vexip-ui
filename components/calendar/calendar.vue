<template>
  <div></div>
</template>

<script>
import { config } from '../../src/config/properties'

const prefix = config.defaults.prefixCls

export default {
  name: 'Calendar',
  props: {},
  data() {
    return {
      prefix: `${prefix}-calendar`
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>
