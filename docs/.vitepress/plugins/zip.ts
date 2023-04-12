import { resolve } from 'node:path'
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from 'node:fs'
import { cyan, green, red } from 'kolorist'

import type { Plugin, Logger } from 'vite'

export default function createZipPlugin(): Plugin {
  const logPrefix = cyan('[vite:zip]')

  let logger: Logger
  let outDir = 'dist'
  let root = __dirname

  function zipFolder(zip: import('jszip'), root: string) {
    readdirSync(root).forEach(f => {
      const path = resolve(root, f)

      if (statSync(path).isDirectory()) {
        zipFolder(zip.folder(f)!, path)
      } else {
        zip.file(f, readFileSync(path))
      }
    })
  }

  return {
    name: 'vite:zip',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      logger = config.logger
      outDir = config.build.outDir
      root = config.root
    },
    async closeBundle() {
      const dir = resolve(root, outDir)

      if (!existsSync(dir)) {
        logger.error(red(`\n${logPrefix} cannot file outDir '${dir}'`))
        return
      }

      logger.info(green(`\n${logPrefix} zipping outDir...`))

      try {
        const { default: JSZip } = await import('jszip')
        const zip = new JSZip()

        zipFolder(zip, dir)
        writeFileSync(
          resolve(dir, `${outDir}.zip`),
          await zip.generateAsync({ type: 'nodebuffer' }),
          'utf-8'
        )

        logger.info(green(`${logPrefix} zip successful\n`))
      } catch (error) {
        logger.error(red(`${logPrefix} zip fail with something wrong\n`))
        logger.error(error as string)
      }
    }
  }
}
