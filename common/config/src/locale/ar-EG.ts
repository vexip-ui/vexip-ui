import { defineLocaleConfig } from './helper'

/**
 * Arabic locale config
 */
export function arEGLocale() {
  return defineLocaleConfig({
    locale: 'ar-EG',
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
      all: 'الكل'
    },

    colorPicker: {
      confirm: 'موافق',
      cancel: 'الغاء'
    },

    confirm: {
      confirm: 'موافق',
      cancel: 'الغاء'
    },

    datePicker: {
      confirm: 'موافق',
      cancel: 'الغاء',
      placeholder: {
        year: 'سنة',
        month: 'شهر',
        date: 'يوم',
        datetime: 'تاريخ',
        start: 'يبدأ بـ',
        end: 'ينتهى بـ',
        select: 'اختر'
      },
      startTime: 'وقت البدء',
      endTime: 'وقت الانتهاء'
    },

    drawer: {
      confirm: 'موافق',
      cancel: 'الغاء'
    },

    form: {
      submit: 'ارسال',
      reset: 'اعادة',
      notNullable: 'مطلوب',
      validateFail: 'قيم خاطئة'
    },

    image: {
      placeholder: 'جار التحميل...',
      error: 'خطأ فى التحميل'
    },

    input: {
      placeholder: 'ادخل بيانات'
    },

    layout: {
      signOut: 'تسجيل خروج',
      signType: 'نوع الانتقال',
      majorColor: 'اللون الاساسى',
      themeMode: 'وضع اللون'
    },

    modal: {
      confirm: 'موافق',
      cancel: 'الغاء'
    },

    numberInput: {
      placeholder: 'ادخل قيم رقمية',
      outOfRange: 'خارج النطاق'
    },

    pagination: {
      page: 'صفحة | صفحات',
      perPage: '/ صفحة',
      prevPage: 'صفحة سابقة',
      nextPage: 'صفحة تالية',
      prev: 'السابق',
      next: 'التالى',
      total: 'الاجمالى',
      jumpTo: 'انتقال الى',
      itemUnit: 'عنصر | عناصر'
    },

    select: {
      placeholder: 'اختر',
      empty: 'لا توجد بيانات'
    },

    table: {
      empty: 'لا توجد بيانات',
      filterConfirm: 'موافق',
      filterReset: 'اعادة',
      filterAll: 'الكل'
    },

    timeAgo: {
      ago: 'منذ',
      late: 'مؤخراً',
      justNow: 'الآن',
      second: 'ثانية | ثوانى',
      minute: 'دقيقة | دقائق',
      hour: 'ساعة | ساعات',
      yesterday: 'امس',
      days: 'ايام',
      lastMonth: 'الشهر الماضى',
      months: 'شهور',
      lastYear: 'السنة الماضية',
      years: 'سنوات'
    },

    timePicker: {
      confirm: 'موافق',
      cancel: 'الغاء',
      placeholder: {
        time: 'وقت',
        start: 'يبدأ بـ',
        end: 'ينتهى بـ',
        select: 'اختر'
      }
    },

    tour: {
      prev: 'السابق',
      next: 'التالى',
      done: 'اكتمل',
      stepCount: 'خطوة {n}'
    },

    transfer: {
      source: 'مصدر',
      target: 'وجهة',
      empty: 'لا توجد بيانات',
      reverse: 'عكس الاختيار',
      search: 'بحث (Ctrl + F)'
    },

    tree: {
      empty: 'لا توجد بيانات'
    },

    upload: {
      upload: 'تحميل ملفات',
      uploading: 'جار التحميل',
      dragOrClick: 'اسحب وضع الملقات هنا, او اضغط تحميل ملفات'
    },

    viewer: {
      rotateRight: 'تدوير لليمين',
      rotateLeft: 'تدوير لليسار',
      flipHorizontal: 'قلب اتجاه افقى',
      flipVertical: 'قلب اتجاه رأسى',
      zoomIn: 'تكبير',
      zoomOut: 'تصغير',
      fullScreen: 'شاشة كاملة',
      fullScreenExit: 'خروج من شاشة كاملة',
      reset: 'اعادة'
    }
  })
}
