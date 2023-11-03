import { resolve } from 'node:path'
import { existsSync, lstatSync, readFileSync, readdirSync, rmdirSync, unlinkSync } from 'node:fs'
import { createServer } from 'node:net'

import { execa } from 'execa'
import { bgCyan, bgGreen, bgRed, bgYellow, cyan, green, lightBlue, red, yellow } from 'kolorist'
import prompts from 'prompts'

import type { ProjectManifest } from '@pnpm/types'
import type { Options } from 'execa'
import type { ParsedArgs } from 'minimist'

export type LogFn = () => void

export const logger = {
  ln: () => console.log(),
  withStartLn: (log: LogFn) => {
    logger.ln()
    log()
  },
  withEndLn: (log: LogFn) => {
    log()
    logger.ln()
  },
  withBothLn: (log: LogFn) => {
    logger.ln()
    log()
    logger.ln()
  },
  warning: (msg: string) => {
    console.warn(`${bgYellow(' WARNING ')} ${yellow(msg)}`)
  },
  info: (msg: string) => {
    console.log(`${bgCyan(' INFO ')} ${cyan(msg)}`)
  },
  success: (msg: string) => {
    console.log(`${bgGreen(' SUCCESS ')} ${green(msg)}`)
  },
  error: (msg: string) => {
    console.error(`${bgRed(' ERROR ')} ${red(msg)}`)
  },
  warningText: (msg: string) => {
    console.warn(`${yellow(msg)}`)
  },
  infoText: (msg: string) => {
    console.log(`${cyan(msg)}`)
  },
  successText: (msg: string) => {
    console.log(`${green(msg)}`)
  },
  errorText: (msg: string) => {
    console.error(`${red(msg)}`)
  }
}

export async function run(bin: string, args: string[], opts: Options = {}) {
  return execa(bin, args, { stdio: 'inherit', ...opts })
}

export async function dryRun(bin: string, args: string[], opts: Options = {}) {
  console.log(lightBlue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
}

export function fuzzyMatch(partials: string[], total: string[], includeAll = false) {
  const matched: string[] = []

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

export interface SpecifyOptions {
  required?: boolean,
  message?: string,
  errorMessage?: string
}

export async function specifyFromList(
  args: ParsedArgs,
  list: string[],
  options: SpecifyOptions = {}
) {
  const matchedItems = args._.length ? fuzzyMatch(args._, list, true) : ['']

  let item: string

  if (matchedItems.length > 1 || !matchedItems[0]) {
    item = (
      await prompts({
        type: 'autocomplete',
        name: 'item',
        message: options.message || 'Select one from below:',
        choices: (matchedItems.length > 1 ? matchedItems : list).map(name => ({
          title: name,
          value: name
        })),
        onState(this: any) {
          this.fallback = { title: this.input, value: this.input }
          if (this.suggestions.length === 0) {
            this.value = this.fallback.value
          }
        }
      })
    ).item
  } else {
    item = matchedItems[0] || ''
  }

  if (!item && options.required) {
    logger.withStartLn(() => logger.error(options.errorMessage || 'The above must be specified.'))
    process.exit(1)
  }

  return item
}

export function emptyDir(dir: string) {
  if (!existsSync(dir)) {
    return
  }

  for (const file of readdirSync(dir)) {
    const abs = resolve(dir, file)

    if (lstatSync(abs).isDirectory()) {
      emptyDir(abs)
      rmdirSync(abs)
    } else {
      unlinkSync(abs)
    }
  }
}

export function queryIdlePort(startPort: number, host = 'localhost', maxTry = 20) {
  const server = createServer()

  return new Promise<number>((resolve, reject) => {
    const close = () => {
      server.off('error', onError)
      server.close()
    }

    const onError = (error: Error & { code?: string }) => {
      if (error.code === 'EADDRINUSE') {
        if (maxTry-- <= 0) {
          close()
        }

        server.listen(++startPort, host)
      } else {
        close()
        reject(error)
      }
    }

    server.on('error', onError)
    server.listen(startPort, host, () => {
      close()
      resolve(startPort)
    })
  })
}

export function getPkgInfo(pkgDir: string, errorIfPrivate = false) {
  const pkgPath = resolve(pkgDir, 'package.json')

  if (!existsSync(pkgPath)) {
    throw new Error(`Cannot find package.json from '${pkgDir}'`)
  }

  const rawPkg = readFileSync(pkgPath, 'utf-8')
  const pkg = JSON.parse(rawPkg) as ProjectManifest

  if (errorIfPrivate && pkg.private) {
    throw new Error(`Package from '${pkgDir}' is private`)
  }

  return {
    pkgDir,
    pkgPath,
    pkg,
    rawPkg
  }
}
