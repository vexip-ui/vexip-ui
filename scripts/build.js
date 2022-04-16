const fs = require('fs')
const path = require('path')
const execa = require('execa')
const {
  logger,
  components: allComponents,
  fuzzyMatchComponent,
  runParallel,
  specifyComponent,
  emptyDir
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
    emptyDir(path.resolve(__dirname, '../node_modules/.cache'))
  }

  await execa('yarn', ['lint:style'])

  if (!libOnly) {
    logger.ln()
    logger.successText('start building components...')
    logger.ln()

    try {
      if (buildAllMatching) {
        if (!targets.length) {
          await buildAll(allComponents)
        } else {
          await buildAll(fuzzyMatchComponent(targets, buildAllMatching))
        }
      } else {
        await build(await specifyComponent(args, allComponents))
      }
    } catch(error) {
      logger.errorText(error)
      process.exitCode = 1
      return
    }
  }

  logger.ln()
  logger.successText('start building lib...')
  logger.ln()

  await buildLib()

  logger.ln()

  if (!process.exitCode) {
    logger.success('All builds completed successfully.')
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
  // const indexPath = path.resolve(targetDir, 'index.js')

  await execa('vite', ['build'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: env,
      TARGET: component,
      LOG_LEVEL: 'warn',
      SOURCE_MAP: !!sourceMap
    }
  })

  if (!fs.existsSync(`${targetDir}/style.css`)) {
    fs.writeFileSync(`${targetDir}/style.css`, '')
  }

  logger.infoText(`built ${component}`)
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
