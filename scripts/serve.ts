import execa from 'execa'
import minimist from 'minimist'
import { logger, specifyComponent, serveComponents } from './utils'

const args = minimist(process.argv.slice(2))

const sourceMap = args.sourcemap || args.s
const port = args.port || args.p || 8008

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

async function main() {
  const target = await specifyComponent(args, serveComponents)

  await execa('vite', ['serve', '--force'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: 'development',
      TARGET: target,
      PORT: port,
      SOURCE_MAP: sourceMap ? 'true' : ''
    }
  })
}
