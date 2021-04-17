const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')

const packageDir = path.resolve(__dirname, '..')
// const package = require(`${packageDir}/package.json`)

const copy = async (name) => {
  await fs.copyFile(
    path.resolve(packageDir, `src/${name}`),
    path.resolve(packageDir, `types/${name}`)
  )
}

build()

async function build() {
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

  await copy('shims-tsx.d.ts')
  await copy('shims-vue.d.ts')

  await fs.remove(`${packageDir}/types/index.js`)
  await fs.remove(`${packageDir}/types/index.css`)
  await fs.remove(`${packageDir}/types/tests`)
}
