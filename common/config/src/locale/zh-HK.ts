import { defineLocaleConfig } from './helper'

/**
 * Chinese (HK) locale config.
 *
 * @author @qmhc
 */
export function zhHKLocale() {
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
        week7: '星期日',
      },
    },

    captcha: {
      slideEnd: '請滑動到最後',
      slide: '請滑動到適當的位置',
      success: '驗證成功',
      fail: '驗證失敗，請重試',
      doCaptcha: '請完成下面的驗證',
      pointInOrder: '請按順序點擊',
      trigger: '點擊進行驗證',
      completed: '已完成驗證',
    },

    checkbox: {
      all: '全選',
    },

    colorPicker: {
      confirm: '確定',
      cancel: '重置',

      ariaLabel: {
        clear: '清空顏色',
      },
    },

    confirm: {
      confirm: '確認',
      cancel: '取消',
    },

    datePicker: {
      confirm: '確認',
      cancel: '取消',
      placeholder: {
        year: '年份',
        month: '月份',
        week: '周',
        date: '日期',
        datetime: '日期時間',
        start: '開始',
        end: '結束',
        select: '請選擇',
      },
      startTime: '開始時間',
      endTime: '結束時間',

      ariaLabel: {
        clear: '清空日期',
        quarter: '季度',
        week: '周',
        date: '日',
        hour: '時',
        minute: '分',
        second: '秒',
      },
    },

    drawer: {
      confirm: '確認',
      cancel: '取消',
    },

    form: {
      submit: '提交',
      reset: '重置',
      notNullable: '不可為空',
      validateFail: '驗證未通過',
    },

    image: {
      placeholder: '加載中...',
      error: '加載失敗',
    },

    input: {
      placeholder: '請輸入',

      ariaLabel: {
        clear: '清空文本',
      },
    },

    layout: {
      signOut: '註銷',
      signType: '導航模式',
      majorColor: '主題顏色',
      themeMode: '主題模式',
    },

    modal: {
      confirm: '確認',
      cancel: '取消',
    },

    numberInput: {
      placeholder: '請輸入數字',
      outOfRange: '超出範圍',

      ariaLabel: {
        clear: '清空數字',
        increase: '增加',
        decrease: '減少',
      },
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
      itemUnit: '條',
    },

    select: {
      placeholder: '請選擇',
      empty: '暫無數據',
      search: '搜索選項',

      ariaLabel: {
        clear: '清空選項',
      },
    },

    table: {
      empty: '暫無數據',
      filterConfirm: '篩選',
      filterReset: '重置',
      filterAll: '全部',
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
      years: '年',
    },

    timePicker: {
      confirm: '確認',
      cancel: '取消',
      placeholder: {
        time: '時間',
        start: '開始',
        end: '結束',
        select: '請選擇',
      },

      ariaLabel: {
        clear: '清空時間',
        hour: '時',
        minute: '分',
        second: '秒',
      },
    },

    tour: {
      prev: '上一步',
      next: '下一步',
      done: '完成',
      stepCount: '第 {n} 步',
    },

    transfer: {
      source: '源',
      target: '目標',
      empty: '暫無數據',
      reverse: '反選',
      search: '搜索 (Ctrl + F)',
    },

    tree: {
      empty: '暫無數據',
    },

    upload: {
      upload: '上傳文件',
      uploading: '上傳中',
      dragOrClick: '將文件拖到此處, 或點擊上傳',

      ariaLabel: {
        preview: '預覽文件',
        delete: '刪除文件',
      },
    },

    video: {
      play: '播放',
      pause: '暫停',
      playPrev: '上一個',
      playNext: '下一個',
      refresh: '刷新',
      flip: '鏡像翻轉',
      requestPip: '進入畫中畫',
      exitPip: '退出畫中畫',
      fullWindow: '進入網頁全屏',
      fullWindowExit: '退出網頁全屏',
      fullScreen: '進入全屏',
      fullScreenExit: '退出全屏',
      chapterCount: '第 {n} 章',
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
      reset: '重置',
    },
  })
}
