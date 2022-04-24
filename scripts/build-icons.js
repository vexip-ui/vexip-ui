const fs = require('fs-extra')
const path = require('path')
const { rollup } = require('rollup')
const { logger, runParallel } = require('./utils')

const args = require('minimist')(process.argv.slice(2))

const iconsDir = path.resolve(__dirname, '../common/icons')
const iconFiles = findIcons(iconsDir)

const iconReg = /^@\/components\/icon/

main()

async function main() {
  if (args.clean || args.c) {
    await fs.remove(path.resolve(__dirname, '../icons'))
  }

  await runParallel(require('os').cpus().length, iconFiles, build)

  if (!process.exitCode) {
    logger.withBothLn(() => logger.success('All builds are complete successfully.'))
  }
}

async function build(iconFile) {
  try {
    const bundle = await rollup({
      input: iconFile,
      external(id) {
        return iconReg.test(id)
      }
    })

    const outputFile = path.resolve(
      __dirname,
      '../icons',
      path.relative(iconsDir, iconFile.replace(/\.ts$/, '.js'))
    )

    await bundle.write({
      format: 'es',
      file: outputFile,
      paths(id) {
        return iconReg.test(id)
          ? path.relative(
              path.dirname(outputFile), path.resolve(__dirname, '../lib/icon')
            ).replace(/[\\]+/g, '/')
          : id
      }
    })
  } catch (error) {
    logger.withBothLn(() => logger.errorText(error))
    process.exitCode = 1

    return
  }
}

function findIcons(folder, reslut = []) {
  const namespaces = []

  fs.readdirSync(folder).forEach(f => {
    if (fs.statSync(`${folder}/${f}`).isDirectory()) {
      namespaces.push(f)
    } else if (!/^index/.test(f)) {
      reslut.push(path.resolve(folder, f))
    }
  })

  namespaces.forEach(namespace => {
    findIcons(path.resolve(folder, namespace), reslut)
  })

  return reslut
}
