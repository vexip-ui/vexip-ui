<template>
  <span :class="prefix" :title="currentTitle">
    {{ timeAgo }}
  </span>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onBeforeUnmount } from 'vue'
import { useProps } from '@vexip-ui/config'
import { toDate, format } from '@vexip-ui/utils'
import { getId, subscribe, unsubscribe, computeTimeAgo } from './helper'

import type { PropType } from 'vue'
import type { Dateable } from '@vexip-ui/utils'

export default defineComponent({
  name: 'TimeAgo',
  props: {
    datetime: [String, Number, Date] as PropType<Dateable>,
    interval: Number,
    title: [Boolean, String],
    titleFormat: String
  },
  setup(_props) {
    const props = useProps('timeAgo', _props, {
      datetime: {
        default: () => Date.now(),
        static: true
      },
      interval: {
        default: 10,
        validator: (value: number) => value >= 5
      },
      title: false,
      titleFormat: 'yyyy-MM-dd HH:mm:ss'
    })

    const prefix = 'vxp-time-ago'
    const datetime = toDate(props.datetime)
    const timeAgo = ref(computeTimeAgo(datetime))

    const id = getId()
    const record = {
      datetime,
      timeAgo,
      interval: props.interval * 1000,
      updated: Date.now()
    }

    const currentTitle = computed(() => {
      if (!props.title) return undefined

      if (typeof props.title === 'string') return props.title

      return format(props.datetime, props.titleFormat)
    })

    subscribe(id, record)

    watch(
      () => props.datetime,
      value => {
        record.datetime = toDate(value)
      }
    )
    watch(
      () => props.interval,
      value => {
        record.interval = value * 1000
      }
    )

    onBeforeUnmount(() => {
      unsubscribe(id)
    })

    return {
      prefix,
      timeAgo,

      currentTitle
    }
  }
})
</script>
