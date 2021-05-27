const execa = require('execa')
const { specifyComponent, serveComponents } = require('./utils')

const args = require('minimist')(process.argv.slice(2))

const sourceMap = args.sourcemap || args.s
const port = args.port || args.p || 8008

main()

async function main() {
  const target = await specifyComponent(args, serveComponents)

  await execa('vite', ['serve', '--force'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: 'development',
      TARGET: target,
      PORT: port,
      SOURCE_MAP: !!sourceMap
    }
  })
}

