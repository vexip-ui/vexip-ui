import { resolve } from 'node:path'
import { cpus } from 'node:os'
import fs from 'fs-extra'
import minimist from 'minimist'
import { logger, run, rootDir, components, runParallel } from './utils'

const args = minimist<{
  d?: boolean,
  dev?: boolean
}>(process.argv.slice(2))

const devOnly = args.dev || args.d

const env = devOnly ? 'development' : 'production'

async function main() {
  logger.withBothLn(() => logger.successText('start building lib...'))

  await run('pnpm', ['bootstrap'])
  await run('pnpm', ['props'])
  await run('vite', ['build', '--config', 'vite.config.ts'], {
    env: {
      NODE_ENV: env
    }
  })

  logger.ln()

  await run('vite', ['build', '--config', 'vite.full.config.ts'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: env
    }
  })
  await run('pnpm', ['build:style'])
  await copyStyle('es')
  await copyStyle('lib')

  logger.ln()

  if (!process.exitCode) {
    logger.withEndLn(() => logger.success('all builds completed successfully'))
  }
}

async function copyStyle(dir: 'es' | 'lib') {
  const ext = dir === 'es' ? 'mjs' : 'cjs'

  await fs.ensureDir(resolve(rootDir, dir, 'style'))
  await fs.ensureDir(resolve(rootDir, dir, 'css'))

  await runParallel(cpus().length, [...components, 'preset', 'dark'], async component => {
    const style = await fs.readFile(
      resolve(rootDir, dir, 'components', component, `style.${ext}`),
      'utf-8'
    )
    const css = await fs.readFile(
      resolve(rootDir, dir, 'components', component, `css.${ext}`),
      'utf-8'
    )

    await fs.writeFile(
      resolve(rootDir, dir, 'style', `${component}.${ext}`),
      style
        .replace(`../preset/style.${ext}`, `./preset.${ext}`)
        .replace(new RegExp(`\\.\\.\\/(.+)\\/style\\.${ext}`, 'g'), `./$1.${ext}`)
        .replace(/vexip-ui\/style\//g, '../../style/'),
      'utf-8'
    )
    await fs.writeFile(
      resolve(rootDir, dir, 'css', `${component}.${ext}`),
      css
        .replace(`../preset/css.${ext}`, `./preset.${ext}`)
        .replace(new RegExp(`\\.\\.\\/(.+)\\/css\\.${ext}`, 'g'), `./$1.${ext}`)
        .replace(/vexip-ui\/css\//g, '../../css/'),
      'utf-8'
    )
  })
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
