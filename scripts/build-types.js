const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')

build()

async function build() {
  const packageDir = path.resolve(__dirname, '..')
  // const package = require(`${packageDir}/package.json`)

  await fs.remove(`${packageDir}/types`)

  const env = 'production'

  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      `NODE_ENV:${env}`
    ],
    { stdio: 'inherit' }
  )

  await fs.remove(`${packageDir}/types/index.js`)
  await fs.remove(`${packageDir}/types/index.css`)
  await fs.remove(`${packageDir}/types/tests`)
}
