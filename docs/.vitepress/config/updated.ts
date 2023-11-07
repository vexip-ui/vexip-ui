import { execa } from 'execa'
import { groupByProps } from '@vexip-ui/utils'

export interface UpdatedFile {
  locale: string,
  path: string
}

const componentRE = /^components\/.+\/.+/
const styleRE = /^style\/.+/
const mdRE = /^docs\/(zh-CN|en-US).+\.md$/
// const demoRE = /^docs\/demos\/.+\/demo\.(zh-CN|en-US)/

export async function getUpdatedFiles(prevVersionLimit = 2): Promise<Record<string, Set<string>>> {
  const versionsLog = (
    await execa('git', ['log', '--grep=release:', '--oneline', '-n', `${prevVersionLimit}`], {
      stdio: 'pipe'
    })
  ).stdout
  const tag = versionsLog
    .split('\n')
    .at(-1)
    ?.trim()
    .match(/release:\s(v.+)/)?.[1]

  if (!tag) return {}

  const commitLog = (
    await execa('git', ['log', `${tag}..`, '--name-only', '--oneline'], { stdio: 'pipe' })
  ).stdout

  const grouped = groupByProps(
    [
      ...new Set(
        commitLog
          .split('\n')
          .filter(line => componentRE.test(line) || styleRE.test(line) || mdRE.test(line))
          .map(line => {
            if (componentRE.test(line)) {
              const [, component] = line.split('/')

              return [`zh-CN/component/${component}`, `en-US/component/${component}`]
            } else if (styleRE.test(line)) {
              const [, fileName] = line.split('/')
              const [component] = fileName.split('.')

              return [`zh-CN/component/${component}`, `en-US/component/${component}`]
            } /* if (mdRE.test(line)) */ else {
              const [, locale, type, fileName] = line.split('/')

              return `${locale}/${type}/${fileName.slice(0, -3)}`
            }
            // else {
            //   const [, , component, , fileName] = line.split('/')
            //   const [, locale] = fileName.split('.')

            //   return `${locale}/component/${component}`
            // }
          })
          .flat()
      )
    ].map(path => {
      const [locale, ...units] = path.split('/')

      return { locale, path: `/${units.join('/')}` }
    }),
    'locale'
  )

  const updated: Record<string, Set<string>> = {}

  for (const locale of Object.keys(grouped)) {
    updated[locale] = new Set(grouped[locale].map(file => file.path))
  }

  return updated
}
