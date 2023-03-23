import minimist from 'minimist'
import { logger, run } from './utils'

const args = minimist<{
  d?: boolean,
  dev?: boolean,
  s?: boolean,
  sourcemap?: boolean
}>(process.argv.slice(2))

const devOnly = args.dev || args.d
const sourceMap = args.sourcemap || args.s

const env = devOnly ? 'development' : 'production'

async function main() {
  logger.withBothLn(() => logger.successText('start building lib...'))

  await run('pnpm', ['bootstrap'])
  await run('pnpm', ['props'])
  await run('vite', ['build', '--config', 'vite.config.ts'], {
    env: {
      NODE_ENV: env,
      SOURCE_MAP: sourceMap ? 'true' : ''
    }
  })

  logger.ln()

  await run('vite', ['build', '--config', 'vite.full.config.ts'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: env,
      SOURCE_MAP: sourceMap ? 'true' : ''
    }
  })
  await run('pnpm', ['build:style'])
  await run('pnpm', ['copy-style'])

  logger.ln()

  if (!process.exitCode) {
    logger.withEndLn(() => logger.success('all builds completed successfully'))
  }
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
