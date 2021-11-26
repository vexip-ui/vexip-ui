import { reactive } from 'vue'
import { mergeObjects } from '@/common/utils/transform'

export function getDefaultLocaleConfig() {
  return {
    locale: 'zh-CN',

    // if false, the spaces will be removed when make sentence
    wordSpace: false,

    calendar: {
      year: '年',
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

    colorPicker: {
      confirm: '确定',
      cancel: '重置'
    },

    confirm: {
      confirm: '确认',
      cancel: '取消'
    },

    datePicker: {
      confirm: '确认',
      cancel: '取消'
    },

    form: {
      submit: '提交',
      reset: '重置'
    },

    input: {
      placeholder: '请输入'
    },

    modal: {
      confirm: '确认',
      cancel: '取消'
    },

    pagination: {
      page: '页',
      prePage: '/页',
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
      empty: '暂无数据'
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
      months: '月',
      lastYear: '去年',
      years: '年'
    },

    timePicker: {
      confirm: '确认',
      cancel: '取消'
    },

    tree: {
      empty: '暂无数据'
    },

    upload: {
      upload: '上传文件',
      uploading: '上传中',
      dragOrClick: '将文件拖到此处, 或点击上传'
    }
  }
}

export type LocaleConfig = ReturnType<typeof getDefaultLocaleConfig>
export type LocaleNames = Exclude<keyof LocaleConfig, 'locale' | 'wordSpace'>

type DeepPartial<T> = {
  [K in keyof T]?: DeepPartial<T[K]>
}

export type LocaleOptions = DeepPartial<LocaleConfig>

const config = reactive({
  locale: getDefaultLocaleConfig()
})

export function configLocale(locale: LocaleOptions) {
  config.locale = mergeObjects(getDefaultLocaleConfig(), locale, false)
}

export function useLocaleConfig<T extends LocaleNames>(name: T) {
  return config.locale[name]
}

export function getCountWord(wordTemplate: string, count: number) {
  const words = wordTemplate.split('|')

  if (words.length === 1) return `${count} ${wordTemplate}`

  return `${count} ${count > 1 ? words[1].trim() : words[0].trim()}`
}

export function getCountWordOnly(wordTemplate: string, count: number) {
  const words = wordTemplate.split('|')

  if (words.length === 1) return wordTemplate

  return count > 1 ? words[1].trim() : words[0].trim()
}

export function makeSentence(words: string) {
  return config.locale.wordSpace ? words.replace(/\s+/g, '') : words
}
