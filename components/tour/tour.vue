<template>
  <div :class="className" @click="handleClick"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { tourProps } from './props'

export default defineComponent({
  name: 'Tour',
  props: tourProps,
  emits: [],
  setup(_props) {
    const props = useProps('tour', _props, {
      steps: () => [],
      hideMask: false
    })

    const nh = useNameHelper('tour')

    const className = computed(() => {
      return [nh.b(), nh.bs('vars')]
    })

    return {
      props,
      nh,

      className
    }
  }
})
</script>
