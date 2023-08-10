import { defineLocaleConfig } from './helper'

export function enUSLocale() {
  return defineLocaleConfig({
    locale: 'en-US',
    wordSpace: true,

    calendar: {
      year: '',
      month: '',
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
      week1: 'Mo',
      week2: 'Tu',
      week3: 'We',
      week4: 'Th',
      week5: 'Fr',
      week6: 'Sa',
      week7: 'Su'
    },

    checkbox: {
      all: 'All'
    },

    colorPicker: {
      confirm: 'Confirm',
      cancel: 'Cancel'
    },

    confirm: {
      confirm: 'Confirm',
      cancel: 'Cancel'
    },

    datePicker: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      placeholder: {
        year: 'year',
        month: 'month',
        date: 'date',
        datetime: 'datetime',
        start: 'Start',
        end: 'End',
        select: 'Please select'
      },
      startTime: 'Start Time',
      endTime: 'End Time'
    },

    drawer: {
      confirm: 'Confirm',
      cancel: 'Cancel'
    },

    form: {
      submit: 'Submit',
      reset: 'Reset',
      notNullable: 'must not be null',
      validateFail: 'Validate failed'
    },

    image: {
      placeholder: 'Loading...',
      error: 'Loading fail'
    },

    input: {
      placeholder: 'Please input'
    },

    layout: {
      signOut: 'Sign out',
      signType: 'Navigation Type',
      majorColor: 'Major Color',
      themeMode: 'Theme Mode'
    },

    modal: {
      confirm: 'Confirm',
      cancel: 'Cancel'
    },

    numberInput: {
      placeholder: 'Please input number',
      outOfRange: 'Out of range'
    },

    pagination: {
      page: 'Page | Pages',
      perPage: '/ Page',
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
      confirm: 'Confirm',
      cancel: 'Cancel',
      placeholder: {
        time: 'time',
        start: 'Start',
        end: 'End',
        select: 'Please select'
      }
    },

    tour: {
      prev: 'Prev',
      next: 'Next',
      done: 'Done',
      stepCount: 'Step {n}',
      skip: 'Skip'
    },

    transfer: {
      source: 'Source',
      target: 'Target',
      empty: 'No data',
      reverse: 'Reverse selection',
      search: 'Search (Ctrl + F)'
    },

    tree: {
      empty: 'No data'
    },

    upload: {
      upload: 'Upload files',
      uploading: 'Uploading',
      dragOrClick: 'Drag files here, or click to upload'
    },

    viewer: {
      rotateRight: 'Rotate right',
      rotateLeft: 'Rotate left',
      flipHorizontal: 'Flip horizontal',
      flipVertical: 'Flip vertical',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      fullScreen: 'Full screen',
      fullScreenExit: 'Full screen exit',
      reset: 'Reset'
    }
  })
}
