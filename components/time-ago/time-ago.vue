<script setup lang="ts">
import { computed, onBeforeUnmount, ref, toRef, watch } from 'vue'

import { useLocale, useNameHelper, useProps, useWordSpace } from '@vexip-ui/config'
import { format, toDate } from '@vexip-ui/utils'
import { computeTimeAgo, getId, subscribe, unsubscribe } from './helper'
import { timeAgoProps } from './props'

import type { Dateable } from '@vexip-ui/utils'

defineOptions({ name: 'TimeAgo' })

const _props = defineProps(timeAgoProps)
const props = useProps('timeAgo', _props, {
  locale: null,
  datetime: {
    default: () => Date.now(),
    static: true
  },
  interval: {
    default: false,
    validator: value => typeof value === 'boolean' || value >= 1
  },
  title: false,
  titleFormat: 'yyyy-MM-dd HH:mm:ss'
})

const nh = useNameHelper('time-ago')
const datetime = toDateValue(props.datetime)
const locale = useLocale('timeAgo', toRef(props, 'locale'))
const wordSpace = useWordSpace()
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

defineExpose({ timeAgo })
</script>

<template>
  <span :class="[nh.b(), props.inherit && nh.bm('inherit')]" :title="currentTitle">
    {{ timeAgo }}
  </span>
</template>
