import { resolve, relative, sep } from 'path'
import { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import execa from 'execa'
import chalk from 'chalk'

main().catch(error => {
  console.error(chalk.red(error))
  process.exit(1)
})

async function main() {
  await execa('vite', ['build', '--config', 'vite.config.ts'], {
    stdio: 'inherit',
    env: {
      OUT_DIR: 'es',
      FORMAT: 'es',
    }
  })

  await execa('vite', ['build', '--config', 'vite.config.ts'], {
    stdio: 'inherit',
    env: {
      OUT_DIR: 'lib',
      FORMAT: 'cjs',
    }
  })

  generateDts()
}

function generateDts() {
  const src = resolve(__dirname, '../src')
  const types = resolve(__dirname, '../types')
  const icons = findIcons(src)
  const dts = `
declare module '@vexip-ui/icons' {
  import type { DefineComponent } from 'vue'
  type SvgIcon = DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  ${
    icons.map(iconPath => {
      const fullName = relative(src, iconPath).replace(`.${sep}`, '').replace('.ts', '')
  
      let prefix = ''
      let name = ''
  
      if (fullName.includes(sep)) {
        [prefix, name] = fullName.split(sep)
      } else {
        name = fullName
      }
  
      name = toPascalCase(name)
      name = name.replace(/-(\d)/g, '$1')
  
      if (name.match(/^\d/)) {
        name = 'I' + name
      }
  
      if (prefix) {
        name += prefix.charAt(0).toLocaleUpperCase()
      }
  
      return `export const ${name}: SvgIcon`
    }).join('\n  ')
  }
}

export {}
`

  if (!existsSync(types)) {
    mkdirSync(types)
  }

  writeFileSync(resolve(types, 'index.d.ts'), dts, 'utf-8')
}

function findIcons(folder: string, reslut: string[] = []) {
  const namespaces: string[] = []

  readdirSync(folder).forEach(f => {
    if (f === 'internal') return

    if (statSync(`${folder}/${f}`).isDirectory()) {
      namespaces.push(f)
    } else if (!/^index/.test(f)) {
      reslut.push(resolve(folder, f))
    }
  })

  namespaces.forEach(namespace => {
    findIcons(resolve(folder, namespace), reslut)
  })

  return reslut
}

function toPascalCase(value: string) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1).replace(/-([a-z])/g, (_, char) => (char ? char.toUpperCase() : ''))
  )
}
