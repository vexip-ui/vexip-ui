import { resolve } from 'path'
import { readdirSync, statSync, existsSync, writeFileSync } from 'fs-extra'
import minimist from 'minimist'
import { resolveConfig, format } from 'prettier'
import { logger, run, specifyComponent } from './utils'

const args = minimist(process.argv.slice(2))

const sourceMap = args.sourcemap || args.s
const port = args.port || args.p || 8008
const prodMode = args.prod
const lang = args.lang || args.l

const langs = ['zh-CN']

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

async function main() {
  const docsDir = resolve(__dirname, '../docs')
  const targets = readdirSync(docsDir).filter(f => statSync(resolve(docsDir, f)).isDirectory())

  const target = await specifyComponent(args, targets)

  logger.withBothLn(() => logger.success(`matched target: ${target}`))

  const matchedLang = langs.find(l => l === lang || l.startsWith(lang)) || 'zh-CN'
  const demos = queryDemos(target, matchedLang)

  const router = `
    import { createRouter, createWebHashHistory } from 'vue-router'

    export const router = createRouter({
      history: createWebHashHistory('/'),
      routes: [
        ${demos.map((demo, index) => {
          return `{
            path: '${index ? `/${demo}` : '/'}',
            name: '${demo}',
            component: () => import('../docs/${target}/${demo}/demo.${matchedLang}.vue')
          }`
        }).join(',\n')},
        {
          path: '/theme',
          name: 'theme',
          component: () => import('./theme.vue')
        }
      ]
    })

    router.afterEach(to => {
      document.title = \`${target} - \${typeof to.name === 'string' ? to.name : 'dev'} | Vexip UI\`
    })
  `

  writeFileSync(
    resolve(__dirname, '../example/router.ts'),
    format(router, { ...(await resolveConfig(resolve('.prettierrc.js'))), parser: 'typescript' }),
    'utf-8'
  )

  await run('vite', ['serve'], {
    cwd: resolve(__dirname, '../example'),
    stdio: 'inherit',
    env: {
      NODE_ENV: prodMode ? 'production' : 'development',
      TARGET: target,
      DEMOS: JSON.stringify(demos),
      PORT: port,
      SOURCE_MAP: sourceMap ? 'true' : ''
    }
  })
}

function queryDemos(target: string, lang: string) {
  const dir = resolve(__dirname, '../docs', target)

  return readdirSync(dir).filter(
    f => statSync(resolve(dir, f)).isDirectory() && existsSync(resolve(dir, f, `demo.${lang}.vue`))
  )
}
