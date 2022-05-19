import { resolve } from 'path'
import {
  readdirSync,
  statSync,
  existsSync,
  copyFile,
  mkdirSync,
  writeFileSync,
  lstatSync,
  rmdirSync,
  unlinkSync
} from 'fs-extra'
import minimist from 'minimist'
import { logger, run, emptyDir, specifyComponent, components } from './utils'

const args = minimist(process.argv.slice(2))

const sourceMap = args.sourcemap || args.s
const port = args.port || args.p || 8008
const prodMode = args.prod
const clearDemos = args.clear || args.c
const lang = args.lang || args.l

const docsDir = resolve(__dirname, '../docs')
const demosDir = resolve(__dirname, '../example/demos')

const langs = ['zh-CN']

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

const external: Record<string, string> = {
  'tab-nav': 'tabs'
}

async function main() {
  let target = await specifyComponent(args, components)

  target = components.find(name => {
    return name === target || target.startsWith(name) || external[target] === name
  }) || target

  logger.withBothLn(() => logger.success(`matched target: ${target}`))

  const matchedLang = langs.find(l => l === lang || l.startsWith(lang)) || 'zh-CN'
  const demos = queryDemos(target, matchedLang)

  if (existsSync(demosDir)) {
    if (clearDemos) {
      for (const file of readdirSync(demosDir)) {
        if (file === '.gitignore') continue

        const abs = resolve(demosDir, file)

        if (lstatSync(abs).isDirectory()) {
          emptyDir(abs)
          rmdirSync(abs)
        } else {
          unlinkSync(abs)
        }
      }
    }
  } else {
    mkdirSync(demosDir)
    writeFileSync(resolve(demosDir, '.gitignore'), '*\n!.gitignore\n', 'utf-8')
  }

  if (demos.length) {
    await Promise.all(demos.map(async demo => {
      await copyFile(
        resolve(docsDir, target, demo, `demo.${matchedLang}.vue`),
        resolve(demosDir, `${demo}.vue`)
      )
    }))
  }

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
