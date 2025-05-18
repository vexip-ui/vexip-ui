import { defineLocaleConfig } from './helper'

/**
 * English locale config.
 *
 * @author @qmhc
 */
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
      week7: 'Su',

      ariaLabel: {
        year: 'Year',
        month: 'Month',
        month1: 'January',
        month2: 'February',
        month3: 'March',
        month4: 'April',
        month5: 'May',
        month6: 'June',
        month7: 'July',
        month8: 'August',
        month9: 'September',
        month10: 'October',
        month11: 'November',
        month12: 'December',
        week1: 'Monday',
        week2: 'Tuesday',
        week3: 'Wednesday',
        week4: 'Thursday',
        week5: 'Friday',
        week6: 'Saturday',
        week7: 'Sunday',
      },
    },

    captcha: {
      slideEnd: 'Please slide to the end',
      slide: 'Please slide to a suitable position',
      success: 'Test successful',
      fail: 'Test failed, please retry',
      doCaptcha: 'Please complete the captcha below',
      pointInOrder: 'Please point in order',
      trigger: 'Click to trigger captcha',
      completed: 'Captcha completed',
    },

    checkbox: {
      all: 'All',
    },

    colorPicker: {
      confirm: 'Confirm',
      cancel: 'Cancel',

      ariaLabel: {
        clear: 'Clear color',
      },
    },

    confirm: {
      confirm: 'Confirm',
      cancel: 'Cancel',
    },

    datePicker: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      placeholder: {
        year: 'year',
        month: 'month',
        week: 'week',
        date: 'date',
        datetime: 'datetime',
        start: 'Start',
        end: 'End',
        select: 'Please select',
      },
      startTime: 'Start Time',
      endTime: 'End Time',

      ariaLabel: {
        clear: 'Clear date',
        quarter: 'Quarter',
        week: 'Week',
        date: 'Date',
        hour: 'Hour',
        minute: 'Minute',
        second: 'Second',
      },
    },

    drawer: {
      confirm: 'Confirm',
      cancel: 'Cancel',
    },

    form: {
      submit: 'Submit',
      reset: 'Reset',
      notNullable: 'must not be null',
      validateFail: 'Validate failed',
    },

    image: {
      placeholder: 'Loading...',
      error: 'Loading fail',
    },

    input: {
      placeholder: 'Please input',

      ariaLabel: {
        clear: 'Clear input',
      },
    },

    layout: {
      signOut: 'Sign out',
      signType: 'Navigation Type',
      majorColor: 'Major Color',
      themeMode: 'Theme Mode',
    },

    modal: {
      confirm: 'Confirm',
      cancel: 'Cancel',
    },

    numberInput: {
      placeholder: 'Please input number',
      outOfRange: 'Out of range',

      ariaLabel: {
        clear: 'Clear number',
        increase: 'Increase',
        decrease: 'Decrease',
      },
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
      itemUnit: 'Item | Items',
    },

    select: {
      placeholder: 'Please select',
      empty: 'No data',
      search: 'Search options',

      ariaLabel: {
        clear: 'Clear select',
      },
    },

    table: {
      empty: 'No data',
      filterConfirm: 'Filter',
      filterReset: 'Reset',
      filterAll: 'All',
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
      years: 'Years',
    },

    timePicker: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      placeholder: {
        time: 'time',
        start: 'Start',
        end: 'End',
        select: 'Please select',
      },

      ariaLabel: {
        clear: 'Clear time',
        hour: 'Hour',
        minute: 'Minute',
        second: 'Second',
      },
    },

    tour: {
      prev: 'Prev',
      next: 'Next',
      done: 'Done',
      stepCount: 'Step {n}',
    },

    transfer: {
      source: 'Source',
      target: 'Target',
      empty: 'No data',
      reverse: 'Reverse selection',
      search: 'Search (Ctrl + F)',
    },

    tree: {
      empty: 'No data',
    },

    upload: {
      upload: 'Upload files',
      uploading: 'Uploading',
      dragOrClick: 'Drag files here, or click to upload',

      ariaLabel: {
        preview: 'Preview file',
        delete: 'Delete file',
      },
    },

    video: {
      play: 'Play',
      pause: 'Pause',
      playPrev: 'Prev',
      playNext: 'Next',
      refresh: 'Refresh',
      flip: 'Flip',
      requestPip: 'Enter PIP',
      exitPip: 'Exit PIP',
      fullWindow: 'Full window',
      fullWindowExit: 'Full window exit',
      fullScreen: 'Full screen',
      fullScreenExit: 'Full screen exit',
      chapterCount: 'Chapter {n}',
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
      reset: 'Reset',
    },
  })
}
