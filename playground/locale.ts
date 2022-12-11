const config = {
  en: {
    doDelete: 'Are you sure to delete #{0}?',
    del: 'Delete',
    doDownload: 'Download project files?',
    cancel: 'Cancel',
    theme: 'Toggle theme',
    share: 'Share',
    download: 'Download',
    reset: 'Reset',
    cdn: 'Change CDN',
    other: 'Other',
    apply: 'Apply'
  },
  zh: {
    doDelete: '确定要删除 #{0} 吗？',
    del: '删除',
    doDownload: '要下载项目文件吗？',
    cancel: '取消',
    theme: '切换主题',
    share: '分享',
    download: '下载',
    reset: '重置',
    cdn: '更改 CDN',
    other: '其他',
    apply: '应用'
  }
}

type Language = keyof typeof config

let defaultLanguage = (
  typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en'
) as Language

if (!config[defaultLanguage]) {
  defaultLanguage = 'en'
}

export const locale = config[defaultLanguage]
