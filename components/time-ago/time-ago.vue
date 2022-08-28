<template>
  <span :class="nh.b()" :title="currentTitle">
    {{ timeAgo }}
  </span>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onBeforeUnmount } from 'vue'
import {
  useNameHelper,
  useProps,
  useLocale,
  booleanStringProp,
  booleanNumberProp
} from '@vexip-ui/config'
import { toDate, format } from '@vexip-ui/utils'
import { getId, subscribe, unsubscribe, computeTimeAgo } from './helper'

import type { PropType } from 'vue'
import type { Dateable } from '@vexip-ui/utils'

export default defineComponent({
  name: 'TimeAgo',
  props: {
    datetime: [String, Number, Date] as PropType<Dateable>,
    interval: booleanNumberProp,
    title: booleanStringProp,
    titleFormat: String
  },
  setup(_props) {
    const props = useProps('timeAgo', _props, {
      datetime: {
        default: () => Date.now(),
        static: true
      },
      interval: {
        default: false,
        validator: value => value && value >= 5
      },
      title: false,
      titleFormat: 'yyyy-MM-dd HH:mm:ss'
    })

    const nh = useNameHelper('time-ago')
    const datetime = toDateValue(props.datetime)
    const locale = useLocale('timeAgo')
    const wordSpace = computed(() => useLocale()?.value.wordSpace || false)
    const timeAgo = ref(computeTimeAgo(datetime, Date.now(), locale.value, wordSpace.value))

    const id = getId()
    const record = {
      datetime,
      timeAgo,
      locale,
      wordSpace,
      interval: parseInterval(props.interval),
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
        record.datetime = toDateValue(value)
        timeAgo.value = computeTimeAgo(datetime, Date.now(), locale.value, wordSpace.value)
      }
    )
    watch(
      () => props.interval,
      value => {
        record.interval = parseInterval(value)
      }
    )

    onBeforeUnmount(() => {
      unsubscribe(id)
    })

    function parseInterval(interval: boolean | number) {
      return interval && (interval === true ? 1e4 : interval * 1000)
    }

    function toDateValue(value: Dateable) {
      if (typeof value === 'string') {
        value = value.replace(/-/g, '/')
      }

      return toDate(value)
    }

    return {
      nh,
      timeAgo,

      currentTitle
    }
  }
})
</script>
