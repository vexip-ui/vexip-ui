const path = require('path')
const fs = require('fs')
const { prompt } = require('enquirer')

const packages = [
  'vexip-ui',
  'plaground',
  'common/mixins',
  'common/utils'
]

exports.getPackageInfo = async (inputPkg) => {
  let pkgName

  if (packages.includes(inputPkg)) {
    pkgName = inputPkg
  } else {
    let options = inputPkg ? packages.filter(p => p.includes(inputPkg)) : packages

    if (!options.length) {
      options = packages
    } else if (options.length === 1) {
      pkgName = options[0]
    } else {
      pkgName = (await prompt({
        type: 'select',
        name: 'pkgName',
        message: 'Select release package:',
        choices: options
      })).pkgName
    }
  }

  if (!pkgName) {
    throw new Error(`Release package must not be null`)
  }

  const isRoot = pkgName === 'vexip-ui'
  const pkgDir = path.resolve(__dirname, isRoot ? '..' : `../${pkgName}`)
  const pkgPath = path.resolve(pkgDir, 'package.json')

  if (!fs.existsSync(pkgPath)) {
    throw new Error(`Release package ${pkgName} not found`)
  }

  const pkg = require(pkgPath)

  if (pkg.private) {
    throw new Error(`Release package ${pkgName} is private`)
  }

  return {
    pkgName,
    pkgDir,
    pkgPath,
    pkg,
    currentVersion: pkg.version
  }
}