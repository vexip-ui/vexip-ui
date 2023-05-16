import {
  Css3AltB,
  FileAudio,
  FileCodeR,
  FileCsv,
  FileExcelR,
  FileImageR,
  FileLinesR,
  FilePdfR,
  FilePowerpointR,
  FilePrescription,
  FileR,
  FileVideoR,
  FileWordR,
  FileZipperR,
  Html5B,
  JavaB,
  JsB,
  LessB,
  PythonB,
  SassB,
  VuejsB
} from '@vexip-ui/icons'

type Icon = Record<string, any>

const iconConfig = new Map<Icon, string[]>()

iconConfig.set(FileWordR, ['doc', 'docx'])
iconConfig.set(FileVideoR, [
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
iconConfig.set(FilePowerpointR, ['ppt', 'pptx', 'pptm'])
iconConfig.set(FilePdfR, ['pdf'])
iconConfig.set(FileImageR, [
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
iconConfig.set(FileExcelR, ['xls', 'xlsx', 'xlsm', 'xlsb', 'xlam'])
iconConfig.set(FileCodeR, [
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
])
iconConfig.set(JsB, ['js', 'jsx', 'mjs'])
iconConfig.set(Css3AltB, ['css', 'styl', 'pcss'])
iconConfig.set(SassB, ['sass', 'scss'])
iconConfig.set(LessB, ['less'])
iconConfig.set(JavaB, ['java', 'class', 'jsp'])
iconConfig.set(VuejsB, ['vue'])
iconConfig.set(Html5B, ['html', 'htm'])
iconConfig.set(PythonB, ['py', 'pyc', 'pyw', 'pyo', 'pyd'])
iconConfig.set(FileAudio, [
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
iconConfig.set(FileZipperR, [
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
iconConfig.set(FileLinesR, ['txt'])
iconConfig.set(FileCsv, ['csv'])
iconConfig.set(FilePrescription, [
  'rvt',
  'rfa',
  'rte',
  'rtf',
  'dgn',
  'dwf',
  'dwg',
  'ifc',
  'sat',
  'skp'
])
iconConfig.set(FileR, ['default'])

const iconMaps: Record<string, Icon> = {}

for (const [Icon, types] of iconConfig.entries()) {
  if (types?.length) {
    for (const type of types) {
      iconMaps[type] = Icon
    }
  }
}

export { iconMaps }
