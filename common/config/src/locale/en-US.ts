import { defineLocale } from './helper'

export function enUSLocale() {
  return defineLocale({
    locale: 'en-US',
    wordSpace: true,

    calendar: {
      year: 'Year',
      month1: 'Jan',
      month2: 'Feb',
      month3: 'Mar',
      month4: 'Apr',
      month5: 'May',
      month6: 'Jun',
      month7: 'Jul',
      month8: 'Aug',
      month9: 'Sep',
      month10: 'Oct',
      month11: 'Nov',
      month12: 'Dec',
      week1: 'Mon',
      week2: 'Tues',
      week3: 'Wed',
      week4: 'Thur',
      week5: 'Fri',
      week6: 'Sat',
      week7: 'Sun'
    },

    colorPicker: {
      confirm: 'Confrim',
      cancel: 'Cancel'
    },

    confirm: {
      confirm: 'Confrim',
      cancel: 'Cancel'
    },

    datePicker: {
      confirm: 'Confrim',
      cancel: 'Cancel'
    },

    form: {
      submit: 'Submit',
      reset: 'Reset'
    },

    input: {
      placeholder: 'Please input'
    },

    modal: {
      confirm: 'Confrim',
      cancel: 'Cancel'
    },

    pagination: {
      page: 'Page | Pages',
      prePage: '/ Page',
      prevPage: 'Prev Page',
      nextPage: 'Next Page',
      prev: 'Prev',
      next: 'Next',
      total: 'Total',
      jumpTo: 'Jump to',
      itemUnit: 'Item | Items'
    },

    select: {
      placeholder: 'Please select',
      empty: 'No data'
    },

    table: {
      empty: 'No data',
      filterConfirm: 'Filter',
      filterReset: 'Reset',
      filterAll: 'All'
    },

    timeAgo: {
      ago: 'Ago',
      late: 'Late',
      justNow: 'Now',
      second: 'Second | Seconds',
      minute: 'Minute | Minutes',
      hour: 'Hour | Hours',
      yesterday: 'Yesterday',
      days: 'Days',
      lastMonth: 'Last month',
      months: 'Months',
      lastYear: 'Last year',
      years: 'Years'
    },

    timePicker: {
      confirm: 'Confrim',
      cancel: 'Cancel'
    },

    tree: {
      empty: 'No data'
    },

    upload: {
      upload: 'Upload files',
      uploading: 'Uploading',
      dragOrClick: 'Drag files here, or click to upload'
    }
  })
}
