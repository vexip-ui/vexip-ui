import { useRoute } from 'vue-router'

export function getMetaName(language: string, meta: Record<string, any> = useRoute().meta, suffix = true) {
  language = language || __ROLLBACK_LANG__

  let prefixMeta: string | null = null

  switch (language) {
    case 'zh-CN': prefixMeta = 'cname'
  }

  if (prefixMeta && meta[prefixMeta]) {
    if (suffix) {
      return `${meta[prefixMeta]} ${meta.name}`
    }

    return meta[prefixMeta]
  }

  return meta.name as string ?? ''
}
