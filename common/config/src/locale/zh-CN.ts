import { defineLocaleConfig } from './helper'

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
      week7: '日'
    },

    checkbox: {
      all: '全选'
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

    drawer: {
      confirm: '确认',
      cancel: '取消'
    },

    form: {
      submit: '提交',
      reset: '重置',
      notNullable: '不可为空'
    },

    input: {
      placeholder: '请输入'
    },

    layout: {
      signOut: '注销',
      signType: '导航模式',
      majorColor: '主题颜色'
    },

    modal: {
      confirm: '确认',
      cancel: '取消'
    },

    pagination: {
      page: '页',
      prePage: '条/页',
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
      months: '个月',
      lastYear: '去年',
      years: '年'
    },

    timePicker: {
      confirm: '确认',
      cancel: '取消'
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
      dragOrClick: '将文件拖到此处, 或点击上传'
    },

    viewer: {
      rotateRight: '向右旋转',
      rotateLeft: '向左旋转',
      flipHorizontal: '横向翻转',
      flipVertical: '纵向翻转',
      zoomIn: '放大',
      zoomOut: '缩小',
      fullScreen: '全屏',
      fullScreenExit: '退出全屏',
      reset: '重置'
    }
  })
}
