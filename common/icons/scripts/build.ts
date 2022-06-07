import { resolve, basename } from 'path'
import { readFile, writeFile } from 'fs/promises'
import { existsSync, emptyDir, mkdirSync } from 'fs-extra'
import execa from 'execa'
import chalk from 'chalk'
import glob from 'fast-glob'
import { format } from 'prettier'

main().catch(error => {
  console.error(chalk.red(error))
  process.exit(1)
})

async function main() {
  ensureEmptyDir(resolve(__dirname, '../vue'))
  ensureEmptyDir(resolve(__dirname, '../types'))

  const solid = await generateVueIcons('solid', '', '')
  const brands = await generateVueIcons('brands', 'brands', 'B')
  const regular = await generateVueIcons('regular', 'regular', 'R')

  const exports = solid.exports + brands.exports + regular.exports

  await writeFile(resolve(__dirname, '../vue/index.ts'), exports, 'utf-8')

  await execa('vite', ['build', '--config', 'vite.config.ts'], {
    stdio: 'inherit',
    env: {
      OUT_DIR: 'es',
      FORMAT: 'es'
    }
  })

  console.log()
  console.log(chalk.cyan(`built es packages`))

  await execa('vite', ['build', '--config', 'vite.config.ts'], {
    stdio: 'inherit',
    env: {
      OUT_DIR: 'lib',
      FORMAT: 'cjs'
    }
  })

  console.log()
  console.log(chalk.cyan(`built cjs packages`))

  await execa('vite', ['build', '--config', 'vite.full.config.ts'], { stdio: 'inherit' })

  console.log()
  console.log(chalk.cyan('build full packages successful'))

  const types = `
    declare module '@vexip-ui/icons' {
      import type { DefineComponent } from 'vue'
      type SvgIcon = DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
      ${solid.types + brands.types + regular.types}
    }

    export {}
  `

  await writeFile(
    resolve(__dirname, '../types', 'index.d.ts'),
    format(types, { parser: 'typescript', semi: false, singleQuote: true }),
    'utf-8'
  )

  console.log()
  console.log(chalk.green('build successful'))
}

async function generateVueIcons(dir: string, out: string, suffix: string) {
  const outDir = resolve(__dirname, '../vue', out)

  if (!existsSync(outDir)) {
    mkdirSync(outDir)
  }

  const svgFiles = await glob('*.svg', {
    cwd: resolve(__dirname, '../src', dir),
    absolute: true
  })

  suffix = suffix.toLocaleUpperCase()

  let exports = ''
  let types = ''

  await Promise.all(svgFiles.map(async svgFile => {
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
      format(vue, { parser: 'vue', semi: false, singleQuote: true }),
      'utf-8'
    )

    exports += `export { default as ${name} } from '.${out ? `/${out}` : ''}/${fileName}.vue'\n`
    types += `export const ${name}: SvgIcon\n`
  }))

  console.log(chalk.cyan(`generated ${dir} vue icons`))

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
