import minimist from 'minimist'
import { logger, run } from './utils'

const args = minimist(process.argv.slice(2))

const devOnly = args.dev || args.d
const sourceMap = args.sourcemap || args.s

const env = devOnly ? 'development' : 'production'

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

async function main() {
  logger.withBothLn(() => logger.successText('start building lib...'))

  await run('pnpm', ['bootstrap'])

  await run('vite', ['build', '--config', 'vite.full.config.ts'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: env,
      SOURCE_MAP: sourceMap ? 'true' : ''
    }
  })

  logger.ln()

  if (!process.exitCode) {
    logger.withEndLn(() => logger.success('All builds completed successfully.'))
  }
}
