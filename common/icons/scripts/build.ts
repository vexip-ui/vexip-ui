import { basename, resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import fs from 'fs-extra'
import { execa } from 'execa'
import { cyan, green, red } from 'kolorist'
import glob from 'fast-glob'
import { format } from 'prettier'

const rootDir = resolve(fileURLToPath(import.meta.url), '../..')
const { existsSync, emptyDir, mkdirSync } = fs

async function main() {
  ensureEmptyDir(resolve(rootDir, 'vue'))
  ensureEmptyDir(resolve(rootDir, 'types'))

  const solid = await generateVueIcons('solid', '', '')
  const brands = await generateVueIcons('brands', 'brands', 'B')
  const regular = await generateVueIcons('regular', 'regular', 'R')

  const exports = solid.exports + brands.exports + regular.exports

  await writeFile(resolve(rootDir, 'vue/index.ts'), exports, 'utf-8')

  console.log()
  console.log(green('Start building cjs and es packages...'))
  console.log()

  await execa('vite', ['build', '--config', 'vite.config.ts'], { stdio: 'inherit' })

  console.log()
  console.log(green('Start building full package...'))
  console.log()

  await execa('vite', ['build', '--config', 'vite.full.config.ts'], { stdio: 'inherit' })

  console.log()
  console.log(green('Start generating types...'))

  const types = `
    declare module '@vexip-ui/icons' {
      import type {
        DefineComponent,
        ComponentOptionsMixin,
        VNodeProps,
        AllowedComponentProps,
        ComponentCustomProps,
        ExtractPropTypes
      } from 'vue'
      type SvgIcon = DefineComponent<
        {},
        {},
        {},
        {},
        {},
        ComponentOptionsMixin,
        ComponentOptionsMixin,
        {},
        string,
        VNodeProps & AllowedComponentProps & ComponentCustomProps,
        Readonly<ExtractPropTypes<{}>>,
        {}
      >
      ${solid.types + brands.types + regular.types}
    }

    export {}
  `

  await writeFile(
    resolve(rootDir, 'types', 'index.d.ts'),
    await format(types, { parser: 'typescript', semi: false, singleQuote: true }),
    'utf-8',
  )

  console.log()
  console.log(green('All builds completed successfully'))
  console.log()
}

async function generateVueIcons(dir: string, out: string, suffix: string) {
  const outDir = resolve(rootDir, 'vue', out)

  if (!existsSync(outDir)) {
    mkdirSync(outDir)
  }

  const svgFiles = await glob('*.svg', {
    cwd: resolve(rootDir, 'src', dir),
    absolute: true,
  })

  suffix = suffix.toLocaleUpperCase()

  let exports = ''
  let types = ''

  await Promise.all(
    svgFiles.map(async svgFile => {
      const fileName = basename(svgFile, '.svg')
      const svg = (await readFile(svgFile, 'utf-8'))
        .replace(/<!--[\s\S]*-->/, '')
        .replace(/xmlns=".*?"/, 'style="transform: scale(0.85)"')

      let name = toCapitalCase(fileName)
      name = name.replace(/^(\d)/, 'I$1').replace(/-(\d)/g, '$1')
      name += suffix

      const vue = `
      <template>${svg}</template>
      <script lang="ts">
        import { defineComponent, markRaw } from 'vue'
        export default defineComponent(markRaw({ name: '${name}' }))
      </script>
    `

      await writeFile(
        resolve(outDir, `${fileName}.vue`),
        await format(vue, { parser: 'vue', semi: false, singleQuote: true }),
        'utf-8',
      )

      exports += `export { default as ${name} } from '.${out ? `/${out}` : ''}/${fileName}.vue'\n`
      types += `export const ${name}: SvgIcon\n`
    }),
  )

  console.log(cyan(`Generated icon Vue components for: ${dir}`))

  return { exports, types }
}

function ensureEmptyDir(dir: string) {
  if (existsSync(dir)) {
    emptyDir(dir)
  } else {
    mkdirSync(dir)
  }
}

function toCapitalCase(value: string) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1).replace(/-([a-z])/g, (_, char) => (char ? char.toUpperCase() : ''))
  )
}

main().catch(error => {
  console.error(red(error))
  process.exit(1)
})
