import {
  FileWord,
  FileVideo,
  FilePowerpoint,
  FilePdf,
  FileImage,
  FileExcel,
  FileCode,
  JsB,
  Css3AltB,
  SassB,
  LessB,
  JavaB,
  VuejsB,
  Html5B,
  PythonB,
  FileAudio,
  FileArchive,
  FileAlt,
  FileCsv,
  FilePrescription,
  File
} from '@vexip-ui/icons'

type Icon = Record<string, any>

const iconConfig = new Map<Icon, string[]>()

iconConfig.set(FileWord, ['doc', 'docx'])
iconConfig.set(FileVideo, [
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
iconConfig.set(FilePowerpoint, ['ppt', 'pptx', 'pptm'])
iconConfig.set(FilePdf, ['pdf'])
iconConfig.set(FileImage, [
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
iconConfig.set(FileExcel, ['xls', 'xlsx', 'xlsm', 'xlsb', 'xlam'])
iconConfig.set(FileCode, [
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
iconConfig.set(FileArchive, [
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
iconConfig.set(FileAlt, ['txt'])
iconConfig.set(FileCsv, ['csv'])
iconConfig.set(FilePrescription, ['rvt', 'rfa', 'rte', 'rtf', 'dgn', 'dwf', 'dwg', 'ifc', 'sat', 'skp'])
iconConfig.set(File, ['default'])

const iconMaps: Record<string, Icon> = {}

for (const [Icon, types] of iconConfig.entries()) {
  if (types?.length) {
    for (const type of types) {
      iconMaps[type] = Icon
    }
  }
}

export { iconMaps }
