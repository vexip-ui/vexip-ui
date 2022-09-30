import { resolve } from 'node:path'
import fs from 'fs-extra'
import minimist from 'minimist'
import { format } from 'prettier'
import { rootDir, prettierConfig, logger, run, specifyComponent } from './utils'

const { readdirSync, statSync, existsSync, writeFileSync } = fs

const args = minimist<{
  s?: boolean,
  sourcemap?: boolean,
  p?: string,
  port?: string,
  prod?: boolean,
  l?: string,
  lang?: string,
  t?: boolean,
  theme?: boolean
}>(process.argv.slice(2))

const sourceMap = args.sourcemap || args.s
const port = args.port || args.p || '8008'
const prodMode = args.prod
const lang = args.lang || args.l
const theme = args.theme || args.t

const langs = ['zh-CN', 'en-US']

const devDir = resolve(rootDir, 'dev-server')

async function main() {
  if (theme) {
    await serveTheme()
  } else {
    await serveComponent()
  }
}

async function serveComponent() {
  const demosDir = resolve(rootDir, 'docs/demos')
  const targets = readdirSync(demosDir).filter(f => statSync(resolve(demosDir, f)).isDirectory())

  const target = await specifyComponent(args, targets)

  logger.withBothLn(() => logger.success(`matched target: ${target}`))

  const matchedLang = lang ? langs.find(l => l === lang || l.startsWith(lang)) || 'zh-CN' : 'zh-CN'
  const demos = queryDemos(target, matchedLang)

  const router = `
    import { createRouter, createWebHashHistory } from 'vue-router'

    document.title = '${target} | Vexip UI'

    export const router = createRouter({
      history: createWebHashHistory('/'),
      routes: [
        ${demos.map((demo, index) => {
          return `{
            path: '${index ? `/${demo}` : '/'}',
            name: '${demo}',
            component: () => import('../docs/demos/${target}/${demo}/demo.${matchedLang}.vue')
          }`
        }).join(',\n')},
        {
          path: '/:catchAll(.*)',
          redirect: '/'
        }
      ]
    })

    router.afterEach(to => {
      document.title = \`${target} - \${typeof to.name === 'string' ? to.name : 'dev'} | Vexip UI\`
    })
  `

  writeFileSync(
    resolve(devDir, 'router.ts'),
    format(router, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )

  await run('vite', ['serve'], {
    cwd: devDir,
    stdio: 'inherit',
    env: {
      NODE_ENV: prodMode ? 'production' : 'development',
      TARGET: target,
      DEMOS: JSON.stringify(demos),
      PORT: port,
      SOURCE_MAP: sourceMap ? 'true' : '',
      THEME: theme ? 'true' : ''
    }
  })
}

async function serveTheme() {
  await run('vite', ['serve'], {
    cwd: devDir,
    stdio: 'inherit',
    env: {
      NODE_ENV: prodMode ? 'production' : 'development',
      PORT: port,
      SOURCE_MAP: sourceMap ? 'true' : '',
      THEME: 'true'
    }
  })
}

function queryDemos(target: string, lang: string) {
  const dir = resolve(rootDir, 'docs/demos', target)

  return readdirSync(dir).filter(
    f => statSync(resolve(dir, f)).isDirectory() && existsSync(resolve(dir, f, `demo.${lang}.vue`))
  )
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
