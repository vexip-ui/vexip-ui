import fs from 'fs'
import path from 'path'
import minimist from 'minimist'
import { logger, run, components as allComponents, fuzzyMatchComponent, runParallel, specifyComponent, emptyDir } from './utils'

const args = minimist(process.argv.slice(2))

const targets = args._
const devOnly = args.dev || args.d
const sourceMap = args.sourcemap || args.s
const release = args.release || args.r
const buildAllMatching = args.all || args.a
const libOnly = args.lib || args.l

const env = devOnly ? 'development' : 'production'
const libDir = path.resolve(__dirname, '../lib')

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

async function main() {
  if (release) {
    emptyDir(path.resolve(__dirname, '../node_modules/.cache'))
  }

  // await run('pnpm', ['lint:style'])

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
      process.exit(1)
    }
  }

  logger.withBothLn(() => logger.successText('start building lib...'))
  await buildLib()

  logger.ln()

  if (!process.exitCode) {
    logger.withEndLn(() => logger.success('All builds completed successfully.'))
  }
}

async function buildAll(components: string[]) {
  await runParallel(require('os').cpus().length, components, build)
}

const exceptional: Record<string, string> = {
  'tab-pane': 'tabs'
}

async function build(component: string) {
  const targetDir = path.resolve(libDir, component)
  // const indexPath = path.resolve(targetDir, 'index.js')

  await run('vite', ['build'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: env,
      TARGET: component,
      LOG_LEVEL: 'warn',
      SOURCE_MAP: sourceMap ? 'true' : ''
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
    await run('vite', ['build'], {
      stdio: 'inherit',
      env: {
        NODE_ENV: env,
        SOURCE_MAP: sourceMap ? 'true' : ''
      }
    })
  } catch (error) {
    logger.withBothLn(() => logger.errorText(error))
    process.exit(1)
  }
}
