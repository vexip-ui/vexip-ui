import { defineLocaleConfig } from './helper'

/**
 * Tamil locale config.
 *
 * @author @thearasu
 */
export function taINLocale() {
  return defineLocaleConfig({
    locale: 'ta-IN',
    wordSpace: true,

    calendar: {
      year: '',
      month: '',
      month1: 'ஜனவரி',
      month2: 'பிப்ரவரி',
      month3: 'மார்ச்',
      month4: 'ஏப்ரல்',
      month5: 'மே',
      month6: 'ஜூன்',
      month7: 'ஜூலை',
      month8: 'ஆகஸ்ட்',
      month9: 'செப்டம்பர்',
      month10: 'அக்டோபர்',
      month11: 'நவம்பர்',
      month12: 'டிசம்பர்',
      week1: 'Mo',
      week2: 'Tu',
      week3: 'We',
      week4: 'Th',
      week5: 'Fr',
      week6: 'Sa',
      week7: 'Su',

      ariaLabel: {
        year: 'ஆண்டு',
        month: 'மாதம்',
        month1: 'ஜனவரி',
        month2: 'பிப்ரவரி',
        month3: 'மார்ச்',
        month4: 'ஏப்ரல்',
        month5: 'மே',
        month6: 'ஜூன்',
        month7: 'ஜூலை',
        month8: 'ஆகஸ்ட்',
        month9: 'செப்டம்பர்',
        month10: 'அக்டோபர்',
        month11: 'நவம்பர்',
        month12: 'டிசம்பர்',
        week1: 'திங்கள்',
        week2: 'செவ்வாய்',
        week3: 'புதன்',
        week4: 'வியாழன்',
        week5: 'வெள்ளி',
        week6: 'சனி',
        week7: 'ஞாயிறு',
      },
    },

    captcha: {
      slideEnd: 'இறுதிக்கு ஸ்லைடு',
      slide: 'சரியான நிலைக்கு ஸ்லைடு செய்யவும்',
      success: 'சோதனை வெற்றி',
      fail: 'சோதனை தோல்வி',
      doCaptcha: 'கீழே உள்ள கேப்ட்சாவை முடிக்கவும்',
      pointInOrder: 'வரிசையில் புள்ளி',
      trigger: 'கேப்ட்சா கிளிக் செய்யவும்',
      completed: 'கேப்ட்சா முடிந்தது',
    },

    checkbox: {
      all: 'அனைத்தும்',
    },

    colorPicker: {
      confirm: 'உறுதிபடுத்து',
      cancel: 'நிராகரி',

      ariaLabel: {
        clear: 'தெளிவாக்கு',
      },
    },

    confirm: {
      confirm: 'உறுதிபடுத்து',
      cancel: 'நிராகரி',
    },

    datePicker: {
      confirm: 'உறுதிபடுத்து',
      cancel: 'நிராகரி',
      placeholder: {
        year: 'வருடம்',
        month: 'மாதம்',
        week: 'வாரம்',
        date: 'தேதி',
        datetime: 'தேதி நேரம்',
        start: 'தொடக்கம்',
        end: 'முடிவு',
        select: 'தயவுசெய்து தேர்ந்தெடுக்கவும்',
      },
      startTime: 'தொடக்கம் நேரம்',
      endTime: 'முடிவு நேரம்',

      ariaLabel: {
        clear: 'தெளிவாக்கு',
        quarter: 'பருவம்',
        week: 'வாரம்',
        date: 'தேதி',
        hour: 'மணி',
        minute: 'நிமிடம்',
        second: 'வினாடி',
      },
    },

    drawer: {
      confirm: 'உறுதிபடுத்து',
      cancel: 'நிராகரி',
    },

    form: {
      submit: 'ஒப்படை',
      reset: 'மீள் துவக்கு',
      notNullable: 'வெற்றிடமாக இருக்க கூடாது',
      validateFail: 'சரிபார்த்தல் தோல்வியுற்றது',
    },

    image: {
      placeholder: 'ஏற்றுகிறது...',
      error: 'ஏற்றுதல் தோல்வியுற்றது',
    },

    input: {
      placeholder: 'தயவுசெய்து உள்ளிடவும்',

      ariaLabel: {
        clear: 'தெளிவாக்கு',
      },
    },

    layout: {
      signOut: 'வெளியேறு',
      signType: 'வழியமைப்பு முறை',
      majorColor: 'முதன்மை வண்ணம்',
      themeMode: 'நிறமுறை',
    },

    modal: {
      confirm: 'உறுதிபடுத்து',
      cancel: 'நிராகரி',
    },

    numberInput: {
      placeholder: 'தயவுசெய்து எண் உள்ளிடவும்',
      outOfRange: 'வரம்புக்கு வெளியே',

      ariaLabel: {
        clear: 'தெளிவாக்கு',
        increase: 'அதிகரிக்க',
        decrease: 'குறைக்க',
      },
    },

    pagination: {
      page: 'பக்கம் | பக்கங்கள்',
      perPage: '/ பக்கம்',
      prevPage: 'முந்தய பக்கம்',
      nextPage: 'அடுத்த பக்கம்',
      prev: 'முன்னால்',
      next: 'அடுத்து ',
      total: 'மொத்தம்',
      jumpTo: 'இதற்கு தாவு',
      itemUnit: 'உருப்படி | உருப்படிகள்',
    },

    select: {
      placeholder: 'தயவுசெய்து தேர்ந்தெடுகக்கவும்',
      empty: 'தரவு இல்லை',
      search: 'தேடு அல்லது உள்ளிடு',

      ariaLabel: {
        clear: 'தெளிவாக்கு',
      },
    },

    table: {
      empty: 'தரவு இல்லை',
      filterConfirm: 'வடிகட்டு',
      filterReset: 'மீள் துவக்கு',
      filterAll: 'அனைத்தும்',
    },

    timeAgo: {
      ago: 'முன்',
      late: 'தாமதம்',
      justNow: 'தற்போது',
      second: 'வினாடி | வினாடிகள்',
      minute: 'நிமிடம் | நிமிடங்கள்',
      hour: 'மணித்துளி | மணித்துளிகள்',
      yesterday: 'நேற்று',
      days: 'நாட்கள்',
      lastMonth: 'கடந்த மாதம்',
      months: 'மாதம்',
      lastYear: 'கடந்த வருடம்',
      years: 'வருடங்கள்',
    },

    timePicker: {
      confirm: 'உறுதிப்படுத்து',
      cancel: 'நிராகரி',
      placeholder: {
        time: 'நேரம்',
        start: 'தொடக்கம்',
        end: 'முடிவு',
        select: 'தயவுசெய்து தேர்ந்தெடுக்கவும்',
      },

      ariaLabel: {
        clear: 'தெளிவாக்கு',
        hour: 'மணி',
        minute: 'நிமிடம்',
        second: 'வினாடி',
      },
    },

    tour: {
      prev: 'முன்',
      next: 'அடுத்தவர்',
      done: 'முடிந்த',
      stepCount: 'படிமுறை {n}',
    },

    transfer: {
      source: 'மூலம்',
      target: 'இலக்கு',
      empty: 'தரவு இல்லை',
      reverse: 'மீள் தேர்வு',
      search: 'தேடு',
    },

    tree: {
      empty: 'தரவு இல்லை',
    },

    upload: {
      upload: 'கோப்புகளை பதிவேற்று',
      uploading: 'பதிவேற்றுகிறது...',
      dragOrClick: 'கோப்புகளை இங்கே விடவும் அல்லது பதிவேற்ற அழுத்தவும்',

      ariaLabel: {
        preview: 'முன்னோட்டம்',
        delete: 'கோப்பை நீக்கு',
      },
    },

    video: {
      play: 'விளையாட்டு',
      pause: 'இடை ஓய்வு',
      playPrev: 'முன்',
      playNext: 'அடுத்தவர்',
      refresh: 'புதுக்கிளர்ச்சியூட்டு',
      flip: 'விரல் நொடி',
      requestPip: 'PIP ஐ உள்ளிடவும்',
      exitPip: 'PIP இலிருந்து வெளியேறவும்',
      fullWindow: 'முழு ஜன்னல்',
      fullWindowExit: 'முழு சாளர வெளியேற்றம்',
      fullScreen: 'முழுத் திரை',
      fullScreenExit: 'முழுத்திரை வெளியேறு',
      chapterCount: 'அத்தியாயம் {n}',
    },

    viewer: {
      rotateRight: 'வலப்புறம் சுற்றவும்',
      rotateLeft: 'இடப்புறம் சுற்றவும்',
      flipHorizontal: 'கிடைமட்டத்தை புரட்டவும்',
      flipVertical: 'செங்குத்தாக புரட்டவும்',
      zoomIn: 'பெரிதாக்கு',
      zoomOut: 'சிறிதாக்கு',
      fullScreen: 'முழுத்திரை',
      fullScreenExit: 'முழுத்திரயிலிருந்து வெளியேறு',
      reset: 'மீள்துவக்கு ',
    },
  })
}
