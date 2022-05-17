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

  await run('vite', ['serve', '--force'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: prodMode ? 'production' : 'development',
      TARGET: target,
      PORT: port,
      SOURCE_MAP: sourceMap ? 'true' : ''
    }
  })
}
