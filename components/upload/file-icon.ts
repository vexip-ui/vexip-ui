import { computed } from 'vue'

import { useIcons } from '@vexip-ui/config'

import type { IconsConfig } from '@vexip-ui/config'

const iconConfig = new Map<keyof IconsConfig, string[]>()

// iconConfig.set('fileWord', ['doc', 'docx'])
iconConfig.set('fileVideo', [
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
])
// iconConfig.set('filePdf', ['pdf'])
iconConfig.set('fileImage', [
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
])
// iconConfig.set('fileExcel', ['xls', 'xlsx', 'xlsm', 'xlsb', 'xlam', 'csv'])
iconConfig.set(
  'fileCode',
  [
    [
      'json',
      'xml',
      'property',
      'class',
      'c',
      'cpp',
      'cc',
      'cxx',
      'h',
      'hpp',
      'hxx',
      'cs',
      'yml',
      'yaml',
      'ts',
      'tsx'
    ],
    ['js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx', 'mts', 'cts'],
    ['css', 'styl', 'pcss'],
    ['sass', 'scss'],
    ['less'],
    ['java', 'class', 'jsp'],
    ['vue'],
    ['html', 'htm'],
    ['py', 'pyc', 'pyw', 'pyo', 'pyd']
  ].flat()
)
iconConfig.set('fileAudio', [
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
])
iconConfig.set('fileZip', [
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
])
iconConfig.set(
  'fileText',
  [
    ['doc', 'docx'],
    ['xls', 'xlsx', 'xlsm', 'xlsb', 'xlam', 'csv'],
    ['pdf', 'txt', 'md']
  ].flat()
)
iconConfig.set('file', ['default'])

export function useFileIcons(icons = useIcons()) {
  return computed(() => {
    const map: Record<string, Record<string, any>> = {}

    for (const [iconName, types] of iconConfig.entries()) {
      if (types?.length) {
        for (const type of types) {
          map[type] = icons.value[iconName]
        }
      }
    }

    return map
  })
}
