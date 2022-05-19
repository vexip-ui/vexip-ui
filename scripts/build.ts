// import fs from 'fs'
import path from 'path'
import minimist from 'minimist'
import { logger, run, emptyDir } from './utils'

const args = minimist(process.argv.slice(2))

const devOnly = args.dev || args.d
const sourceMap = args.sourcemap || args.s
const release = args.release || args.r

const env = devOnly ? 'development' : 'production'

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

async function main() {
  if (release) {
    emptyDir(path.resolve(__dirname, '../node_modules/.cache'))
  }

  logger.withBothLn(() => logger.successText('start building lib...'))

  await run('vite', ['build', '--config', 'vite.build.config.ts'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: env,
      OUT_DIR: 'es',
      FORMAT: 'es',
      SOURCE_MAP: sourceMap ? 'true' : ''
    }
  })

  await run('vite', ['build', '--config', 'vite.build.config.ts'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: env,
      OUT_DIR: 'lib',
      FORMAT: 'cjs',
      SOURCE_MAP: sourceMap ? 'true' : ''
    }
  })

  logger.ln()

  if (!process.exitCode) {
    logger.withEndLn(() => logger.success('All builds completed successfully.'))
  }
}
