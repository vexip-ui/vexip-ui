const fs = require('fs-extra')
const path = require('path')
const { Project } = require('ts-morph')
const { parse, compileScript } = require('@vue/compiler-sfc')
const {
  logger,
  components: allComponents,
  runParallel
} = require('./utils')

const scssReg = /import '.+\.scss';?\n?/g
const iconReg = /import '@\/common\/icons(.*)';?\n?/g
const commonReg = /['"]@\/common(.*)['"]/g
const componentReg = /['"]@\/components(.*)['"]/g

const configDir = path.resolve(__dirname, '../common/config')
const utilsDir = path.resolve(__dirname, '../common/utils')
const componentsDir = path.resolve(__dirname, '../components')
const libDir = path.resolve(__dirname, '../lib')

const project = new Project({
  compilerOptions: {
    declaration: true,
    emitDeclarationOnly: true,
    noEmitOnError: true,
    outDir: 'lib'
  },
  tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
  skipAddingFilesFromTsConfig: true
})

const sourceFiles = []

let index = 1

main()

async function main() {
  sourceFiles.push(project.addSourceFileAtPath(
    path.resolve(componentsDir, 'index.ts')
  ))

  fs.readdirSync(configDir).forEach(file => {
    if (fs.statSync(`${configDir}/${file}`).isFile()) {
      sourceFiles.push(project.addSourceFileAtPath(
        path.resolve(configDir, file)
      ))
    }
  })

  fs.readdirSync(utilsDir).forEach(file => {
    if (fs.statSync(`${utilsDir}/${file}`).isFile()) {
      sourceFiles.push(project.addSourceFileAtPath(
        path.resolve(utilsDir, file)
      ))
    }
  })

  await runParallel(require('os').cpus().length, allComponents, addSource)

  const diagnostics = project.getPreEmitDiagnostics()

  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))

  project.emitToMemory()

  for (const sourceFile of sourceFiles) {
    const emitOutput = sourceFile.getEmitOutput()

    for (const outputFile of emitOutput.getOutputFiles()) {
      const rawPath = outputFile.getFilePath()
      const filepath = rawPath.includes('common')
        ? rawPath
        : path.resolve(
            libDir,
            path.relative(path.resolve(libDir, 'components'), rawPath)
          )
      const relativeToLib = path.relative(path.dirname(filepath), libDir).replace(/[\/]+/g, '/') || '.'
      

      const content = outputFile.getText()
        .replace(scssReg, '')
        .replace(iconReg, '')
        .replace(commonReg, `'${relativeToLib}/common$1'`)
        .replace(componentReg, `'${relativeToLib}$1'`)

      await fs.promises.mkdir(path.dirname(filepath), { recursive: true })
      await fs.promises.writeFile(filepath, content, 'utf8')

      logger.infoText(`Emitted ${filepath}`)
    }
  }

  if (!process.exitCode) {
    logger.ln()
    logger.success('All type builds are complete successfully.')
    logger.ln()
  }
}

async function addSource(component) {
  const componentDir = path.resolve(componentsDir, component)
  const files = (await fs.readdir(componentDir)).filter(f => {
    return !fs.statSync(`${componentDir}/${f}`).isDirectory() && /\.(vue|tsx?)$/.test(f)
  })

  await Promise.all(
    files.map(async file => {
      const filePath = path.resolve(componentDir, file)

      if (/\.vue$/.test(file)) {
        const sfc = parse(await fs.readFile(filePath, 'utf-8'))
        const { script, scriptSetup } = sfc.descriptor

        if (script || scriptSetup) {
          let content = ''
          let isTs = false

          if (script && script.content) {
            content += script.content

            if (script.lang === 'ts') isTs = true
          }

          if (scriptSetup) {
            const compiled = compileScript(sfc.descriptor, {
              id: index++
            })

            content += compiled.content

            if (scriptSetup.lang === 'ts') isTS = true
          }

          sourceFiles.push(
            project.createSourceFile(filePath + (isTs ? '.ts' : '.js'), content)
          )
        }
      } else {
        sourceFiles.push(project.addSourceFileAtPath(filePath))
      }
    })
  )
}
