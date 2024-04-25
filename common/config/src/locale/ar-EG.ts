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
      week7: 'Su',

      label: {
        month1: 'يناير',
        month2: 'فبراير',
        month3: 'مارس',
        month4: 'أبريل',
        month5: 'مايو',
        month6: 'يونيو',
        month7: 'يوليو',
        month8: 'أغسطس',
        month9: 'سبتمبر',
        month10: 'أكتوبر',
        month11: 'نوفمبر',
        month12: 'ديسمبر',
        week1: 'الإثنين',
        week2: 'الثلاثاء',
        week3: 'الأربعاء',
        week4: 'الخميس',
        week5: 'الجمعة',
        week6: 'السبت',
        week7: 'الأحد'
      }
    },

    captcha: {
      slideEnd: 'يرجى الانزلاق إلى النهاية',
      slide: 'يرجى الانزلاق إلى وضع مناسب',
      success: 'تم الاختبار بنجاح',
      fail: 'فشل الاختبار، يرجى إعادة المحاولة',
      doCaptcha: 'يرجى إكمال كلمة التحقق أدناه',
      pointInOrder: 'يرجى الإشارة بالترتيب',
      trigger: 'انقر لتشغيل كلمة التحقق',
      completed: 'تم الانتهاء من التحقق'
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
      endTime: 'وقت الانتهاء',
      quarter: 'ربع',
      week: 'أسبوع',
      date: 'يوم',
      hour: 'ساعة',
      minute: 'دقيقة',
      second: 'ثانية'
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
      increase: 'زيادة',
      decrease: 'نقص',
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
      },
      hour: 'ساعة',
      minute: 'دقيقة',
      second: 'ثانية'
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

    video: {
      play: 'لعب',
      pause: 'تورع',
      playPrev: 'السابق',
      playNext: 'مقبل',
      refresh: 'تحديث',
      flip: 'الوجه',
      requestPip: 'أدخل صورة داخل صورة',
      exitPip: 'الخروج من اللوحة',
      fullWindow: 'صفحة ويب ملء الشاشة',
      fullWindowExit: 'يتم إنهاء صفحة الويب في وضع ملء الشاشة',
      fullScreen: 'شاشة كاملة',
      fullScreenExit: 'خروج من شاشة كاملة',
      chapterCount: '{n} الفصل'
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
