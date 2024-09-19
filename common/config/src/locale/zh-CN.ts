import { defineLocaleConfig } from './helper'

/**
 * Chinese (Simplified) locale config.
 *
 * @author @qmhc
 */
export function zhCNLocale() {
  return defineLocaleConfig({
    locale: 'zh-CN',
    wordSpace: false,

    calendar: {
      year: '年',
      month: '月',
      month1: '01月',
      month2: '02月',
      month3: '03月',
      month4: '04月',
      month5: '05月',
      month6: '06月',
      month7: '07月',
      month8: '08月',
      month9: '09月',
      month10: '10月',
      month11: '11月',
      month12: '12月',
      week1: '一',
      week2: '二',
      week3: '三',
      week4: '四',
      week5: '五',
      week6: '六',
      week7: '日',

      ariaLabel: {
        year: '年',
        month: '月',
        month1: '一月',
        month2: '二月',
        month3: '三月',
        month4: '四月',
        month5: '五月',
        month6: '六月',
        month7: '七月',
        month8: '八月',
        month9: '九月',
        month10: '十月',
        month11: '十一月',
        month12: '十二月',
        week1: '星期一',
        week2: '星期二',
        week3: '星期三',
        week4: '星期四',
        week5: '星期五',
        week6: '星期六',
        week7: '星期日'
      }
    },

    captcha: {
      slideEnd: '请滑动到最后',
      slide: '请滑动到适当的位置',
      success: '验证成功',
      fail: '验证失败，请重试',
      doCaptcha: '请完成下面的验证',
      pointInOrder: '请按顺序点击',
      trigger: '点击进行验证',
      completed: '已完成验证'
    },

    checkbox: {
      all: '全选'
    },

    colorPicker: {
      confirm: '确定',
      cancel: '重置',

      ariaLabel: {
        clear: '清空颜色'
      }
    },

    confirm: {
      confirm: '确认',
      cancel: '取消'
    },

    datePicker: {
      confirm: '确认',
      cancel: '取消',
      placeholder: {
        year: '年份',
        month: '月份',
        date: '日期',
        datetime: '日期时间',
        start: '开始',
        end: '结束',
        select: '请选择'
      },
      startTime: '开始时间',
      endTime: '结束时间',

      ariaLabel: {
        clear: '清空日期',
        quarter: '季度',
        week: '周',
        date: '日',
        hour: '时',
        minute: '分',
        second: '秒'
      }
    },

    drawer: {
      confirm: '确认',
      cancel: '取消'
    },

    form: {
      submit: '提交',
      reset: '重置',
      notNullable: '不可为空',
      validateFail: '验证未通过'
    },

    image: {
      placeholder: '加载中...',
      error: '加载失败'
    },

    input: {
      placeholder: '请输入',

      ariaLabel: {
        clear: '清空文本'
      }
    },

    layout: {
      signOut: '注销',
      signType: '导航模式',
      majorColor: '主题颜色',
      themeMode: '主题模式'
    },

    modal: {
      confirm: '确认',
      cancel: '取消'
    },

    numberInput: {
      placeholder: '请输入数字',
      outOfRange: '超出范围',

      ariaLabel: {
        clear: '清空数字',
        increase: '增加',
        decrease: '减少'
      }
    },

    pagination: {
      page: '页',
      perPage: '条/页',
      prevPage: '上一页',
      nextPage: '下一页',
      prev: '向前',
      next: '向后',
      total: '共',
      jumpTo: '跳转',
      itemUnit: '条'
    },

    select: {
      placeholder: '请选择',
      empty: '暂无数据',
      search: '搜索选项',

      ariaLabel: {
        clear: '清空选项'
      }
    },

    table: {
      empty: '暂无数据',
      filterConfirm: '筛选',
      filterReset: '重置',
      filterAll: '全部'
    },

    timeAgo: {
      ago: '前',
      late: '后',
      justNow: '刚刚',
      second: '秒',
      minute: '分钟',
      hour: '小时',
      yesterday: '昨天',
      days: '天',
      lastMonth: '上个月',
      months: '个月',
      lastYear: '去年',
      years: '年'
    },

    timePicker: {
      confirm: '确认',
      cancel: '取消',
      placeholder: {
        time: '时间',
        start: '开始',
        end: '结束',
        select: '请选择'
      },

      ariaLabel: {
        clear: '清空时间',
        hour: '时',
        minute: '分',
        second: '秒'
      }
    },

    tour: {
      prev: '上一步',
      next: '下一步',
      done: '完成',
      stepCount: '第 {n} 步'
    },

    transfer: {
      source: '源',
      target: '目标',
      empty: '暂无数据',
      reverse: '反选',
      search: '搜索 (Ctrl + F)'
    },

    tree: {
      empty: '暂无数据'
    },

    upload: {
      upload: '上传文件',
      uploading: '上传中',
      dragOrClick: '将文件拖到此处, 或点击上传',

      ariaLabel: {
        preview: '预览文件',
        delete: '删除文件'
      }
    },

    video: {
      play: '播放',
      pause: '暂停',
      playPrev: '上一个',
      playNext: '下一个',
      refresh: '刷新',
      flip: '镜像翻转',
      requestPip: '进入画中画',
      exitPip: '退出画中画',
      fullWindow: '进入网页全屏',
      fullWindowExit: '退出网页全屏',
      fullScreen: '进入全屏',
      fullScreenExit: '退出全屏',
      chapterCount: '第 {n} 章'
    },

    viewer: {
      rotateRight: '向右旋转',
      rotateLeft: '向左旋转',
      flipHorizontal: '横向翻转',
      flipVertical: '纵向翻转',
      zoomIn: '放大',
      zoomOut: '缩小',
      fullScreen: '进入全屏',
      fullScreenExit: '退出全屏',
      reset: '重置'
    }
  })
}
