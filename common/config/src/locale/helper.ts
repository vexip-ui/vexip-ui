type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<any, any> ? DeepPartial<T[K]> : T[K]
}

export interface LocaleConfig {
  locale: string,

  // if false, the spaces will be removed when make sentence
  wordSpace: boolean,

  calendar: {
    year: string,
    month1: string,
    month2: string,
    month3: string,
    month4: string,
    month5: string,
    month6: string,
    month7: string,
    month8: string,
    month9: string,
    month10: string,
    month11: string,
    month12: string,
    week1: string,
    week2: string,
    week3: string,
    week4: string,
    week5: string,
    week6: string,
    week7: string
  },

  colorPicker: {
    confirm: string,
    cancel: string
  },

  confirm: {
    confirm: string,
    cancel: string
  },

  datePicker: {
    confirm: string,
    cancel: string
  },

  form: {
    submit: string,
    reset: string
  },

  input: {
    placeholder: string
  },

  modal: {
    confirm: string,
    cancel: string
  },

  pagination: {
    page: string,
    prePage: string,
    prevPage: string,
    nextPage: string,
    prev: string,
    next: string,
    total: string,
    jumpTo: string,
    itemUnit: string
  },

  select: {
    placeholder: string,
    empty: string
  },

  table: {
    empty: string,
    filterConfirm: string,
    filterReset: string,
    filterAll: string
  },

  timeAgo: {
    ago: string,
    late: string,
    justNow: string,
    second: string,
    minute: string,
    hour: string,
    yesterday: string,
    days: string,
    lastMonth: string,
    months: string,
    lastYear: string,
    years: string
  },

  timePicker: {
    confirm: string,
    cancel: string
  },

  tree: {
    empty: string
  },

  upload: {
    upload: string,
    uploading: string,
    dragOrClick: string
  }
}

export type LocaleOptions = DeepPartial<LocaleConfig>
export type LocaleNames = Exclude<keyof LocaleConfig, 'locale' | 'wordSpace'>

export function defineLocale(locale: LocaleOptions) {
  return locale
}

export function defineLocaleConfig(locale: LocaleConfig) {
  return locale
}
