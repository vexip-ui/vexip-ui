<template>
  <div></div>
</template>

<script>
import { config } from '@/config/properties'

const prefix = config.defaults.prefixCls

export default {
  name: 'Cabinet',
  components: {},
  props: {},
  data() {
    return {
      prefix: `${prefix}-cabinet`
    }
  },
  computed: {},
  methods: {}
}
</script>
