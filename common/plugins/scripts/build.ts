// import { readFile } from 'fs/promises'
import { resolve } from 'path'
import execa from 'execa'
import chalk from 'chalk'

const bin = (name: string) => resolve(__dirname, '../node_modules/.bin/' + name)

main().catch(error => {
  console.error(chalk.red(error))
  process.exit(1)
})

async function main() {
  await execa(
    bin('tsup-node'),
    [
      'src/index.ts',
      '--dts',
      '--format',
      'cjs,esm'
    ],
    { stdio: 'inherit' }
  )
}
