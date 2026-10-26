import minimist from 'minimist'
import { logger, run } from '@vexip-ui/scripts'

const args = minimist<{
  d?: boolean,
  dev?: boolean,
}>(process.argv.slice(2))

const devOnly = args.dev || args.d

const env = devOnly ? 'development' : 'production'

async function main() {
  logger.withBothLn(() => logger.successText('start building lib...'))

  await run('pnpm', ['bootstrap'])
  await run('pnpm', ['gen:props'])
  await run('vite', ['build', '--config', 'vite.config.ts'], {
    env: {
      NODE_ENV: env,
    },
  })

  logger.ln()

  await run('vite', ['build', '--config', 'vite.full.config.ts'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: env,
    },
  })
  await run('pnpm', ['build:style'])

  logger.ln()

  if (!process.exitCode) {
    logger.withEndLn(() => logger.success('All builds completed successfully'))
  }
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
