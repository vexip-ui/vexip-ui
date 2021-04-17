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
    'vite',
    ['build'],
    {
      stdio: 'inherit',
      env: {
        NODE_ENV: env
      }
    }
  )

  await execa(
    'yarn',
    ['build:type'],
    { stdio: 'inherit' }
  )
}
