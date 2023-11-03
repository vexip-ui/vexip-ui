import { resolve } from 'node:path'

import prompts from 'prompts'
import { fuzzyMatch, getPkgInfo, logger, specifyFromList } from '@vexip-ui/scripts'
import { components, rootDir } from './constant'

import type { ParsedArgs } from 'minimist'

export function bin(name: string) {
  return resolve(rootDir, 'node_modules/.bin/' + name)
}

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
}

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
