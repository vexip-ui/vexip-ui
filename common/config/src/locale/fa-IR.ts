import { defineLocaleConfig } from './helper'

/**
 * Persian (Farsi) locale config.
 *
 * @author @alphaelf
 */
export function faIRLocale() {
  return defineLocaleConfig({
    locale: 'fa-IR',
    wordSpace: true,

    calendar: {
      year: '',
      month: '',
      month1: 'ژانویه',
      month2: 'فوریه',
      month3: 'مارس',
      month4: 'آوریل',
      month5: 'مه',
      month6: 'ژوئن',
      month7: 'ژوئیه',
      month8: 'اوت',
      month9: 'سپتامبر',
      month10: 'اکتبر',
      month11: 'نوامبر',
      month12: 'دسامبر',
      week1: 'د',
      week2: 'س',
      week3: 'چ',
      week4: 'پ',
      week5: 'ج',
      week6: 'ش',
      week7: 'ی',

      ariaLabel: {
        year: 'سال',
        month: 'ماه',
        month1: 'ژانویه',
        month2: 'فوریه',
        month3: 'مارس',
        month4: 'آوریل',
        month5: 'مه',
        month6: 'ژوئن',
        month7: 'ژوئیه',
        month8: 'اوت',
        month9: 'سپتامبر',
        month10: 'اکتبر',
        month11: 'نوامبر',
        month12: 'دسامبر',
        week1: 'دو‌شنبه',
        week2: 'سه‌شنبه',
        week3: 'چهار‌شنبه',
        week4: 'پنج‌شنبه',
        week5: 'جمعه',
        week6: 'شنبه',
        week7: 'یک‌شنبه',
      },
    },

    captcha: {
      slideEnd: 'لطفاً نشان‌گر را تا انتها بکشید',
      slide: 'لطفاً نشان‌گر را تا مکان مناسب بکشید',
      success: 'راستی‌آزمایی با موفقیت انجام شد',
      fail: 'راستی‌آزمایی انجام نشد، دوباره اقدام کنید',
      doCaptcha: 'لطفاً راستی‌آزمایی زیر را کامل کنید',
      pointInOrder: 'لطفاً براساس اولویت روی تصویر انتخاب کنید',
      trigger: 'برای شروع راستی‌آزمایی کلیک کنید',
      completed: 'راستی‌آزمایی کامل شد',
    },

    checkbox: {
      all: 'همه',
    },

    colorPicker: {
      confirm: 'تایید',
      cancel: 'انصراف',

      ariaLabel: {
        clear: 'پاکسازی رنگ',
      },
    },

    confirm: {
      confirm: 'تایید',
      cancel: 'انصراف',
    },

    datePicker: {
      confirm: 'تایید',
      cancel: 'انصراف',
      placeholder: {
        year: 'سال',
        month: 'ماه',
        date: 'تاریخ',
        datetime: 'زمان',
        start: 'شروع',
        end: 'پایان',
        select: 'انتخاب',
      },
      startTime: 'شروع زمان',
      endTime: 'پایان زمان',

      ariaLabel: {
        clear: 'پاکسازی تاریخ',
        quarter: 'فصل',
        week: 'هفته',
        date: 'تاریخ',
        hour: 'ساعت',
        minute: 'دقیقه',
        second: 'ثانیه',
      },
    },

    drawer: {
      confirm: 'تایید',
      cancel: 'انصراف',
    },

    form: {
      submit: 'ارسال',
      reset: 'باز‌نشانی',
      notNullable: '‌نباید خالی باشد',
      validateFail: 'اعتبار‌سنجی نشد',
    },

    image: {
      placeholder: 'درحال بارگزاری...',
      error: 'بارگزاری نشد',
    },

    input: {
      placeholder: 'لطفاً وارد کنید',

      ariaLabel: {
        clear: 'پاکسازی ورودی',
      },
    },

    layout: {
      signOut: 'خروج',
      signType: 'نوع پیمایش',
      majorColor: 'رنگ اصلی',
      themeMode: 'حالت رنگ‌بندی',
    },

    modal: {
      confirm: 'تایید',
      cancel: 'انصراف',
    },

    numberInput: {
      placeholder: 'لطفاً عددی وارد کنید',
      outOfRange: 'خارج از بازه',

      ariaLabel: {
        clear: 'پاکسازی عدد',
        increase: 'افزایش',
        decrease: 'کاهش',
      },
    },

    pagination: {
      page: 'صفحه',
      perPage: '/ صفحه',
      prevPage: 'صفحه قبلی',
      nextPage: 'صفحه بعدی',
      prev: 'قبلی',
      next: 'بعدی',
      total: 'مجموع',
      jumpTo: 'برو به ',
      itemUnit: 'مورد',
    },

    select: {
      placeholder: 'لطفاً انتخاب کنید',
      empty: 'بدون داده',
      search: 'جستجوی گزینه‌ها',

      ariaLabel: {
        clear: 'پاکسازی انتخاب',
      },
    },

    table: {
      empty: 'بدون داده',
      filterConfirm: 'فیلتر',
      filterReset: 'بازنشانی',
      filterAll: 'همه',
    },

    timeAgo: {
      ago: 'قبل',
      late: 'اخیراً',
      justNow: 'همین الان',
      second: 'ثانیه',
      minute: 'دقیقه',
      hour: 'ساعت',
      yesterday: 'دیروز',
      days: 'روز',
      lastMonth: 'ماه گذشته',
      months: 'ماه',
      lastYear: 'سال گذشته',
      years: 'سال',
    },

    timePicker: {
      confirm: 'تایید',
      cancel: 'انصراف',
      placeholder: {
        time: 'زمان',
        start: 'شروع',
        end: 'پایان',
        select: 'لطفاً انتخاب کنید',
      },

      ariaLabel: {
        clear: 'پاکسازی زمان',
        hour: 'ساعت',
        minute: 'دقیقه',
        second: 'ثانیه',
      },
    },

    tour: {
      prev: 'قبلی',
      next: 'بعدی',
      done: 'پایان',
      stepCount: 'گام {n}',
    },

    transfer: {
      source: 'موجود',
      target: 'منتخب',
      empty: 'بدون داده',
      reverse: 'معکوس‌کردن انتخاب‌ها',
      search: 'جستجو (Ctrl + F)',
    },

    tree: {
      empty: 'بدون داده',
    },

    upload: {
      upload: 'آپلود اسناد',
      uploading: 'درحال آپلود',
      dragOrClick: 'برای آپلود، اسناد را به اینجا بکشید یا کلیک کنید',

      ariaLabel: {
        preview: 'پیش‌نمایش سند',
        delete: 'حذف سند',
      },
    },

    video: {
      play: 'پخش',
      pause: 'توقف',
      playPrev: 'قبلی',
      playNext: 'بعدی',
      refresh: 'تازه‌سازی',
      flip: 'وارونه‌کردن',
      requestPip: 'تصویر‌در‌تصویر',
      exitPip: 'خروج از تصویر‌در‌تصویر',
      fullWindow: 'تمام‌پنجره',
      fullWindowExit: 'خروج از تمام‌پنجره',
      fullScreen: 'تمام‌صفحه',
      fullScreenExit: 'خروج از تمام‌صفحه',
      chapterCount: 'سرفصل {n}',
    },

    viewer: {
      rotateRight: 'چرخش به راست',
      rotateLeft: 'چرخش به چپ',
      flipHorizontal: 'وارونه‌کردن افقی',
      flipVertical: 'وارونه‌کردن عمودی',
      zoomIn: 'بزرگ‌نمایی',
      zoomOut: 'کوچک‌نمایی',
      fullScreen: 'تمام‌صفحه',
      fullScreenExit: 'خروج از تمام‌صفحه',
      reset: 'بازنشانی',
    },
  })
}
