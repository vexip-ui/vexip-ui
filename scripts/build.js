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

const env = devOnly ? 'development' : 'production'
const libDir = path.resolve(__dirname, '../lib')

main()

async function main() {
  if (release) {
    emptyDir(path.resolve(__dirname, '../node_modules/.cache'))
  }

  await execa('pnpm', ['lint:style'])

  if (!libOnly) {
    logger.withBothLn(() => logger.successText('start building components...'))

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

  logger.withBothLn(() => logger.successText('start building lib...'))
  await buildLib()

  logger.ln()

  if (!process.exitCode) {
    logger.withEndLn(() => logger.success('All builds completed successfully.'))
  }
}

async function buildAll(components) {
  await runParallel(require('os').cpus().length, components, build)
}

const exceptional = {
  'tab-pane': 'tabs'
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

  const parentComponent = exceptional[component] || allComponents.find(c => component.startsWith(c))
  const writeStyle = () =>
    fs.writeFileSync(
      `${targetDir}/style.css`, parentComponent ? `@import '../${parentComponent}/style.css';\n` : ''
    )

  if (!fs.existsSync(`${targetDir}/style.css`)) {
    writeStyle()
  } else {
    const style = fs.readFileSync(`${targetDir}/style.css`, 'utf-8')

    if (!style.trim()) {
      writeStyle()
    }
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
    logger.withBothLn(() => logger.errorText(error))
    process.exitCode = 1
  }
}
