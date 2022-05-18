import { resolve } from 'path'
import { readdirSync, statSync, existsSync, copyFile } from 'fs-extra'
import minimist from 'minimist'
import { logger, run, specifyComponent, serveComponents } from './utils'

const args = minimist(process.argv.slice(2))

const sourceMap = args.sourcemap || args.s
const port = args.port || args.p || 8008
const prodMode = args.prod

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

async function main() {
  const target = await specifyComponent(args, serveComponents)
  const demos = queryDemos(target)

  if (demos.length) {
    await Promise.all(demos.map(async demo => {
      await copyFile(
        resolve(__dirname, '../docs', target, demo, 'demo.vue'),
        resolve(__dirname, '../example/demos', `${demo}.vue`)
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

function queryDemos(target: string) {
  const dir = resolve(__dirname, '../docs', target)

  return readdirSync(dir).filter(
    f => statSync(resolve(dir, f)).isDirectory() && existsSync(resolve(dir, f, 'demo.vue'))
  )
}
