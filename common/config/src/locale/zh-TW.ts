import { defineLocaleConfig } from './helper'

/**
 * Chinese (TW) locale config
 */
export function zhTWLocale() {
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
      week7: '日'
    },

    checkbox: {
      all: '全選'
    },

    colorPicker: {
      confirm: '確定',
      cancel: '重置'
    },

    confirm: {
      confirm: '確認',
      cancel: '取消'
    },

    datePicker: {
      confirm: '確認',
      cancel: '取消',
      placeholder: {
        year: '年份',
        month: '月份',
        date: '日期',
        datetime: '日期時間',
        start: '開始',
        end: '結束',
        select: '請選擇'
      },
      startTime: '開始時間',
      endTime: '結束時間'
    },

    drawer: {
      confirm: '確認',
      cancel: '取消'
    },

    form: {
      submit: '提交',
      reset: '重置',
      notNullable: '不可為空',
      validateFail: '驗證未透過'
    },

    image: {
      placeholder: '載入中...',
      error: '載入失敗'
    },

    input: {
      placeholder: '請輸入'
    },

    layout: {
      signOut: '登出',
      signType: '導航模式',
      majorColor: '主題顏色',
      themeMode: '主題模式'
    },

    modal: {
      confirm: '確認',
      cancel: '取消'
    },

    numberInput: {
      placeholder: '請輸入數字',
      outOfRange: '超出範圍'
    },

    pagination: {
      page: '頁',
      perPage: '條/頁',
      prevPage: '上一頁',
      nextPage: '下一頁',
      prev: '向前',
      next: '向後',
      total: '共',
      jumpTo: '跳轉',
      itemUnit: '條'
    },

    select: {
      placeholder: '請選擇',
      empty: '暫無資料'
    },

    table: {
      empty: '暫無資料',
      filterConfirm: '篩選',
      filterReset: '重置',
      filterAll: '全部'
    },

    timeAgo: {
      ago: '前',
      late: '後',
      justNow: '剛剛',
      second: '秒',
      minute: '分鐘',
      hour: '小時',
      yesterday: '昨天',
      days: '天',
      lastMonth: '上個月',
      months: '個月',
      lastYear: '去年',
      years: '年'
    },

    timePicker: {
      confirm: '確認',
      cancel: '取消',
      placeholder: {
        time: '時間',
        start: '開始',
        end: '結束',
        select: '請選擇'
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
      target: '目標',
      empty: '暫無資料',
      reverse: '反選',
      search: '搜尋 (Ctrl + F)'
    },

    tree: {
      empty: '暫無資料'
    },

    upload: {
      upload: '上傳檔案',
      uploading: '上傳中',
      dragOrClick: '將檔案拖到此處, 或點選上傳'
    },

    viewer: {
      rotateRight: '向右旋轉',
      rotateLeft: '向左旋轉',
      flipHorizontal: '橫向翻轉',
      flipVertical: '縱向翻轉',
      zoomIn: '放大',
      zoomOut: '縮小',
      fullScreen: '全屏',
      fullScreenExit: '退出全屏',
      reset: '重置'
    }
  })
}
