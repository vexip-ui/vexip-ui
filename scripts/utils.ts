import { resolve } from 'node:path'
import {
  existsSync,
  // lstatSync,
  // readFileSync,
  readdirSync,
  // rmdirSync,
  statSync
  // unlinkSync
} from 'node:fs'
import { fileURLToPath } from 'node:url'
// import { createServer } from 'node:net'

// import { execa } from 'execa'
// import { bgCyan, bgGreen, bgRed, bgYellow, cyan, green, lightBlue, red, yellow } from 'kolorist'
import prompts from 'prompts'
import { fuzzyMatch, getPkgInfo, logger, specifyFromList } from '@vexip-ui/scripts'

// import type { Options } from 'execa'
import type { ParsedArgs } from 'minimist'
import type { Config } from 'prettier'

export const rootDir = resolve(fileURLToPath(import.meta.url), '../..')

export const prettierConfig: Config = {
  printWidth: 100,
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'lf',
  bracketSameLine: false,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  vueIndentScriptAndStyle: false,
  overrides: [
    {
      files: '*.md',
      options: {
        embeddedLanguageFormatting: 'off'
      }
    }
  ]
}

// type LogFn = () => void

// export const logger = {
//   ln: () => console.log(),
//   withStartLn: (log: LogFn) => {
//     logger.ln()
//     log()
//   },
//   withEndLn: (log: LogFn) => {
//     log()
//     logger.ln()
//   },
//   withBothLn: (log: LogFn) => {
//     logger.ln()
//     log()
//     logger.ln()
//   },
//   warning: (msg: string) => {
//     console.warn(`${bgYellow(' WARNING ')} ${yellow(msg)}`)
//   },
//   info: (msg: string) => {
//     console.log(`${bgCyan(' INFO ')} ${cyan(msg)}`)
//   },
//   success: (msg: string) => {
//     console.log(`${bgGreen(' SUCCESS ')} ${green(msg)}`)
//   },
//   error: (msg: string) => {
//     console.error(`${bgRed(' ERROR ')} ${red(msg)}`)
//   },
//   warningText: (msg: string) => {
//     console.warn(`${yellow(msg)}`)
//   },
//   infoText: (msg: string) => {
//     console.log(`${cyan(msg)}`)
//   },
//   successText: (msg: string) => {
//     console.log(`${green(msg)}`)
//   },
//   errorText: (msg: string) => {
//     console.error(`${red(msg)}`)
//   }
// }

export function bin(name: string) {
  return resolve(rootDir, 'node_modules/.bin/' + name)
}

// export async function run(bin: string, args: string[], opts: Options = {}) {
//   return execa(bin, args, { stdio: 'inherit', ...opts })
// }

// export async function dryRun(bin: string, args: string[], opts: Options = {}) {
//   console.log(lightBlue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
// }

// function allCapital(value: string) {
//   const matched = value.match(/[A-Z]+/)

//   return matched && matched[0] === value
// }

// // 短横线命名
// export function toKebabCase(value: string) {
//   if (allCapital(value)) {
//     return value.toLocaleLowerCase()
//   }

//   return (
//     value.charAt(0).toLowerCase() +
//     value
//       .slice(1)
//       .replace(/([A-Z])/g, '-$1')
//       .toLowerCase()
//   )
// }

// 全大写命名
// export function toCapitalCase(value: string) {
//   return (
//     value.charAt(0).toUpperCase() +
//     value.slice(1).replace(/-([a-z])/g, (_, char) => (char ? char.toUpperCase() : ''))
//   )
// }

// // 驼峰命名
// export function toCamelCase(value: string) {
//   const capitalName = toCapitalCase(value)

//   if (allCapital(capitalName)) {
//     return capitalName.toLocaleLowerCase()
//   }

//   return capitalName.charAt(0).toLowerCase() + capitalName.slice(1)
// }

export const componentsDir = resolve(rootDir, 'components')

export const components = readdirSync(componentsDir).filter(f => {
  const path = resolve(componentsDir, f)

  if (!statSync(path).isDirectory()) {
    return false
  }

  return existsSync(`${path}/index.ts`)
})

// export function fuzzyMatch(partials: string[], total: string[], includeAll = false) {
//   const matched: string[] = []

//   partials.forEach(partial => {
//     for (const target of total) {
//       if (target.match(partial)) {
//         matched.push(target)

//         if (!includeAll) break
//       }
//     }
//   })

//   return matched
// }

export function fuzzyMatchComponent(
  partialComponents: string[],
  includeAll = false,
  allComponents = components
) {
  const matched = fuzzyMatch(partialComponents, allComponents, includeAll)

  if (matched.length) {
    return matched
  } else {
    logger.withBothLn(() => logger.error(`No component matches '${partialComponents}'!`))
    process.exit(1)
  }
}

export async function specifyComponent(
  args: ParsedArgs,
  allComponents = components,
  required = true
) {
  return await specifyFromList(args, allComponents, {
    required,
    message: 'Select a component:',
    errorMessage: 'Component must be specified.'
  })
  // const matchedComponents = args._.length ? fuzzyMatchComponent(args._, true, allComponents) : ['']

  // let component: string

  // if (matchedComponents.length > 1 || !matchedComponents[0]) {
  //   component = (
  //     await prompts({
  //       type: 'autocomplete',
  //       name: 'component',
  //       message: 'Select a component:',
  //       choices: (matchedComponents.length > 1 ? matchedComponents : allComponents).map(name => ({
  //         title: name,
  //         value: name
  //       })),
  //       onState(this: any) {
  //         this.fallback = { title: this.input, value: this.input }
  //         if (this.suggestions.length === 0) {
  //           this.value = this.fallback.value
  //         }
  //       }
  //     })
  //   ).component
  // } else {
  //   component = matchedComponents[0] || ''
  // }

  // if (!component && required) {
  //   logger.withStartLn(() => logger.error('Component must be specified.'))
  //   process.exit(1)
  // }

  // return component
}

// export async function runParallel<T>(
//   maxConcurrency: number,
//   source: T[],
//   iteratorFn: (item: T, source: T[]) => Promise<any>
// ) {
//   const ret: Array<Promise<any>> = []
//   const executing: Array<Promise<any>> = []

//   for (const item of source) {
//     const p = Promise.resolve().then(() => iteratorFn(item, source))

//     ret.push(p)

//     if (maxConcurrency <= source.length) {
//       const e: Promise<any> = p.then(() => executing.splice(executing.indexOf(e), 1))

//       executing.push(e)

//       if (executing.length >= maxConcurrency) {
//         await Promise.race(executing)
//       }
//     }
//   }

//   return Promise.all(ret)
// }

// export function emptyDir(dir: string) {
//   if (!existsSync(dir)) {
//     return
//   }

//   for (const file of readdirSync(dir)) {
//     const abs = resolve(dir, file)

//     if (lstatSync(abs).isDirectory()) {
//       emptyDir(abs)
//       rmdirSync(abs)
//     } else {
//       unlinkSync(abs)
//     }
//   }
// }

const packages = [
  'vexip-ui',
  'common/bem-helper',
  'common/config',
  'common/hooks',
  'common/icons',
  'common/plugins',
  'common/scripts',
  'common/utils'
]

export async function getPackageName(inputPkg: string) {
  let pkgName: string | null = null

  if (packages.includes(inputPkg)) {
    pkgName = inputPkg
  } else {
    let options = inputPkg ? packages.filter(p => p.includes(inputPkg)) : packages

    if (!options.length) {
      options = packages
    } else if (options.length === 1) {
      pkgName = options[0]
    } else {
      pkgName = (
        await prompts({
          type: 'select',
          name: 'pkgName',
          message: 'Select release package:',
          choices: options.map(n => ({ title: n, value: n }))
        })
      ).pkgName
    }
  }

  if (!pkgName) {
    throw new Error('Release package must not be null')
  }

  return pkgName
}

export async function getPackageInfo(inputPkg: string) {
  const pkgName = await getPackageName(inputPkg)
  const isRoot = pkgName === 'vexip-ui'
  const pkgDir = isRoot ? rootDir : resolve(rootDir, pkgName)

  const info = getPkgInfo(pkgDir, true)

  // const pkgPath = resolve(pkgDir, 'package.json')

  // if (!existsSync(pkgPath)) {
  //   throw new Error(`Release package ${pkgName} not found`)
  // }

  // const rawPkg = readFileSync(pkgPath, 'utf-8')
  // const pkg = JSON.parse(rawPkg)

  if (info.pkg.private) {
    throw new Error(`Release package ${pkgName} is private`)
  }

  return {
    ...info,
    pkgName,
    isRoot,
    currentVersion: info.pkg.version || '0.0.0'
  }
}

// export function queryIdlePort(startPort: number, host = 'localhost', maxTry = 20) {
//   const server = createServer()

//   return new Promise<number>((resolve, reject) => {
//     const close = () => {
//       server.off('error', onError)
//       server.close()
//     }

//     const onError = (error: Error & { code?: string }) => {
//       if (error.code === 'EADDRINUSE') {
//         if (maxTry-- <= 0) {
//           close()
//         }

//         server.listen(++startPort, host)
//       } else {
//         close()
//         reject(error)
//       }
//     }

//     server.on('error', onError)
//     server.listen(startPort, host, () => {
//       close()
//       resolve(startPort)
//     })
//   })
// }
