const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const {
  logger,
  components: allComponents,
  fuzzyMatchComponent,
  runParallel,
  specifyComponent
} = require('./utils')

const args = require('minimist')(process.argv.slice(2))

const targets = args._
const devOnly = args.dev || args.d
const sourceMap = args.sourcemap || args.s
const release = args.release || args.r
const buildAllMatching = args.all || args.a
const libOnly = args.lib || args.l
// const buildType = args.type || args.t

const env = devOnly ? 'development' : 'production'
const libDir = path.resolve(__dirname, '../lib')

main()

async function main() {
  if (release) {
    await fs.remove(path.resolve(__dirname, '../node_modules/.cache'))
  }

  await execa('yarn', ['lint:style'])

  if (!libOnly) {
    if (buildAllMatching) {
      if (!targets.length) {
        await buildAll(allComponents)
      } else {
        await buildAll(fuzzyMatchComponent(targets, buildAllMatching))
      }
    } else {
      await build(await specifyComponent(args, allComponents))
    }
  }

  await buildLib()

  logger.ln()

  if (!process.exitCode) {
    logger.success('All builds are complete successfully.')
    logger.ln()
  }

  // if (buildType) {
  //   await execa('yarn', ['build:types'], { stdio: 'inherit' })
  // }
}

async function buildAll(components) {
  await runParallel(require('os').cpus().length, components, build)
}

async function build(component) {
  const targetDir = path.resolve(libDir, component)
  const indexPath = path.resolve(targetDir, 'index.js')

  await fs.remove(targetDir)

  try {
    await execa('vite', ['build'], {
      stdio: 'inherit',
      env: {
        NODE_ENV: env,
        TARGET: component,
        SOURCE_MAP: !!sourceMap
      }
    })
  } catch (error) {
    logger.ln()
    logger.errorText(error)
    logger.ln()

    process.exitCode = 1

    return
  }

  await fs.rename(path.resolve(targetDir, 'index.es.js'), indexPath)

  if (!fs.existsSync(`${targetDir}/style.css`)) {
    await fs.writeFile(`${targetDir}/style.css`, '')
  }
}

async function buildLib() {
  try {
    await execa('vite', ['build'], {
      stdio: 'inherit',
      env: {
        NODE_ENV: env,
        SOURCE_MAP: !!sourceMap
      }
    })
  } catch (error) {
    logger.ln()
    logger.errorText(error)
    logger.ln()

    process.exitCode = 1

    return
  }
}
