import '@/common/icons/file-word'
import '@/common/icons/file-video'
import '@/common/icons/file-powerpoint'
import '@/common/icons/file-pdf'
import '@/common/icons/file-image'
import '@/common/icons/file-excel'
import '@/common/icons/file-code'
import '@/common/icons/brands/js'
import '@/common/icons/brands/css3-alt'
import '@/common/icons/brands/sass'
import '@/common/icons/brands/less'
import '@/common/icons/brands/java'
import '@/common/icons/brands/vuejs'
import '@/common/icons/brands/html5'
import '@/common/icons/brands/python'
import '@/common/icons/file-audio'
import '@/common/icons/file-archive'
import '@/common/icons/file-alt'
import '@/common/icons/file-csv'
import '@/common/icons/file-prescription'
import '@/common/icons/file'

export const iconConfig = {
  'file-word': ['doc', 'docx'],
  'file-video': [
    'mp4',
    'flv',
    'mkv',
    'rm',
    'rmvb',
    'mov',
    'mtv',
    'wnv',
    'avi',
    '3gp',
    'amv',
    'dmv'
  ],
  'file-powerpoint': ['ppt', 'pptx', 'pptm'],
  'file-pdf': ['pdf'],
  'file-image': [
    'bmp',
    'jpg',
    'jpeg',
    'png',
    'tif',
    'gif',
    'pcx',
    'tga',
    'exif',
    'fpx',
    'svg',
    'psd',
    'cdr',
    'pcd',
    'dxf',
    'ufo',
    'eps',
    'ai',
    'raw',
    'wmf',
    'webp'
  ],
  'file-excel': ['xls', 'xlsx', 'xlsm', 'xlsb', 'xlam'],
  'file-code': [
    'json',
    'xml',
    'java',
    'property',
    'class',
    'c',
    'cpp',
    'cc',
    'cxx',
    'h',
    'hpp',
    'hxx',
    'cs'
  ],
  'brands/js': ['js', 'jsx'],
  'brands/css3-alt': ['css', 'styl'],
  'brands/sass': ['sass', 'scss'],
  'brands/less': ['less'],
  'brands/java': ['java', 'class', 'jsp'],
  'brands/vuejs': ['vue'],
  'brands/html5': ['html', 'htm'],
  'brands/python': ['py', 'pyc', 'pyw', 'pyo', 'pyd'],
  'file-audio': [
    'cd',
    'wave',
    'aiff',
    'mpeg',
    'mp3',
    'mpeg-4',
    'midi',
    'wma',
    'ra',
    'rm',
    'rmx',
    'vqf',
    'amr',
    'ape',
    'flac',
    'aac'
  ],
  'file-archive': [
    'rar',
    'zip',
    '7z',
    'cab',
    'arj',
    'lzh',
    'tar',
    'gz',
    'ace',
    'uue',
    'bz2',
    'jar',
    'iso'
  ],
  'file-alt': ['txt'],
  'file-csv': ['csv'],
  'file-prescription': ['rvt', 'rfa', 'rte', 'rtf', 'dgn', 'dwf', 'dwg', 'ifc', 'sat', 'skp'],
  file: ['default']
}

type IconName = keyof typeof iconConfig

const iconMaps: Record<string, IconName> = {}
const icons = Object.keys(iconConfig) as IconName[]

for (const icon of icons) {
  const extensions = iconConfig[icon]

  if (extensions && extensions.length) {
    for (const extension of extensions) {
      iconMaps[extension] = icon
    }
  }
}

export { iconMaps }
