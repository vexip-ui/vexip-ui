import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { addMinutes, addHours, addDays, format } from '@vexip-ui/utils'
import { mount } from '@vue/test-utils'
import { TimeAgo } from '..'

vi.useFakeTimers()

describe('TimeAgo', () => {
  it('render', () => {
    const current = Date.now()
    vi.setSystemTime(current)

    const datetimes = [
      current,
      current - 10000,
      addMinutes(current, -1),
      addMinutes(current, -2),
      addHours(current, -1),
      addHours(current, -2),
      addDays(current, -1),
      addDays(current, -3),
      addDays(current, -32),
      addDays(current, -93),
      addDays(current, -366),
      addDays(current, -732)
    ]

    const expects = [
      '刚刚',
      '10秒前',
      '1分钟前',
      '2分钟前',
      '1小时前',
      '2小时前',
      '昨天',
      '3天前',
      '上个月',
      '3个月前',
      '去年',
      '2年前'
    ]

    datetimes.forEach((datetime, i) => {
      const wrapper = mount(() => <TimeAgo datetime={datetime}></TimeAgo>)

      expect(wrapper.find('.vxp-time-ago').text()).toEqual(expects[i])
    })
  })

  it('auto update', async () => {
    const current = Date.now()
    vi.setSystemTime(current)

    const wrapper = mount(() => <TimeAgo interval></TimeAgo>)

    expect(wrapper.find('.vxp-time-ago').text()).toEqual('刚刚')

    vi.setSystemTime(current + 1e4)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-time-ago').text()).toEqual('15秒前')

    vi.setSystemTime(current + 6e4)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-time-ago').text()).toEqual('1分钟前')
  })

  it('title', () => {
    const current = Date.now()
    vi.setSystemTime(current)

    const wrapper = mount(() => <TimeAgo title></TimeAgo>)

    expect(wrapper.find('.vxp-time-ago').attributes('title')).toEqual(format(current))
  })
})
