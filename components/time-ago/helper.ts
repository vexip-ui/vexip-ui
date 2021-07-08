import { SECOND_ON_MILLS, MINUTE_ON_MILLS, HOUR_ON_MILLS, DAY_ON_MILLIS } from '@/common/utils/date'

import type { Ref } from 'vue'

export interface TimeAgoRecord {
  datetime: Date,
  timeAgo: Ref<string>,
  interval: number,
  updated: number
}

let id = 1

export function getId() {
  return id++
}

const recordMap = new Map<number, TimeAgoRecord>()

let timer: number
let isRunning: boolean

export function subscribe(id: number, record: TimeAgoRecord) {
  recordMap.set(id, record)

  if (recordMap.size && !isRunning) {
    window.clearInterval(timer)

    timer = window.setInterval(() => {
      isRunning = true

      const current = Date.now()

      recordMap.forEach(record => {
        if (current - record.updated > record.interval) {
          record.timeAgo.value = computeTimeAgo(record.datetime, current)
          record.updated = current
        }
      })
    }, 5000)
  }
}

export function unsubscribe(id: number) {
  recordMap.delete(id)

  if (!recordMap.size) {
    window.clearInterval(timer)
    isRunning = false
  }
}

export function computeTimeAgo(date: Date, current = Date.now()) {
  const diff = Math.abs(current - date.getTime())
  const type = current > date.getTime() ? '前' : '后'

  if (diff < 10 * SECOND_ON_MILLS) {
    return '刚刚'
  } else if (diff < MINUTE_ON_MILLS) {
    return `${Math.floor(diff / SECOND_ON_MILLS)}秒${type}`
  } else if (diff < HOUR_ON_MILLS) {
    return `${Math.floor(diff / MINUTE_ON_MILLS)}分钟${type}`
  } else if (diff < DAY_ON_MILLIS) {
    return `${Math.floor(diff / HOUR_ON_MILLS)}小时${type}`
  } else if (diff < 30 * DAY_ON_MILLIS) {
    const diffDays = Math.floor(diff / DAY_ON_MILLIS)

    if (diffDays === 1) return '昨天'

    return `${diffDays}天${type}`
  } else if (diff < 365 * DAY_ON_MILLIS) {
    const diffMonths = Math.floor(diff / (30 * DAY_ON_MILLIS))

    if (diffMonths === 1) return '上个月'

    return `${diffMonths}月${type}`
  } else {
    const diffYears = Math.floor(diff / 365 / DAY_ON_MILLIS)

    if (diffYears === 1) return '去年'

    return `${diffYears}年${type}`
  }
}
