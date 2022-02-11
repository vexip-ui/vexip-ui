const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const logger = (exports.logger = {
  ln: () => console.log(),
  warning: msg => {
    console.warn(`${chalk.bgYellow.black(' WARNING ')} ${chalk.yellow(msg)}`)
  },
  info: msg => {
    console.log(`${chalk.bgCyan.black(' INFO ')} ${chalk.cyan(msg)}`)
  },
  success: msg => {
    console.log(`${chalk.bgGreen.black(' SUCCESS ')} ${chalk.green(msg)}`)
  },
  error: msg => {
    console.error(`${chalk.bgRed.black(' ERROR ')} ${chalk.red(msg)}`)
  },
  warningText: msg => {
    console.warn(`${chalk.yellow(msg)}`)
  },
  infoText: msg => {
    console.log(`${chalk.cyan(msg)}`)
  },
  successText: msg => {
    console.log(`${chalk.green(msg)}`)
  },
  errorText: msg => {
    console.error(`${chalk.red(msg)}`)
  }
})

exports.bin = name => path.resolve(__dirname, '../node_modules/.bin/' + name)

// 短横线命名
exports.toKebabCase = value => {
  return (
    value.charAt(0).toLowerCase() +
    value
      .slice(1)
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
  )
}

// 全大写命名
const toPascalCase = exports.toPascalCase = value => {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1).replace(/-([a-z])/g, (_, char) => (char ? char.toUpperCase() : ''))
  )
}

// 驼峰命名
exports.toCamelCase = value => {
  const pascalName = toPascalCase(value)

  return pascalName.charAt(0).toLowerCase() + pascalName.slice(1)
}

const components = (exports.components = fs.readdirSync('components').filter(f => {
  if (!fs.statSync(`components/${f}`).isDirectory()) {
    return false
  }

  return fs.existsSync(`components/${f}/index.ts`)
}))

exports.serveComponents = components.filter(f => {
  return fs.existsSync(`components/${f}/__serve__/index.ts`)
})

const fuzzyMatch = (partials, total, includeAll = false) => {
  const matched = []

  partials.forEach(partial => {
    for (const target of total) {
      if (target.match(partial)) {
        matched.push(target)

        if (!includeAll) break
      }
    }
  })

  return matched
}

const fuzzyMatchComponent = (exports.fuzzyMatchComponent = (partialComponents, includeAll = false, allComponents = components) => {
  const matched = fuzzyMatch(partialComponents, allComponents, includeAll)

  if (matched.length) {
    return matched
  } else {
    logger.ln()
    logger.error(`Component '${chalk.underline(partialComponents)}' not found!`)
    logger.ln()

    process.exit(1)
  }
})

exports.specifyComponent = async (args, allComponents = components, required = true) => {
  const matchedComponents = args._.length ? fuzzyMatchComponent(args._, true, allComponents) : ['']

  let component

  if (matchedComponents.length > 1 || !matchedComponents[0]) {
    const { prompt } = require('enquirer')

    component = (
      await prompt({
        type: 'select',
        name: 'component',
        message: 'Select a component:',
        choices: matchedComponents.length > 1 ? matchedComponents : allComponents
      })
    ).component
  } else {
    component = matchedComponents[0] || ''
  }

  if (!component && required) {
    logger.ln()
    logger.error('Component must be specified.')

    process.exitCode = 1
  }

  return component
}

exports.runParallel = async (maxConcurrency, source, iteratorFn) => {
  const ret = []
  const executing = []

  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source))

    ret.push(p)

    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))

      executing.push(e)

      if (executing.length >= maxConcurrency) {
        await Promise.race(executing)
      }
    }
  }

  return Promise.all(ret)
}
